import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const debug = process.env.NODE_ENV !== 'production';


export default [{
  // the library
  node: {
    assert: "empty",
    console: true,
    fs: false,
    net: "mock",
    tls: false
  },
  entry: {
    index: "./src/index",
    "engine/ecs/entity": "./src/engine/ecs/entity",
    "engine/ecs/systems": "./src/engine/ecs/systems",
    "engine/ecs/index": "./src/engine/ecs/index",
    "engine/index": "./src/engine/index"
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "[name].js",
    library: "simple",
    //library: ["simple", "[name]"],
    libraryTarget: "umd"
  },


  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['es2015', {
              modules: false
            }]
          ],
          plugins: [
            'syntax-dynamic-import',
            ["transform-class-properties", { "spec": true }]
          ]
        }
      }],
      //include: JS_PATH,
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.glsl$/,
      use: [{
        loader: 'webpack-glsl-loader'
      }],
      //include: SHADER_PATH
    }]
  },
  resolve: {
    mainFields: ['main'],

    modules: [__dirname, 'node_modules'],
    alias: {
      "simple": '/lib'
    }
  },
  devtool: debug ? 'eval-source-map' : 'source-map',
  devServer: {

  }
}, {

  // examples
  node: {
    console: true,
    fs: false,
    net: "mock",
    tls: false
  },
  entry: path.resolve(__dirname, './examples/src'),
  output: {
    path: path.resolve(__dirname, './examples/dist'),
    filename: 'example.js'
  },
  plugins: [new HtmlWebpackPlugin({
    // filename: 'examples/dist/example.js'
  })],
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['es2015', {
              modules: false
            }]
          ],
          plugins: [
            'syntax-dynamic-import',
            ["transform-class-properties", { "spec": true }],
            'babel-plugin-webpack-alias'
          ]
        }
      }],
      //include: JS_PATH,
      exclude: /(node_modules|bower_components)/
    }]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    //mainFields: ['main'],
    alias: {
      "simple": './lib'
    }
  },
}];