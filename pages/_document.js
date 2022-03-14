import Document, { Head, Html, Main, NextScript } from 'next/document';
import config from '../config';


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.google_tag_manager}');
          `
            }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.google_tag_manager}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.google_analytics}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.google_tag_manager}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
          <Main />
          <NextScript />
        </body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function (d, u, h, s) {
            h = d.getElementsByTagName('head')[0];
            s = d.createElement('script');
            s.async = 1;
            s.src = u + new Date().getTime();
            h.appendChild(s);
          })(document, 'https://grow.clearbitjs.com/api/pixel.js?k=${config.clearbit}&v=');
        `
          }}
        />
      </Html>
    );
  }
}
