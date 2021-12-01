import './App.css';
import MapView from './map/MapView';
import MapViewLoadHandler from './map/MapViewLoadHandler';
import { ServiceUrls } from './MapServer';
import OneMap from './MapServer/Onemap';

console.log(ServiceUrls.OneMap);

const basemap = OneMap.createBasemap([
  OneMap.Layers.DefaultTileLayer,
  OneMap.Layers.NightTileLayer,
])

function App() {
  return (
    <div className="App">
      <MapView
        basemap={basemap}
        // basemap='arcgis-topographic'
        className='mapDiv'
        onMapViewLoad={MapViewLoadHandler}
        center={[103.85, 1.3221]}
      />
    </div>
  );
}

export default App;
