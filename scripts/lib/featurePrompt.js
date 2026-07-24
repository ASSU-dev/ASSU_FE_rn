const fs = require("node:fs");
const readline = require("node:readline");

function getAvailableFeatures(paths) {
	return fs
		.readdirSync(paths.features, { withFileTypes: true })
		.filter((directory) => directory.isDirectory())
		.map((directory) => directory.name);
}

function promptFeatureSelection(features) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log(
			"\n❓ --feature 가 없습니다. 어느 feature에 훅을 생성할까요?\n",
		);
		features.forEach((name, index) => {
			console.log(`   ${index + 1}. ${name}`);
		});
		console.log(`   ${features.length + 1}. 훅 생성 건너뜀\n`);

		rl.question(`선택 (1-${features.length + 1}): `, (answer) => {
			rl.close();
			const index = parseInt(answer, 10) - 1;
			if (index >= 0 && index < features.length) {
				resolve(features[index]);
			} else {
				resolve(null);
			}
		});
	});
}

module.exports = {
	getAvailableFeatures,
	promptFeatureSelection,
};
