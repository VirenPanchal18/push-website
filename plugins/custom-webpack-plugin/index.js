const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = function () {
  return {
    name: 'custom-docusaurus-plugin',
    configureWebpack(config, isServer) {
      // Always extend fallback and ProvidePlugin
      const extendedConfig = {
        resolve: {
          fallback: {
            assert: require.resolve('assert'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            stream: require.resolve('stream-browserify'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url'),
            zlib: require.resolve('browserify-zlib'),
            crypto: require.resolve('crypto-browserify'),
            vm: require.resolve('vm-browserify'),
            File: isServer ? false : require.resolve('form-data'),
            bufferutil: false,
            'utf-8-validate': false,
            'pino-pretty': false,
            process: require.resolve('process/browser.js'),
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: 'process/browser.js',
          }),
        ],
        optimization: {
          minimize: false,
          minimizer: [
            new TerserPlugin({
              parallel: false,
              terserOptions: {
                format: { comments: false },
              },
              extractComments: false,
            }),
            new CssMinimizerPlugin({ parallel: false }),
          ],
        },
      };

      // ✅ Add HMR plugin in dev mode only (not server and not production)
      if (!isServer) {
        extendedConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
      }

      return extendedConfig;
    },
  };
};
