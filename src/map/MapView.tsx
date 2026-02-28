import '@arcgis/map-components/types/react';

import config from '@arcgis/core/config';
import React, { useEffect } from 'react';

// Import components
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-home";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-basemap-layer-list";
import { ReactArcgisMap } from '@arcgis/map-components/types/react';
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource';
import Basemap from '@arcgis/core/Basemap';

// config.apiKey = import.meta.env.REACT_APP_ARCGIS_APIKEY;
config.request.trustedServers = ['*'];

type MapViewProps = Partial<ReactArcgisMap>

// Important to use same reference for default values
const defaultCenter = [103.85, 1.3221];

const MyMapView: React.FC<MapViewProps> = ({
  basemap,
  children,
  onarcgisViewReadyChange,
  center = defaultCenter,
  zoom = 12,
  ...rest
}) => {

  useEffect(() => {
    const viewElement = document.querySelector("arcgis-map") as HTMLArcgisMapElement;
    void viewElement.viewOnReady().then(() => {
      console.log("Map view is ready");
    });
  }, []);

  return (
    <arcgis-map
      {...rest}
      zoom={zoom}
      basemap={basemap}
      center={center}
      onarcgisViewReadyChange={onarcgisViewReadyChange}
    >
      <arcgis-home slot="top-left" />
      <arcgis-zoom slot="top-left" />
      <arcgis-basemap-gallery slot="bottom-right" source={new LocalBasemapsSource({
        basemaps: [
          basemap,
          Basemap.fromId('dark-gray-vector') as any,
          Basemap.fromId('topo-vector') as any,
          Basemap.fromId('hybrid') as any,
        ]
      })} />
      <arcgis-basemap-layer-list slot="bottom-right" selectionMode="none" hideReferenceLayers={true} />
      {children}
    </arcgis-map>
  );
};

export default MyMapView;
