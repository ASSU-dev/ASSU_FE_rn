const fs = require("node:fs");
const path = require("node:path");

const iconsDir = path.join(__dirname, "../src/shared/assets/icons");
const outputFile = path.join(iconsDir, "index.ts");

function toPascalCase(str) {
	return str
		.replace(/[-_]/g, " ")
		.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1))
		.replace(/\s/g, "");
}

function generateIndex() {
	const files = fs
		.readdirSync(iconsDir)
		.filter((file) => file.endsWith(".svg"));

	const exports = files
		.map((file) => {
			const name = path.basename(file, ".svg");
			const componentName = toPascalCase(name);
			return `export { default as ${componentName} } from "./${file}";`;
		})
		.join("\n");

	fs.writeFileSync(outputFile, exports);
	console.log("✅ icons index updated");
}

generateIndex();
