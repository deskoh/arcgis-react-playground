import Layer from '@arcgis/core/layers/Layer';
import TileLayer from '@arcgis/core/layers/TileLayer';

// import SgTileMapBasicPng from 'assets/map/base-layer/sg-tile-map-basic.PNG';
import { BaseUrl, ServiceUrls } from './ServiceUrls';
import MapServerBasemap from './MapServerBasemap';

declare module './ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * Street Map TileLayer
     */
    Base: string;
  }
}

ServiceUrls.Base = `${BaseUrl}/Base/MapServer`;

enum Layers {
  StreetTileLayer,
}

class StreetBasemap extends MapServerBasemap<Layers> {
  readonly Layers = Layers;

  constructor(id: string, title = id) {
    super(id, title, 'SgTileMapBasicPng');
  }

  // eslint-disable-next-line class-methods-use-this
  override createLayer(layer: Layers): Layer {
    if (layer === Layers.StreetTileLayer) {
      return new TileLayer({
        id: 'Street',
        title: 'Street',
        url: ServiceUrls.Base,
      });
    }
    throw new Error('Layer not supported');
  }
}

export default new StreetBasemap('StreetMap', 'StreetMap');
