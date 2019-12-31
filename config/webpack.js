const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const project = require('./project')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = file => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  mode: __PROD__ ? 'production' : 'development',
  entry: {
    main: [
      inProjectSrc(project.main),
    ],
  },
  optimization: {
    minimizer: []
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        API_HOST: JSON.stringify(project.API_HOST),
        LOG: JSON.stringify(project.log)
      },
      __DEV__,
      __TEST__,
      __PROD__,
    }, project.globals))
  ],
}

// ES6
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        ["babel-plugin-root-import", {
          "rootPathSuffix": "src/"
        }]
      ]
    }
  }],
})

// TypeScript
// ------------------------------------
config.module.rules.push({
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
},)

// Styles
// ------------------------------------
config.module.rules.push({
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
})

config.module.rules.push({
  test: /\.s[ac]ss$/i,
  use: ['style-loader', 'css-loader', 'sass-loader'],
})

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|jpeg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

// Bundle Splitting
// ------------------------------------
config.optimization.splitChunks = {
  chunks: "async",
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      chunks: 'all',
      name: 'vendors',
      enforce: true
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.optimization.minimizer.push(
    new TerserPlugin()
  )
}

module.exports = config
