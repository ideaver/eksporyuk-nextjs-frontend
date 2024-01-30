import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
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
// Remove the static import of MasterInit

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const [MasterInit, setMasterInit] = useState<any>(null);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isClient) {
      import("@/_metronic/layout/MasterInit").then((module: any) => {
        setMasterInit(module.default);
      });
    }
  }, [isClient]);

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
              <Component {...pageProps} />
              {MasterInit && <MasterInit />}
            </ThemeModeProvider>
          </LayoutProvider>
        </I18nProvider>
      </Suspense>
    </>
  );
}
