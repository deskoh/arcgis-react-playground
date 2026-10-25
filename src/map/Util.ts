import { ReactiveWatchOptions, watch } from "@arcgis/core/core/reactiveUtils";
import { useCallback, useEffect, useState } from 'react';


export const useMapWatchValue = <T>(getValue: () => T, initialValue: T, options?: ReactiveWatchOptions<T>) => {
  const [value, setValue] = useState<T>(initialValue);

  const callback = useCallback((newValue: T) => setValue(newValue), []);

  useEffect(() => {
    const handle = watch(getValue, callback, options);
    return () => {
      handle.remove();
    };
  }, [getValue, options]);
  
  return value;
}
