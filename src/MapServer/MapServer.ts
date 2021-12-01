import Basemap from '@arcgis/core/Basemap';
import Layer from '@arcgis/core/layers/Layer';

type BasemapProperties = Required<ConstructorParameters<typeof Basemap>>[0];
type BasemapOptions = Omit<BasemapProperties, 'baseLayers'>;

/**
 * Base class for ArcGIS MapServer REST resources
 */
abstract class MapServer<L> {
  /**
   * Creates specified Layer from service
   * @param layer Available layers enum.
   */
  public abstract createLayer(layer: L): Layer;

  /**
   * Create basemap with specified base layers.
   * @param baseLayers Tile layers that make up the basemap's features
   */
   public createBasemap(baseLayers: (Layer | L)[], options?: BasemapOptions): Basemap {
    return new Basemap({
      baseLayers: this.getLayers(baseLayers),
      ...options,
    });
  }

  /**
   * Normalize each Layer item to a ArcGIS Layer object.
   */
   protected getLayers(layers: (Layer | L)[]): Layer[] {
    const arcgisLayers: Layer[] = [];
    layers.forEach((l) => {
      const layer = (l instanceof Layer) ? l : this.createLayer(l);
      arcgisLayers.push(layer);
    });
    return arcgisLayers;
  }
}

export default MapServer;
