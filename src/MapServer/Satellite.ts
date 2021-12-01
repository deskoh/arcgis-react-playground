import Layer from '@arcgis/core/layers/Layer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServer from './MapServer';

declare module './constants/ServiceUrls' {
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
  SatelliteTile,
  /**
   * Webtile layer for offline mode
   */
  WebTile,
}

declare module './constants/LayerId' {
  interface LayerId {
    SatalliteTileLayer: SatelliteBasemap;
    SatalliteWebTileLayer: SatelliteBasemap;
  }
}

class SatelliteBasemap extends MapServer<Layers> {
  readonly Layers = Layers;

  /* eslint-disable class-methods-use-this */
  override createLayer(layer: Layers): Layer {
    switch (layer) {
      case Layers.SatelliteTile:
        return new TileLayer({
          id: LayerId.SatalliteTileLayer,
          title: 'Satellite',
          url: ServiceUrls.Satellite,
        });
      case Layers.WebTile:
        return new WebTileLayer({
          id: LayerId.SatalliteWebTileLayer,
          // E.g. "http://localhost:8000/styles/dark-matter/{level}/{col}/{row}.png",
          urlTemplate: `/GoogleMap_Aerial/{level}/{row}/{level}_y{row}_x{col}.jpg`,
        });
    }
  }
}

export default new SatelliteBasemap();
