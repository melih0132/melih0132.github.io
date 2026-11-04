// Entry navigateur : expose OceanEngine en global pour 404.html.
import { OceanEngine } from './engine.ts';

declare global {
  interface Window {
    OceanEngine: typeof OceanEngine;
  }
}

window.OceanEngine = OceanEngine;
