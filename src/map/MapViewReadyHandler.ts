import Basemap from '@arcgis/core/Basemap';
import { TargetedEvent } from '@arcgis/map-components';
import { watch } from "@arcgis/core/core/reactiveUtils.js";


const handleViewReady = (e: TargetedEvent<HTMLArcgisMapElement, void>): void => {
  const { view } = e.target;
  console.log('MapView loaded', view.map!.basemap!.title, view.map!.basemap!.id);
  watch(() => e.target.basemap, (x) => {
    console.log('basemap changed to title:', (x as Basemap)?.title, ', id:', (x as Basemap)?.id);
  });
}

export default handleViewReady;
