import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "@/_metronic/assets/sass/style.scss";
import "@/_metronic/assets/sass/plugins.scss";
import "@/_metronic/assets/sass/style.react.scss";

import "@/_metronic/assets/fonticon/fonticon.css";
import "@/_metronic/assets/keenicons/duotone/style.css";
import "@/_metronic/assets/keenicons/outline/style.css";
import "@/_metronic/assets/keenicons/solid/style.css";
import { ThemeModeProvider } from "@/_metronic/partials";
import { LayoutProvider, LayoutSplashScreen } from "@/_metronic/layout/core";
import { Suspense, useEffect, useState } from "react";
import { I18nProvider } from "@/_metronic/i18n/i18nProvider";
import { MasterLayout } from "@/components/layouts/Master/MasterLayout";
import dynamic from "next/dynamic";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: "http://109.123.232.206:3002/graphql",
  cache: new InMemoryCache(),
});

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const MasterInit = dynamic(
    () =>
      import("@/_metronic/layout/MasterInit").then(
        (module) => module.MasterInit
      ),
    {
      ssr: false,
    }
  );
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <LayoutProvider>
            <ThemeModeProvider>
              <ApolloProvider client={client}>
              <MasterLayout>
                {" "}
                {/* TODO: Make this work with auth */}
                <Component {...pageProps} />
              </MasterLayout>

              <MasterInit />
              </ApolloProvider>
            </ThemeModeProvider>
          </LayoutProvider>
        </I18nProvider>
      </Suspense>
    </>
  );
}
