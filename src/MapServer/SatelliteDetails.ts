import Layer from '@arcgis/core/layers/Layer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { BaseUrl, ServiceUrls, LayerId } from './constants';
import MapServer from './MapServer';

declare module './constants/ServiceUrls' {
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
  DetailsMapImage,
  BANK = 3,
  MAILBOX = 4,
  SOS_TELEPHONE = 9,
  FIRE_HYDRANT = 10,
  LAMP_POST = 11,
}

declare module './constants/LayerId' {
  interface LayerId {
    SatalliteDetails: SatelliteDetails;
  }
}

class SatelliteDetails extends MapServer<Layers> {
  readonly Layers = Layers;

  override createLayer(layer: Layers): Layer {
    if (layer === Layers.DetailsMapImage) {
      return new MapImageLayer({
        id: LayerId.SatalliteDetails,
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

export default new SatelliteDetails();
