const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (argv) => {
  return {
    stats: "minimal",
    entry: "./src/app.ts",
    mode: argv.mode === "production" ? "production" : "development",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "app.bundle.js",
    },

    // Config for your testing server
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
        watch: true,
        publicPath: "/",
      },
      allowedHosts: "all",
      compress: true,
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

    devtool: argv.mode === "development" ? "inline-source-map" : "source-map",

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
          options: {
            transpileOnly: true,
            compilerOptions: {
              sourceMap: true,
            },
          },
        },
        {
          test: /\.ejs$/,
          loader: "ejs-loader",
          options: {
            esModule: false,
          },
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
        patterns: [
          {
            from: "static/",
            to: "[path][name][ext]",
            globOptions: { ignore: ["**/*.scss"] },
          },
        ],
      }),

      new HtmlWebpackPlugin({
        template: "./src/index.ejs",
        filename: "index.html",
        hash: true,
        minify: false,
      }),

      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
    ],
  };
};
