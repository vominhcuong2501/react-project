/* eslint-disable @typescript-eslint/no-var-requires */
const styledWebpack = require('styled-jsx/webpack');
const nextBuildId = require('next-build-id');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      '@mui/lab': {
        transform: '@mui/lab/{{member}}',
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
      },
    },
  },
  webpack(config, { defaultLoaders, isServer }) {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    config.module.rules.push({
      test: /\.scss$|\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: styledWebpack.loader,
          options: {
            type: (_, options) => options.query?.type || 'global', // default global
          },
        },
        'sass-loader',
      ],
    });

    return config;
  },

  generateBuildId: () => nextBuildId({ dir: __dirname }),
};
