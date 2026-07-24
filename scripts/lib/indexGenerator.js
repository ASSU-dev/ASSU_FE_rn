const fs = require("node:fs");
const path = require("node:path");
const { toApiAliasName } = require("./naming");
const { parseGeneratedFile } = require("./generatedParser");

function getAlreadyExportedNames(indexContent) {
	const names = new Set();

	for (const match of indexContent.matchAll(/export type \{([^}]+)\}/gs)) {
		for (const part of match[1].split(",")) {
			const name = part.trim();
			if (name && /^\w+$/.test(name)) names.add(name);
		}
	}

	for (const match of indexContent.matchAll(/export \{([^}]+)\} from/gs)) {
		for (const part of match[1].split(",")) {
			const trimmed = part.trim();
			if (!trimmed) continue;
			const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
			if (asMatch) {
				names.add(asMatch[1]);
				names.add(asMatch[2]);
			} else if (/^\w+$/.test(trimmed)) {
				names.add(trimmed);
			}
		}
	}

	return names;
}

function buildExportBlock(operationId, generatedFilePath, indexContent, paths) {
	const relativePath = `./${path
		.relative(paths.sharedApi, generatedFilePath)
		.replace(/\\/g, "/")
		.replace(/\.ts$/, "")}`;

	if (indexContent.includes(relativePath)) {
		return { alreadyRegistered: true, relativePath };
	}

	const { typeNames, enumNames, exportName } =
		parseGeneratedFile(generatedFilePath);
	if (!exportName) {
		throw new Error(`${operationId}의 export 함수를 찾지 못했습니다.`);
	}

	const alreadyExported = getAlreadyExportedNames(indexContent);
	const newTypeNames = typeNames.filter((name) => !alreadyExported.has(name));
	const newEnumNames = enumNames.filter((name) => !alreadyExported.has(name));
	const skipped = [
		...typeNames.filter((name) => alreadyExported.has(name)),
		...enumNames.filter((name) => alreadyExported.has(name)),
	];

	const aliasName = toApiAliasName(operationId);
	let block = `\n// ${operationId}\n`;
	block += `export { ${exportName} as ${aliasName} } from "${relativePath}";\n`;

	if (newTypeNames.length > 0) {
		block += "export type {\n";
		for (const name of newTypeNames) {
			block += `\t${name},\n`;
		}
		block += `} from "${relativePath}";\n`;
	}

	for (const name of newEnumNames) {
		block += `export { ${name} } from "${relativePath}";\n`;
	}

	return { alreadyRegistered: false, block, relativePath, skipped };
}

function updateIndexTs(operationId, generatedFilePath, paths) {
	let indexContent = "";
	if (fs.existsSync(paths.apiIndex)) {
		indexContent = fs.readFileSync(paths.apiIndex, "utf-8");
	}

	const { alreadyRegistered, block, skipped } = buildExportBlock(
		operationId,
		generatedFilePath,
		indexContent,
		paths,
	);

	if (alreadyRegistered) {
		console.log(`ℹ️  index.ts에 이미 등록됨: ${operationId}`);
		return;
	}

	if (skipped.length > 0) {
		console.log(`ℹ️  중복 타입 스킵: ${skipped.join(", ")}`);
	}

	fs.writeFileSync(paths.apiIndex, `${indexContent.trimEnd()}\n${block}`);
	console.log("✅ index.ts 등록 완료");
}

module.exports = {
	updateIndexTs,
};
