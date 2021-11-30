import Layer from '@arcgis/core/layers/Layer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServer from './MapServer';

declare module './constants/ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * Grid
     */
    Grid: string;
  }
}

ServiceUrls.Grid = `${BaseUrl}/Grid/MapServer`;

enum Layers {
  ABGrid,
  Grid1km,
  Grid100m,
}

declare module './constants/LayerId' {
  interface LayerId {
    ABGrid: Grid;
    Grid1km: Grid;
    Grid100m: Grid;
  }
}

class Grid extends MapServer<Layers> {
  readonly Layers = Layers;

  // eslint-disable-next-line class-methods-use-this
  override createLayer(layer: Layers): Layer {
    if (layer === Layers.ABGrid) {
      return new MapImageLayer({
        id: 'AB Grid',
        title: 'AB Grid',
        url: ServiceUrls.Grid,
        sublayers: [{ id: 1 }, { id: 2 }],
      });
    }
    if (layer === Layers.Grid1km) {
      return new FeatureLayer({
        id: 'Grid1km',
        title: 'Grid1km',
        url: `${ServiceUrls.Grid}/1`,
      });
    }
    return new FeatureLayer({
      id: 'Grid100m',
      title: 'Grid100m',
      url: `${ServiceUrls.Grid}/2`,
    });
    // throw new Error('Layer not supported');
  }
}

export default new Grid();
