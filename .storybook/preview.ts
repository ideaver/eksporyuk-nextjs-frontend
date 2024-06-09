import type { Preview } from "@storybook/react";
import "../src/_metronic/assets/sass/style.scss";
import "../src/_metronic/assets/sass/plugins.scss";
import "../src/_metronic/assets/sass/style.react.scss";

import "../src/_metronic/assets/fonticon/fonticon.css";
import "../src/_metronic/assets/keenicons/duotone/style.css";
import "../src/_metronic/assets/keenicons/outline/style.css";
import "../src/_metronic/assets/keenicons/solid/style.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { ThemeModeProvider } from "../src/_metronic/partials";
import { MasterInit } from "../src/_metronic/layout/MasterInit";
import {
  LayoutProvider,
  LayoutSplashScreen,
} from "../src/_metronic/layout/core";
import { Suspense } from "react";
import { I18nProvider } from "../src/_metronic/i18n/i18nProvider";
import React from "react";

export const decorators = [
  (Story) => (
    React.createElement(I18nProvider, null,
      React.createElement(LayoutProvider, null,
        React.createElement(ThemeModeProvider, null,
          React.createElement(Story, null),
          React.createElement(MasterInit, null)
        )
      )
    )
  ),
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-bs-theme",
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
