// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Required so Metro can resolve the "exports" field used by @supabase/supabase-js
// (and its sub-packages like @supabase/postgrest-js).
config.resolver.unstable_enablePackageExports = true;

// Import local .svg files as React components via react-native-svg-transformer.
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer/expo",
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;
