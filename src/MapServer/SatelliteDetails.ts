import Layer from '@arcgis/core/layers/Layer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { BaseUrl, ServiceUrls } from './ServiceUrls';
import MapServerBasemap from './MapServerBasemap';

declare module './ServiceUrls' {
  interface ServiceUrlsClass {
    /**
     * Satellite TileLayer for BaseMap
     */
    SatelliteDetails: string;
  }
}

ServiceUrls.SatelliteDetails = `${BaseUrl}/Satellite_Details/MapServer`;

enum Layers {
  /**
   * MapImageLayer with features such as Banks, Mailbox etc.
   */
  DetailsMapImageLayer,
  BANK = 3,
  MAILBOX = 4,
  SOS_TELEPHONE = 9,
  FIRE_HYDRANT = 10,
  LAMP_POST = 11,
}

class SatelliteDetails extends MapServerBasemap<Layers> {
  readonly Layers = Layers;

  constructor(id: string, title = id) {
    super(id, title);
  }

  override createLayer(layer: Layers): Layer {
    if (layer === Layers.DetailsMapImageLayer) {
      return new MapImageLayer({
        id: 'Satellite Details',
        title: 'Satellite Details',
        url: ServiceUrls.SatelliteDetails,
        sublayers: [
          // '+' operator converts string to number
          { id: +Layers.BANK, visible: true },
          { id: +Layers.MAILBOX },
          { id: +Layers.SOS_TELEPHONE },
          { id: +Layers.FIRE_HYDRANT },
          { id: +Layers.LAMP_POST },
        ],
      });
    }
    throw new Error('Unknown error');
  }
}

export default new SatelliteDetails('Satellite-Details');
