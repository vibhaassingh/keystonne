import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import {QuoteCartProvider} from '~/lib/quoteCart';
import {PageLayout} from './components/PageLayout';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';

/**
 * Phase 1 ships as a Vercel SPA — no Hydrogen runtime, no SSR loaders.
 * Cart + partner session are localStorage; catalog is mock data; nothing
 * needs a server round-trip. Partner-dashboard routes provide their own
 * chrome via PartnerShell, so we skip PageLayout for /partner/dashboard/*
 * to avoid double headers.
 */

export function links() {
  return [
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap',
    },
    {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'},
  ];
}

export function Layout({children}) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0B0F14" />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const isPartnerDashboard = location.pathname.startsWith('/partner/dashboard');

  return (
    <QuoteCartProvider>
      {isPartnerDashboard ? (
        <Outlet />
      ) : (
        <PageLayout>
          <Outlet />
        </PageLayout>
      )}
    </QuoteCartProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="tabular text-[11px] uppercase tracking-wider text-gray-500">
        Error {errorStatus}
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Something went sideways.
      </h1>
      {errorMessage && (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 text-left text-[12px] text-gray-700">
          {errorMessage}
        </pre>
      )}
      <a
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold"
      >
        Back to home
      </a>
    </section>
  );
}
