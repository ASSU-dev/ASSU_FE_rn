const path = require("node:path");

module.exports = (api) => {
	api.cache(true);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins: [
			[
				"module-resolver",
				{
					root: [path.resolve(__dirname, "src")],
					alias: {
						"@": path.resolve(__dirname, "src"),
					},
				},
			],
		],
	};
};
