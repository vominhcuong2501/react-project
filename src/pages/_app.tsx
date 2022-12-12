import appStyle from '@/scss/main.scss';
import { EmptyLayout } from '@components/compound';
import { AppPropsWithLayout } from '@interfaces/index';
import { wrapper } from '@redux/configureStore';
import { publicRequest } from '@utils/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0 });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.asPath]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  const Layout = Component.Layout ?? EmptyLayout;
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      useEnterprise
    >
      <Provider store={store}>
        <SWRConfig value={{ fetcher: (url) => publicRequest.get(url), shouldRetryOnError: false }}>
          <Layout data={pageProps}>
            <style jsx>{appStyle}</style>
            <Component {...props} />
          </Layout>
        </SWRConfig>
      </Provider>
    </GoogleReCaptchaProvider>
  );
}
