import { useState, useEffect, useCallback } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import debounce from 'lodash.debounce';

import '../styles/index.scss';

const Header = dynamic(() => import('../components/_layout/header'));
const Footer = dynamic(() => import('../components/_layout/footer/Footer'));
import ScrollTop from '../components/_common/ScrollTop';
import Spinner from '../components/_common/Spinner';

import Analytics from '../helpers/analytics';

import { AuthProvider } from '../context/auth';
import { HelperProvider } from '../context/helper';

const Layout = ({ children }) => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const onApiNotFoundErr = useCallback(() => {
    router.push('/account/signup/next');
  }, [router]);

  useEffect(() => {
    const apiNotFoundErr = debounce(onApiNotFoundErr, 200);

    window.addEventListener('apiNotFoundErr', apiNotFoundErr);

    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));

    document.documentElement.style.setProperty(
      '--fullHeight',
      `${window.innerHeight}px`
    );

    const onResized = debounce(() => {
      document.documentElement.style.setProperty(
        '--fullHeight',
        `${window.innerHeight}px`
      );
    }, 400);

    window.addEventListener('resize', onResized);

    return () => {
      window.removeEventListener('apiNotFoundErr', apiNotFoundErr);

      window.removeEventListener('resize', onResized);
    };
  }, [onApiNotFoundErr]);

  useEffect(() => {
    router.events.on('routeChangeComplete', Analytics.page);

    return () => {
      router.events.off('routeChangeComplete', Analytics.page);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <HelperProvider>
        <Header />
        <section>{children}</section>
        <Footer />
        {isLoading && <Spinner />}
      </HelperProvider>
    </AuthProvider>
  );
};

class Application extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ScrollTop />
      </>
    );
  }
}

export default Application;
