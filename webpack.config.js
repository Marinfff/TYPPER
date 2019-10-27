const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const config = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/grind'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/sprite.png'),
        css: path.resolve(__dirname, 'src/assets/sprite.styl')
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ],
  watch: true
};

module.exports = [
  {
    ...config,
    entry: path.join(__dirname, 'main.ts'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js'
    },
    target: 'electron-main'
  },
  {
    ...config,
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html')
      })
    ],
    target: 'electron-renderer'
  }
];
