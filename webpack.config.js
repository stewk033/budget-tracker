const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./public/js/index.js",
    indexedDB: "./public/js/idb.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/public/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget",
      description: "An app that allows you to view your budget.",
      start_url: "../public/index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join("public", "icons"),
        },
      ],
    }),
  ],
  
  mode: "development",
};