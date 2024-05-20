// import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";
import "../styles/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          // you might need to get a newer version
          src="https://kit.fontawesome.com/3d0488881e.js"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
