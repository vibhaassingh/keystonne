import {HydratedRouter} from 'react-router/dom';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';

/**
 * SPA-mode client entry — no Hydrogen runtime, no nonce provider.
 * React Router 7 takes over once the initial HTML lands.
 */
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
