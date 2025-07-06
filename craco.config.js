const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@services': path.resolve(__dirname, 'src/network'),
    },
    plugins: {
      add: [
        // Bundle analyzer for production builds
        ...(process.env.ANALYZE === 'true'
          ? [new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()]
          : []),

        // Custom build analytics plugin
        new webpack.ProgressPlugin({
          activeModules: true,
          entries: true,
          modules: true,
          dependencies: true,
          profile: true,
        }),
      ],
    },
    configure: (webpackConfig, { env }) => {
      // Production optimizations
      if (env === 'production') {
        // Disable source maps for smaller builds (optional)
        webpackConfig.devtool = false;

        // Optimize chunks
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 10,
                chunks: 'all',
              },
              common: {
                name: 'common',
                minChunks: 2,
                priority: 5,
                chunks: 'all',
              },
            },
          },
        };

        // Add compression
        webpackConfig.plugins.push(
          new webpack.optimize.AggressiveMergingPlugin(),
        );

        // Add build analytics
        webpackConfig.plugins.push(new BuildAnalyticsPlugin());
      }

      return webpackConfig;
    },
  },
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-class-properties',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-private-methods',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-private-property-in-object',
        {
          loose: true,
        },
      ],
      // Production optimizations
      ...(process.env.NODE_ENV === 'production'
        ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
        : []),
    ],
  },
  eslint: {
    enable: false,
  },
};

// Custom Build Analytics Plugin
class BuildAnalyticsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildAnalyticsPlugin', (stats) => {
      const { time, assets, chunks, modules } = stats.toJson();

      console.log('\n📊 Build Analytics:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`⏱️  Build Time: ${time}ms`);
      console.log(`📦 Total Assets: ${assets.length}`);
      console.log(`🧩 Chunks: ${chunks.length}`);
      console.log(`📁 Modules: ${modules.length}`);

      // Asset size analysis
      console.log('\n📋 Asset Breakdown:');
      const sortedAssets = assets
        .filter((asset) => asset.size > 0)
        .sort((a, b) => b.size - a.size)
        .slice(0, 10);

      sortedAssets.forEach((asset) => {
        const sizeKB = (asset.size / 1024).toFixed(2);
        const sizeColor =
          asset.size > 500000 ? '🔴' : asset.size > 250000 ? '🟡' : '🟢';
        console.log(
          `${sizeColor} ${asset.name.padEnd(40)} ${sizeKB.padStart(8)} KB`,
        );
      });

      // Chunk analysis
      console.log('\n🧩 Chunk Analysis:');
      const chunkSizes = chunks
        .map((chunk) => ({
          name: chunk.names[0] || 'unnamed',
          size: chunk.size,
          modules: chunk.modules?.length || 0,
        }))
        .sort((a, b) => b.size - a.size);

      chunkSizes.forEach((chunk) => {
        const sizeKB = (chunk.size / 1024).toFixed(2);
        console.log(
          `   ${chunk.name.padEnd(20)} ${sizeKB.padStart(8)} KB (${
            chunk.modules
          } modules)`,
        );
      });

      // Performance warnings
      const largeAssets = assets.filter((asset) => asset.size > 500000);
      if (largeAssets.length > 0) {
        console.log('\n⚠️  Large Assets Warning:');
        largeAssets.forEach((asset) => {
          console.log(
            `   ${asset.name} (${(asset.size / 1024).toFixed(2)} KB)`,
          );
        });
        console.log('   Consider code splitting or optimization');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });
  }
}
