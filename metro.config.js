const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: getDefaultConfig().resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...getDefaultConfig().resolver.sourceExts, 'svg', 'jpeg', 'jpg', 'png'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

