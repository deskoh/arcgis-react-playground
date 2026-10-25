# AGENTS.md

## Commands

```bash
pnpm start          # dev server (rsbuild, localhost:3000)
pnpm build          # production build to dist/
pnpm preview        # preview production build
pnpm lint           # rslint
pnpm lint:fix       # rslint --fix
pnpm test           # jest (all tests)
pnpm test -- --testPathPattern=Util  # run a single test file
pnpm copy           # copy @arcgis/core assets to public/assets (run once after install)
```

## Architecture

The app is a React 19 + ArcGIS Maps SDK playground focused on Singapore basemaps. It uses **rsbuild** (Rspack-based) as the bundler and **rslint** (type-checked recommended rules, see `rslint.config.ts`) for linting. The React Compiler is enabled (`reactCompiler: true`) and `@rsbuild/plugin-type-check` runs type checks during builds (TypeScript 7).

### ArcGIS Web Components (map/)

`MapView.tsx` wraps the `<arcgis-map>` web component from `@arcgis/map-components`. It exposes:

- **`useMap()`** — a hook backed by `useSyncExternalStore` that gives any component access to the `HTMLArcgisMapElement` once the view is ready. The map reference lives in `MapUtil` (a module-level singleton), so there is no React context provider needed.
- **`MapViewReadyHandler`** — an event handler passed to `onarcgisViewReadyChange` that logs basemap changes via `@arcgis/core/core/reactiveUtils`.
- **`useMapWatchValue<T>(getValue, initialValue)`** in `map/Util.ts` — bridges ArcGIS reactive utilities to React state; wraps `watch()` and cleans up on unmount.

### MapServer abstraction (MapServer/)

`MapServer.ts` is an abstract base class. Concrete subclasses (`Satellite.ts`, `Onemap.ts`, `Street.ts`, `Grid.ts`) implement `createLayer(layer)` for their specific layer enum. They export singletons and call `createBasemap()` from the base class to compose multiple layers into an ArcGIS `Basemap`.

Service URLs and layer IDs use **declaration merging** to extend `ServiceUrlsClass` and `LayerId` interfaces. Each map server file augments those interfaces and registers its URL at module load time (e.g., `ServiceUrls.OneMap = ...`).

### Environment variables

Prefix with `REACT_APP_` — rsbuild exposes them as `process.env.REACT_APP_*`. The ArcGIS API key (`REACT_APP_ARCGIS_APIKEY`) is referenced but currently commented out; `config.request.trustedServers = ['*']` is used instead for local development.

### Testing

Jest with `@swc/jest` transform and `jest-environment-jsdom`. ArcGIS core modules must be mocked (see `Util.test.ts` for the `jest.mock('@arcgis/core/core/reactiveUtils', ...)` pattern).
