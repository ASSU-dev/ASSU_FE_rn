const { toPascalCase } = require("./naming");

function collectSchemaRefs(node, allSchemas, visited = new Set()) {
	if (!node || typeof node !== "object") return visited;
	if (Array.isArray(node)) {
		for (const item of node) {
			collectSchemaRefs(item, allSchemas, visited);
		}
		return visited;
	}
	const ref = node.$ref;
	if (ref) {
		const name = ref.split("/").pop();
		if (!visited.has(name)) {
			visited.add(name);
			if (allSchemas[name]) {
				collectSchemaRefs(allSchemas[name], allSchemas, visited);
			}
		}
	}
	for (const value of Object.values(node)) {
		collectSchemaRefs(value, allSchemas, visited);
	}
	return visited;
}

function buildFilteredSpec(spec, operationIds) {
	const allSchemas = spec.components?.schemas ?? {};
	const filteredPaths = {};
	const usedSchemaNames = new Set();

	for (const [pathKey, pathItem] of Object.entries(spec.paths ?? {})) {
		const filteredMethods = {};
		for (const [method, operation] of Object.entries(pathItem)) {
			if (
				typeof operation === "object" &&
				operationIds.includes(operation.operationId)
			) {
				filteredMethods[method] = operation;
				collectSchemaRefs(operation, allSchemas, usedSchemaNames);
			}
		}
		if (Object.keys(filteredMethods).length > 0) {
			filteredPaths[pathKey] = filteredMethods;
		}
	}

	if (Object.keys(filteredPaths).length === 0) {
		console.error(`❌ 찾을 수 없는 operationId: ${operationIds.join(", ")}`);
		console.error("사용 가능한 목록: node scripts/generate-api.js --list");
		process.exit(1);
	}

	const filteredSchemas = {};
	for (const name of usedSchemaNames) {
		if (allSchemas[name]) filteredSchemas[name] = allSchemas[name];
	}

	return {
		...spec,
		paths: filteredPaths,
		components: { ...spec.components, schemas: filteredSchemas },
	};
}

function listOperations(spec) {
	console.log("\n사용 가능한 operationId 목록:\n");
	for (const [pathKey, pathItem] of Object.entries(spec.paths ?? {})) {
		for (const [method, operation] of Object.entries(pathItem)) {
			if (typeof operation === "object" && operation.operationId) {
				console.log(
					`  ${operation.operationId.padEnd(45)} ${method.toUpperCase()} ${pathKey}`,
				);
			}
		}
	}
}

function getOperationIds(spec) {
	return Object.values(spec.paths ?? {}).flatMap((pathItem) =>
		Object.values(pathItem)
			.filter(
				(operation) => typeof operation === "object" && operation.operationId,
			)
			.map((operation) => operation.operationId),
	);
}

function getOperationMethods(spec, operationIds) {
	const methods = {};
	for (const [, pathItem] of Object.entries(spec.paths ?? {})) {
		for (const [method, operation] of Object.entries(pathItem)) {
			if (
				typeof operation === "object" &&
				operationIds.includes(operation.operationId)
			) {
				methods[operation.operationId] = method.toUpperCase();
			}
		}
	}
	return methods;
}

function getOperationsById(spec, operationIds) {
	const operations = {};
	for (const [, pathItem] of Object.entries(spec.paths ?? {})) {
		for (const [, operation] of Object.entries(pathItem)) {
			if (
				typeof operation === "object" &&
				operationIds.includes(operation.operationId)
			) {
				operations[operation.operationId] = operation;
			}
		}
	}
	return operations;
}

function getSchemaTypeName(schema) {
	if (!schema || typeof schema !== "object") return null;
	if (schema.$ref) return schema.$ref.split("/").pop();
	return null;
}

function getRequestBodyTypeName(operation) {
	const content = operation.requestBody?.content ?? {};
	for (const mediaType of Object.values(content)) {
		const typeName = getSchemaTypeName(mediaType.schema);
		if (typeName) return typeName;
	}
	return null;
}

function getOperationParamInfo(operationId, operation) {
	if (!operation) return null;

	const bodyTypeName = getRequestBodyTypeName(operation);
	if (bodyTypeName) {
		return {
			typeName: bodyTypeName,
			required: operation.requestBody?.required === true,
		};
	}

	if ((operation.parameters ?? []).length > 0) {
		return {
			typeName: `${toPascalCase(operationId)}Params`,
			required: operation.parameters.some((param) => param.required === true),
		};
	}

	return null;
}

module.exports = {
	buildFilteredSpec,
	getOperationIds,
	getOperationMethods,
	getOperationParamInfo,
	getOperationsById,
	listOperations,
};
