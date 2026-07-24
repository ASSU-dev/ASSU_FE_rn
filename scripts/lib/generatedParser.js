const fs = require("node:fs");

function parseTypeNames(content) {
	const interfaces = [...content.matchAll(/^export interface (\w+)/gm)].map(
		(match) => match[1],
	);

	const enumNames = [
		...content.matchAll(/^export type (\w+) = typeof \1\[keyof typeof \1\]/gm),
	].map((match) => match[1]);

	const allTypeAliases = [...content.matchAll(/^export type (\w+) =/gm)].map(
		(match) => match[1],
	);

	const typeAliases = allTypeAliases.filter(
		(name) => !enumNames.includes(name) && !name.endsWith("Result"),
	);

	return {
		enumNames,
		typeNames: [...interfaces, ...typeAliases],
	};
}

function parseExports(content) {
	const exportedFunctions = [
		...content.matchAll(/^export const (\w+)\s*=/gm),
	].map((match) => match[1]);

	const returnMatch = content.match(/return\s*\{\s*(\w+)\s*\}\s*;?/);
	const operationFnName = returnMatch ? returnMatch[1] : null;

	const exportName =
		exportedFunctions.find((name) => name === "getAssuApi") ??
		exportedFunctions.find((name) => name === operationFnName) ??
		exportedFunctions[0] ??
		null;

	return { exportName, operationFnName };
}

function parseGeneratedFile(filePath) {
	const content = fs.readFileSync(filePath, "utf-8");

	return {
		...parseTypeNames(content),
		...parseExports(content),
	};
}

module.exports = {
	parseGeneratedFile,
};
