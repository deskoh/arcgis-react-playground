import Layer from '@arcgis/core/layers/Layer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServerBasemap from './MapServerBasemap';

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
  TileLayer,
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

class SatelliteBasemap extends MapServerBasemap<Layers> {
  readonly Layers = Layers;

  constructor(id: string, title = id) {
    super(id, title, 'SatellitePng');
  }

  /* eslint-disable class-methods-use-this */
  override createLayer(layer: Layers): Layer {
    switch (layer) {
      case Layers.TileLayer:
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

export default new SatelliteBasemap('Satellite', 'Satellite');
