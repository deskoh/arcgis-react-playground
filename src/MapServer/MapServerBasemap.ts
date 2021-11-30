import Basemap from '@arcgis/core/Basemap';
import Layer from '@arcgis/core/layers/Layer';

import MapServer from './MapServer';

/**
 * Base class for ArcGIS MapServer REST resources with Basemaps (i.e. has Tile Info?)
 */
abstract class MapServerBasemap<L> extends MapServer<L> {
  /**
   * Creates a new Basemap
   * @param id An identifier used to refer to the basemap when referencing it elsewhere.
   * @param title The title of the Basemap
   * @param thumnailUrl Thumbnail URL or data URI
   */
  constructor(
    public readonly id?: string,
    public readonly title = id,
    private readonly thumnailUrl?: string
  ) {
    super();
  }

  /**
   * Create basemap with specified base layers.
   * @param baseLayers Tile layers that make up the basemap's features
   */
  public createBasemap(baseLayers: (Layer | L)[], referenceLayers?: (Layer | L)[]): Basemap {
    return new Basemap({
      id: this.id,
      title: this.title,
      baseLayers: this.getLayers(baseLayers),
      referenceLayers: referenceLayers ? this.getLayers(referenceLayers) : undefined,
      thumbnailUrl: this.thumnailUrl,
    });
  }

  /**
   * Normalize each Layer item to a ArcGIS Layer object.
   */
  private getLayers(layers: (Layer | L)[]): Layer[] {
    const arcgisLayers: Layer[] = [];
    layers.forEach((l) => {
      const layer = (l instanceof Layer) ? l : this.createLayer(l);
      arcgisLayers.push(layer);
    });
    return arcgisLayers;
  }
}

export default MapServerBasemap;
