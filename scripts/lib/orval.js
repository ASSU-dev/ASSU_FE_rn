const { execSync } = require("node:child_process");
const fs = require("node:fs");

function runOrval(inputSpecPath, outputTarget, paths) {
	const config = {
		api: {
			input: { target: inputSpecPath },
			output: {
				target: outputTarget,
				mode: "single",
				client: "axios",
				mock: false,
				override: {
					mutator: {
						path: paths.orvalMutator,
						name: "customInstance",
					},
				},
			},
		},
	};

	fs.writeFileSync(
		paths.orvalConfig,
		`module.exports = ${JSON.stringify(config, null, 2)}`,
	);

	try {
		execSync(`npx orval --config ${paths.orvalConfig}`, { stdio: "inherit" });
	} finally {
		fs.unlinkSync(paths.orvalConfig);
	}
}

module.exports = { runOrval };
