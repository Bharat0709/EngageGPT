const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  console.log('Webpack');
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};
