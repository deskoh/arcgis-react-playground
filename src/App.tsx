import { useEffect } from 'react';
import './App.css';
import MapView, { useMap } from './map/MapView';
import MapViewReadyHandler from './map/MapViewReadyHandler';
import { ServiceUrls } from './MapServer';
import OneMap from './MapServer/Onemap';

console.log(ServiceUrls.OneMap);

const basemap = OneMap.createBasemap([
  OneMap.Layers.DefaultTileLayer,
  OneMap.Layers.OriginalTileLayer,
  OneMap.Layers.GreyTileLayer,
  OneMap.Layers.NightTileLayer,
], {
  title: 'OneMap',
  thumbnailUrl: 'https://mobile.onemap.gov.sg/web/2025/images/basemap_city.png',
});

function App() {

  const map = useMap();

  useEffect(() => {
    if (map) {
      console.log("Map view is ready");
    }
  }, [map]);
  
  return (
    <div className="App">
      <MapView
        basemap={basemap}
        // basemap='arcgis-topographic'
        onarcgisViewReadyChange={MapViewReadyHandler}
        center={[103.85, 1.3221]}
      />
    </div>
  );
}

export default App;
