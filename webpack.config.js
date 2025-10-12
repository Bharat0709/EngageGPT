const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed || {};

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    // Keep your existing plugins
    plugins: [new webpack.DefinePlugin(envKeys)],

    // Add module rules
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/react-datepicker/, // Exclude react-datepicker from source map loading
        },
        // Your other rules can go here
      ],
    },
  };
};
