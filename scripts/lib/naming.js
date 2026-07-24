function toPascalCase(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function toApiAliasName(operationId) {
	return `get${toPascalCase(operationId)}Api`;
}

function toHookName(operationId, method) {
	const suffix = method === "GET" ? "Query" : "Mutation";
	return `use${toPascalCase(operationId)}${suffix}`;
}

function toDomainDir(tag) {
	if (!tag) return "common";

	const words = tag.match(/[A-Za-z0-9]+/g);
	if (!words) return "common";

	return words
		.map((word, index) => {
			const normalized = word.toLowerCase();
			if (index === 0) return normalized;
			return normalized.charAt(0).toUpperCase() + normalized.slice(1);
		})
		.join("");
}

module.exports = {
	toApiAliasName,
	toDomainDir,
	toHookName,
	toPascalCase,
};
