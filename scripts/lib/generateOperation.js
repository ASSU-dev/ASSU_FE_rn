const fs = require("node:fs");
const path = require("node:path");
const { createHookFile } = require("./hookGenerator");
const { updateIndexTs } = require("./indexGenerator");
const { toDomainDir } = require("./naming");
const { runOrval } = require("./orval");
const { buildFilteredSpec } = require("./spec");

function getOperationOutputTarget(operationId, operation, paths) {
	const domainDir = toDomainDir(operation?.tags?.[0]);
	return {
		domainDir,
		outputTarget: path.join(paths.generatedApi, domainDir, `${operationId}.ts`),
	};
}

function generateOperation({
	operationId,
	operation,
	method,
	selectedFeature,
	spec,
	paths,
}) {
	const tmpSpecPath = path.join(paths.root, `.orval.tmp.${operationId}.json`);
	const { domainDir, outputTarget } = getOperationOutputTarget(
		operationId,
		operation,
		paths,
	);

	try {
		const filteredSpec = buildFilteredSpec(spec, [operationId]);
		fs.mkdirSync(path.dirname(outputTarget), { recursive: true });
		fs.writeFileSync(tmpSpecPath, JSON.stringify(filteredSpec, null, 2));

		console.log(
			`⚙️  ${operationId} → _generated/${domainDir}/${operationId}.ts`,
		);
		runOrval(tmpSpecPath, outputTarget, paths);
		updateIndexTs(operationId, outputTarget, paths);

		if (selectedFeature) {
			createHookFile(
				operationId,
				outputTarget,
				method,
				selectedFeature,
				operation,
				paths,
			);
		}
	} finally {
		if (fs.existsSync(tmpSpecPath)) {
			fs.unlinkSync(tmpSpecPath);
		}
	}
}

module.exports = {
	generateOperation,
};
