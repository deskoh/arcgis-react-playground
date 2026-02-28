/// <reference types="@arcgis/map-components/types/react" />

declare module '*.css';

interface ImportMeta {
  readonly env: {
    readonly REACT_APP_ARCGIS_APIKEY: string;
  };
}