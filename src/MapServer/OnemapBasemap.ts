import Layer from '@arcgis/core/layers/Layer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import { BaseUrl, ServiceUrls } from './ServiceUrls';
import MapServerBasemap from './MapServerBasemap';

declare module './ServiceUrls' {
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

// const thumbnails: Record<Layers, string> = {
//   [Layers.DefaultTileLayer]: 'assets/map/base-layer/satellite.PNG',
//   [Layers.GreyTileLayer]: 'assets/map/base-layer/satellite-grey.PNG',
//   [Layers.NightTileLayer]: 'assets/map/base-layer/satellite-night.PNG',
//   [Layers.OriginalTileLayer]: 'assets/map/base-layer/satellite-original.PNG',
// };

class OnemapBasemap extends MapServerBasemap<Layers> {
  readonly Layers = Layers;

  constructor(id?: string, title = id) {
    super(id, title, 'https://web-static.onemap.sg/images/main/basemaps/Night.jpg');
  }

  /* eslint-disable class-methods-use-this */
  override createLayer(layer: Layers): Layer {
    return new WebTileLayer({
      // id: 'Satellite',
      title: layer,
      urlTemplate: `https://{subDomain}.onemap.sg/v3/${layer}/{level}/{col}/{row}.png`,
      subDomains: ['maps-a', 'maps-b', 'maps-c'],
      copyright: `<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>`,
    });
  }
}

export default new OnemapBasemap(
  'onemap',
  'One Map',
);
