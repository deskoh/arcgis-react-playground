import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import config from '@arcgis/core/config';
import { useEffect, useRef, useState } from 'react';

config.apiKey = process.env.REACT_APP_ARCGIS_APIKEY!;

export default function MyMapView () {
  const mapRef = useRef(null) as any;
  const [, setView] = useState<MapView | null>(null);

  useEffect(() => {
    const map = new Map({
      basemap: 'arcgis-topographic'
    });
    const view = new MapView({
      map: map,
      center: [-118.805, 34.027],
      zoom: 13,
      container: mapRef.current
    });

    setView(view);
    return () => view?.destroy();
  }, []);

  return <div className='mapDiv' ref={mapRef}></div>;
};
