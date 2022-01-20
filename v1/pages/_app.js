import "../styles/antd-custom.less";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <NextNprogress
          color="#ffbe76"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
