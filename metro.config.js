const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

module.exports = (() => {
	const config = getDefaultConfig(path.resolve(__dirname));

	const {
		resolver: { sourceExts, assetExts },
	} = config;

	config.transformer = {
		...config.transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer"),
	};

	config.resolver = {
		...config.resolver,
		assetExts: assetExts.filter((ext) => ext !== "svg"),
		sourceExts: [...sourceExts, "svg"],
	};

	return withNativeWind(config, {
		input: "./src/shared/styles/global.styles.css",
	});
})();
