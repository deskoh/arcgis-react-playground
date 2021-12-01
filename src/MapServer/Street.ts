import Layer from '@arcgis/core/layers/Layer';
import TileLayer from '@arcgis/core/layers/TileLayer';

// import SgTileMapBasicPng from 'assets/map/base-layer/sg-tile-map-basic.PNG';
import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServer from './MapServer';

declare module './constants/ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * Street Map TileLayer
     */
    Base: string;
  }
}

ServiceUrls.Base = `${BaseUrl}/Base/MapServer`;

enum Layers {
  /**
   * Streetmap TileLayer
   */
  StreetTile,
}

declare module './constants/LayerId' {
  interface LayerId {
    StreetMapTileLayer: StreetBasemap;
  }
}

class StreetBasemap extends MapServer<Layers> {
  readonly Layers = Layers;

  // eslint-disable-next-line class-methods-use-this
  override createLayer(layer: Layers): Layer {
    if (layer === Layers.StreetTile) {
      return new TileLayer({
        id: LayerId.StreetMapTileLayer,
        title: 'Street',
        url: ServiceUrls.Base,
      });
    }
    throw new Error('Layer not supported');
  }
}

export default new StreetBasemap();
