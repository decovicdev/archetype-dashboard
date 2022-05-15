import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'styles/index.scss';
import { QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import InternalErrorPage from './500';
import ScrollTop from 'components/_common/ScrollTop';
import Analytics from 'helpers/analytics';
import { queryClient } from 'services/queryClient.service';
import { AuthProvider } from 'context/AuthProvider';
import { HelperProvider } from 'context/HelperProvider';
import { ApiProvider } from 'context/ApiProvider';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', Analytics.page);
    return () => {
      router.events.off('routeChangeComplete', Analytics.page);
    };
  }, [router.events]);

  return children;
};

const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ErrorBoundary
      FallbackComponent={InternalErrorPage}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <ApiProvider>
        <AuthProvider>
          <HelperProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HelperProvider>
        </AuthProvider>
      </ApiProvider>
    </ErrorBoundary>
    <ScrollTop />
  </QueryClientProvider>
);

export default App;
