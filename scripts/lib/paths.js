const path = require("node:path");

const ROOT = path.resolve(__dirname, "../..");
const SHARED_API_DIR = path.join(ROOT, "src/shared/api");

const PATHS = {
	root: ROOT,
	spec: path.join(ROOT, "openapi/openapi.json"),
	features: path.join(ROOT, "src/features"),
	sharedApi: SHARED_API_DIR,
	apiIndex: path.join(SHARED_API_DIR, "index.ts"),
	generatedApi: path.join(SHARED_API_DIR, "_generated"),
	orvalConfig: path.join(ROOT, ".orval.tmp.config.js"),
	orvalMutator: path.join(SHARED_API_DIR, "orvalMutator.ts"),
};

module.exports = { PATHS };
