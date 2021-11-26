import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import config from '@arcgis/core/config';
import React, { useEffect, useRef } from 'react';

type MapViewProperties = Required<ConstructorParameters<typeof MapView>>[0];

config.apiKey = process.env.REACT_APP_ARCGIS_APIKEY!;
config.request.trustedServers = ['*'];

interface MapViewProps extends Omit<MapViewProperties, 'map'> {
  basemap?: Basemap | string,
  onMapViewLoad?: (view: MapView) => void,
}

// Important to use same reference for default values
const defaultCenter = [103.85, 1.3221];

const MyMapView: React.FC<MapViewProps> = ({
  basemap,
  onMapViewLoad,
  center = defaultCenter,
  zoom = 12,
  ...rest
}) => {
  const mapRef = useRef(null) as any;

  useEffect(() => {
    const map = new Map({ basemap });
    const view = new MapView({
      container: mapRef.current,
      map,
      center,
      zoom,
      ...rest,
    });

    if (view && onMapViewLoad) onMapViewLoad(view);

    return () => {
      view?.destroy();
      map.destroy();
    }
  }, [basemap, center, zoom, onMapViewLoad, rest]);

  return <div className='mapDiv' ref={mapRef}></div>;
};

export default MyMapView;
