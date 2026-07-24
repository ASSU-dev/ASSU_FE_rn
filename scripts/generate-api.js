const fs = require("node:fs");
const {
	getAvailableFeatures,
	promptFeatureSelection,
} = require("./lib/featurePrompt");
const { generateOperation } = require("./lib/generateOperation");
const { PATHS } = require("./lib/paths");
const {
	getOperationIds,
	getOperationMethods,
	getOperationsById,
	listOperations,
} = require("./lib/spec");

const args = process.argv.slice(2);

function getArgValue(name) {
	const index = args.indexOf(name);
	return index !== -1 ? args[index + 1] : null;
}

function getTargetOperationIds(spec) {
	const operationsArg = getArgValue("--operations");
	if (!operationsArg) return getOperationIds(spec);

	return operationsArg.split(",").map((operationId) => operationId.trim());
}

async function getSelectedFeature() {
	const featureArg = getArgValue("--feature");
	if (featureArg) return featureArg;

	const features = getAvailableFeatures(PATHS);
	return promptFeatureSelection(features);
}

async function run() {
	const spec = JSON.parse(fs.readFileSync(PATHS.spec, "utf-8"));

	if (args.includes("--list")) {
		listOperations(spec);
		return;
	}

	const operationsToProcess = getTargetOperationIds(spec);
	console.log(`\n🔍 생성 대상: ${operationsToProcess.join(", ")}`);

	const operationMethods = getOperationMethods(spec, operationsToProcess);
	const operationsById = getOperationsById(spec, operationsToProcess);
	const selectedFeature = await getSelectedFeature();
	const failed = [];

	console.log("");

	for (const operationId of operationsToProcess) {
		try {
			generateOperation({
				operationId,
				operation: operationsById[operationId],
				method: operationMethods[operationId] ?? "POST",
				selectedFeature,
				spec,
				paths: PATHS,
			});
		} catch (err) {
			console.error(`❌ ${operationId} 처리 실패: ${err.message}`);
			failed.push(operationId);
		}
	}

	if (failed.length > 0) {
		console.log(`\n⚠️  실패한 항목: ${failed.join(", ")}\n`);
	} else {
		console.log("\n✅ 완료\n");
	}
}

run();
