import Basemap from '@arcgis/core/Basemap';
import { TargetedEvent } from '@arcgis/map-components';
import { ReactiveWatchOptions, watch } from "@arcgis/core/core/reactiveUtils";
import { useCallback, useEffect, useState } from 'react';


const handleViewReady = (e: TargetedEvent<HTMLArcgisMapElement, void>): void => {
  const { view } = e.target;
  console.log('MapView loaded', view.map!.basemap!.title, view.map!.basemap!.id);
  watch(() => e.target.basemap, (x) => {
    console.log('basemap changed to title:', (x as Basemap)?.title, ', id:', (x as Basemap)?.id);
  });
}

export const useMapWatchValue = <T>(getValue: () => T, initialValue: T, options?: ReactiveWatchOptions<T>) => {
  const [value, setValue] = useState<T>(initialValue);

  const callback = useCallback((newValue: T) => setValue(newValue), []);

  useEffect(() => {
    const handle = watch(getValue, callback, options);
    return () => {
      handle.remove();
    };
  }, [callback, getValue, options]);
  
  return value;
}

export default handleViewReady;
