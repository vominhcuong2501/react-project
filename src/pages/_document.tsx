/* eslint-disable @next/next/no-css-tags */
import createEmotionCache from '@/theme/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import { get, map } from 'lodash';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  // TODO: Handle load material-ui stylesheet on server render
  static async getInitialProps(ctx: any) {
    const locale = get(ctx, 'query.locale', '');
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = map(emotionStyles.styles, (style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
      locale,
    };
  }

  render() {
    return (
      <Html lang={this.props.locale} style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel="stylesheet" href="/fonts/awesome/css/all.min.css" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
