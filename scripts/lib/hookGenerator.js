const fs = require("node:fs");
const path = require("node:path");
const { parseGeneratedFile } = require("./generatedParser");
const { toApiAliasName, toHookName } = require("./naming");
const { getOperationParamInfo } = require("./spec");

function buildApiInitializer(aliasName, apiFnName, isWrappedApi) {
	if (!isWrappedApi) return "\n";
	return `\nconst { ${apiFnName} } = ${aliasName}();\n\n`;
}

function buildQueryHook({
	aliasName,
	apiFnName,
	apiInitializer,
	hookName,
	paramInfo,
}) {
	if (paramInfo) {
		return `import { useQuery } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";
import type { ${paramInfo.typeName} } from "@/shared/api";
${apiInitializer}
export function ${hookName}(params${paramInfo.required ? "" : "?"}: ${paramInfo.typeName}) {
\treturn useQuery({
\t\tqueryKey: ["${apiFnName}", params],
\t\tqueryFn: () => ${apiFnName}(params),
\t});
}
`;
	}

	return `import { useQuery } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";
${apiInitializer}
export function ${hookName}() {
\treturn useQuery({
\t\tqueryKey: ["${apiFnName}"],
\t\tqueryFn: ${apiFnName},
\t});
}
`;
}

function buildMutationHook({ aliasName, apiFnName, apiInitializer, hookName }) {
	return `import { useMutation } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";
${apiInitializer}
export function ${hookName}() {
\treturn useMutation({ mutationFn: ${apiFnName} });
}
`;
}

function createHookFile(
	operationId,
	generatedFilePath,
	method,
	feature,
	operation,
	paths,
) {
	const { exportName, operationFnName } = parseGeneratedFile(generatedFilePath);
	if (!exportName) {
		console.warn("⚠️  export 함수를 찾지 못해 훅 생성을 건너뜁니다.");
		return;
	}

	const hookName = toHookName(operationId, method);
	const aliasName = toApiAliasName(operationId);
	const isQuery = method === "GET";
	const isWrappedApi = Boolean(operationFnName);
	const apiFnName = operationFnName ?? aliasName;
	const apiInitializer = buildApiInitializer(
		aliasName,
		apiFnName,
		isWrappedApi,
	);
	const paramInfo = getOperationParamInfo(operationId, operation);

	const featureDir = path.join(paths.features, feature, "api");
	fs.mkdirSync(featureDir, { recursive: true });

	const fileName = `${hookName}.ts`;
	const filePath = path.join(featureDir, fileName);

	if (fs.existsSync(filePath)) {
		console.log(
			`ℹ️  훅 파일 이미 존재: src/features/${feature}/api/${fileName}`,
		);
		return;
	}

	const hookContent = isQuery
		? buildQueryHook({
				aliasName,
				apiFnName,
				apiInitializer,
				hookName,
				paramInfo,
			})
		: buildMutationHook({ aliasName, apiFnName, apiInitializer, hookName });

	fs.writeFileSync(filePath, hookContent);
	console.log(`✅ 훅 생성: src/features/${feature}/api/${fileName}`);
}

module.exports = {
	createHookFile,
};
