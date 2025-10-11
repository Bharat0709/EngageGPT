module.exports = function override(config, env) {
  // Find the source-map-loader rule
  const sourceMapLoaderRule = config.module.rules.find(
    (rule) =>
      rule.enforce === 'pre' &&
      rule.use &&
      rule.use.some(
        (use) => use.loader && use.loader.includes('source-map-loader'),
      ),
  );

  if (sourceMapLoaderRule) {
    // Add exclude property to ignore react-datepicker
    sourceMapLoaderRule.exclude = /node_modules\/react-datepicker/;
  }
  return config;
};
