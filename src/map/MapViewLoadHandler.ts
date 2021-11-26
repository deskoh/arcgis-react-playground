import Basemap from '@arcgis/core/Basemap';
import MapView from '@arcgis/core/views/MapView';
import Home from '@arcgis/core/widgets/Home';
import BasemapLayerList from '@arcgis/core/widgets/BasemapLayerList';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource';

const handleMapViewLoad = (view: MapView): void => {
  console.log('initMapview');

  view.when(() => console.log('view loaded', view.map.basemap.title, view.map.basemap.id));
  view.map.watch('basemap', (x) => {
    console.log('basemap changed to title:', x?.title, ', id:', x?.id);
  });

  // Add Home widget
  view.ui.add(new Home({ view }), 'top-left');

  // Add BasemapLayerList widget
  let basemapLayerList = new BasemapLayerList({
    view: view,
    multipleSelectionEnabled: false,
  });
  view.ui.add(basemapLayerList, 'bottom-right');

  // Add BasemapGallery widget
  let basemapGallery = new BasemapGallery({
    view: view,
    source: new LocalBasemapsSource({
      basemaps: [
        Basemap.fromId('dark-gray-vector'),
        Basemap.fromId('arcgis-topographic'),
        view.map.basemap,
        Basemap.fromId('hybrid'),
      ]
    }),
  });
  view.ui.add(basemapGallery, 'bottom-right');
}

export default handleMapViewLoad;
