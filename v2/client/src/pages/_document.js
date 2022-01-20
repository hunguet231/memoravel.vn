import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { LangConstant } from "const";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={LangConstant.DEFAULT_LANG}>
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-62EGTF7EBX"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-62EGTF7EBX', { page_path: window.location.pathname });
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      // useful for wrapping the whole react tree
      enhanceApp: (App) => App,
      // useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
};
