import "@/_metronic/assets/sass/plugins.scss";
import "@/_metronic/assets/sass/style.react.scss";
import "@/_metronic/assets/sass/style.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import "@/_metronic/assets/fonticon/fonticon.css";
import "@/_metronic/assets/keenicons/duotone/style.css";
import "@/_metronic/assets/keenicons/outline/style.css";
import "@/_metronic/assets/keenicons/solid/style.css";
import { I18nProvider } from "@/_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "@/_metronic/layout/core";
import { ThemeModeProvider } from "@/_metronic/partials";
import createApolloClient from "@/app/service/graphql/graphqlRequestClient";
import { persistor, store } from "@/app/store/store";
import { MasterLayout } from "@/components/layouts/Master/MasterLayout";
import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });

// Step 1: Create a new component AppBody
function AppBody({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  const { data: loginSession } = useSession();
  const client = createApolloClient({
    token: loginSession?.user?.token,
  });
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
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <ApolloProvider client={client}>
              <MasterLayout>
                <Component {...pageProps} />
              </MasterLayout>
              <MasterInit />
            </ApolloProvider>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <style jsx global>{`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}</style>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <AppBody Component={Component} pageProps={pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
