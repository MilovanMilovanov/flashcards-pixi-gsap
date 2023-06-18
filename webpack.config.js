const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  return {
    stats: "minimal", // Keep console output easy to read.
    entry: "./src/index.ts", // Your program entry point
    mode: argv.mode === "production" ? "production" : "development",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },

    // Config for your testing server
    devServer: {
      compress: true,
      allowedHosts: "all",
      static: {
        directory: path.join(__dirname, "dist"),
        watch: true,
        publicPath: "/",
      },
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234,
      host: "0.0.0.0",
    },

    // Web games are bigger than pages, disable the warnings that our game is too big.
    performance: { hints: false },

    devtool: argv.mode === "development" ? "eval-source-map" : undefined,

    optimization: {
      minimize: argv.mode === "production",
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: { drop_console: true },
            output: { comments: false, beautify: false },
          },
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
      new CopyPlugin({
        patterns: [{ from: "static/" }],
      }),

      new HtmlWebpackPlugin({
        template: "src/index.ejs",
        hash: true,
        minify: false,
      }),

      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
    ],
  };
};
