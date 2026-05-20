import {flatRoutes} from '@react-router/fs-routes';

/**
 * File-based routing — picks up every *.jsx file in app/routes/.
 * The original Hydrogen scaffold wrapped this in `hydrogenRoutes(...)` for
 * Oxygen-specific framework routes; we don't need that since the Vercel
 * SPA build runs against plain React Router 7.
 */
export default await flatRoutes();
