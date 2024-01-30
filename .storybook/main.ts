import type { StorybookConfig } from "@storybook/nextjs";
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { deleteAsync } from 'del';

const rootPath = path.resolve(__dirname)
const distPath = rootPath + '/src/_metronic/assets'
const entries = {
  'css/style': './src/_metronic/assets/sass/style.scss',
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-themes",
    "storybook-addon-theme-provider",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
