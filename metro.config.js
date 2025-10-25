const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db',
  // Add other asset extensions if needed
  'png',
  'jpg',
  'jpeg',
  'ttf',
  'otf'
);

// Handle asset registry
config.transformer.assetRegistryPath = require.resolve('react-native/Libraries/Image/AssetRegistry');

module.exports = config;