import Basemap from '@arcgis/core/Basemap';

import { SatelliteBasemap, SatelliteDetails, StreetBasemap, ServiceUrls } from './MapServer';

const x = ServiceUrls.Grid;

/** ********************************
 * Main Initialisation for Basemap
 ******************************** */
const init = (): void => {
  const basemapList: Basemap[] = [];
  let streetBasemap: Basemap | undefined;

  const satelliteBasemap = (true)
    ? SatelliteBasemap.createBasemap([
      SatelliteBasemap.Layers.SatelliteTileLayer,
      SatelliteDetails.createLayer(SatelliteDetails.Layers.DetailsMapImageLayer),
    ])
    : SatelliteBasemap.createBasemap([
      SatelliteBasemap.Layers.WebTile,
    ]);
  basemapList.push(satelliteBasemap);

  if (true) { // TileLayer from ArcGIS Server
    // STREET MAP
    streetBasemap = StreetBasemap.createBasemap([StreetBasemap.Layers.StreetTileLayer]);
    basemapList.push(streetBasemap);
  }

  // Set Basemap title to 'Base Layer' for 'Map Ordering'
  // To rename to 'Base Layer' to show in 'Map Ordering');
  for (let i = 0; i < basemapList.length; i += 1) {
    const basemap = basemapList[i];
    basemap.baseLayers.getItemAt(0).title = 'Base Layer'; // To rename to 'Base Layer' to show in 'Map Ordering'
  }
};

export default {
  init,
};
