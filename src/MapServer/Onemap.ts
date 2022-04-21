import Layer from '@arcgis/core/layers/Layer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

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

enum Layers {
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

class OnemapBasemap extends MapServer<Layers> {
  readonly Layers = Layers;

  // thumbnail: 'https://web-static.onemap.sg/images/main/basemaps/Night.jpg'
  /* eslint-disable class-methods-use-this */
  override createLayer(layer: Layers): Layer {
    const id = LayerId[`OneMap${layer}`];
    return new WebTileLayer({
      id,
      title: layer,
      urlTemplate: `https://{subDomain}.onemap.sg/v3/${layer}/{level}/{col}/{row}.png`,
      subDomains: ['maps-a', 'maps-b', 'maps-c'],
      copyright: `<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>`,
    });
  }
}

export default new OnemapBasemap();
