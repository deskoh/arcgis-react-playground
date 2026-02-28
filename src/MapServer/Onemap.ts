import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import Layer, { LayerProperties } from '@arcgis/core/layers/Layer';

import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServer from './MapServer';

declare module './constants/ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * OneMap TileLayer
     */
    OneMap: string;
  }
}

ServiceUrls.OneMap = `${BaseUrl}/Satellite/MapServer`;

enum  OneMapLayer {
  DefaultTileLayer = 'Default',
  GreyTileLayer = 'Grey',
  NightTileLayer = 'Night',
  OriginalTileLayer = 'Original',
}
declare module './constants/LayerId' {
  interface LayerId {
    OneMapDefault: OnemapBasemap;
    OneMapGrey: OnemapBasemap;
    OneMapNight: OnemapBasemap;
    OneMapOriginal: OnemapBasemap;
  }
}

class OnemapBasemap extends MapServer<OneMapLayer> {
  readonly Layers = OneMapLayer;

  // thumbnail: 'https://web-static.onemap.sg/images/main/basemaps/Night.jpg'
  override createLayer<T extends LayerProperties>(layer: OneMapLayer, properties?: Partial<T>): Layer {
    const id = LayerId[`OneMap${layer}`];
    return new WebTileLayer({
      id,
      title: layer,
      urlTemplate: `https://{subDomain}.onemap.gov.sg/maps/tiles/${layer}/{level}/{col}/{row}.png`,
      subDomains: ['www'],
      visible: false,
      copyright: `<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>`,
      ...properties,
    });
  }
}

export default new OnemapBasemap();
