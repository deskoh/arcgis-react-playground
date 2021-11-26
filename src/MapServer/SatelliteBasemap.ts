import Layer from '@arcgis/core/layers/Layer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

// import SatellitePng from 'assets/map/base-layer/satellite.PNG';
import { BaseUrl, ServiceUrls } from './ServiceUrls';
import MapServerBasemap from './MapServerBasemap';

declare module './ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * Satellite TileLayer
     */
    Satellite: string;
  }
}

ServiceUrls.Satellite = `${BaseUrl}/Satellite/MapServer`;

enum Layers {
  /**
   * Satellite TileLayer
   */
  SatelliteTileLayer,
  /**
   * Webtile layer for offline mode
   */
  WebTile,
}

class SatelliteBasemap extends MapServerBasemap<Layers> {
  readonly Layers = Layers;

  constructor(id: string, title = id) {
    super(id, title, 'SatellitePng');
  }

  /* eslint-disable class-methods-use-this */
  override createLayer(layer: Layers): Layer {
    switch (layer) {
      case Layers.SatelliteTileLayer:
        return new TileLayer({
          id: 'Satellite',
          title: 'Satellite',
          url: ServiceUrls.Satellite,
        });
      case Layers.WebTile:
        return new WebTileLayer({
          id: 'Satellite',
          // E.g. "http://localhost:8000/styles/dark-matter/{level}/{col}/{row}.png",
          urlTemplate: `/GoogleMap_Aerial/{level}/{row}/{level}_y{row}_x{col}.jpg`,
        });
    }
  }
}

export default new SatelliteBasemap('Satellite', 'Satellite');
