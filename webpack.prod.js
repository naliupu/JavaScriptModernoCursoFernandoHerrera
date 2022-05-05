
const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',

  output: {
    clean: true,//Limpia lo que esta en la carpeta dist, para poderlo crear de nuevo
    filename: 'main.[contenthash].js'//contenthash o fullhash: cada vez que se compile crea un nuevo hash del css y no se guardara en el cache de los navegadores
  },

  module: {
    rules: [
      {
        test: /\.html$/,//Busca todos los HTML
        loader: 'html-loader',//Pauqete que instalamos
        options: {
          sources: false,//Realiza muchas tareas automaticas
        }
      },
      {
        test: /\.css$/,//Busca todos los CSS
        exclude: /style.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /style.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ]
  },

  plugins: [
    new HtmlWebPack({
      title: 'Mi primer webpack',//Titulo de la pagina html
      // filename: 'index.html'//Nombre del archivo html 
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].[fullhash].css',//name: para que mantenga el nombre original-/- fullhash: cada vez que se compile crea un nuevo hash del css y no se guardara en el cache de los navegadores
      filename: '[name].[fullhash].css',//name: para que mantenga el nombre original-/- fullhash: cada vez que se compile crea un nuevo hash del css y no se guardara en el cache de los navegadores
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets' }//Copia de un origen a un destino , controlando lo que va a estar en el build
      ],
    })
  ]

}