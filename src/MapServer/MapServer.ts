import Layer from '@arcgis/core/layers/Layer';

/**
 * Base class for ArcGIS MapServer REST resources
 */
abstract class MapServer<L> {
  /**
   * Creates specified Layer from service
   * @param layer Available layers enum.
   */
  abstract createLayer(layer: L): Layer;
}

export default MapServer;
