const fs = require("node:fs");
const path = require("node:path");

const SOURCE = path.join(__dirname, "../.agents/skills");
const TARGET = path.join(__dirname, "../.claude/skills");

function copyRecursive(src, dest) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		fs.mkdirSync(dest, { recursive: true });
		for (const entry of fs.readdirSync(src)) {
			copyRecursive(path.join(src, entry), path.join(dest, entry));
		}
	} else {
		fs.copyFileSync(src, dest);
	}
}

function sync() {
	if (!fs.existsSync(SOURCE)) {
		console.error(`✖ source not found: ${SOURCE}`);
		process.exit(1);
	}

	fs.rmSync(TARGET, { recursive: true, force: true });
	copyRecursive(SOURCE, TARGET);

	const skills = fs
		.readdirSync(TARGET)
		.filter((name) => fs.statSync(path.join(TARGET, name)).isDirectory());

	console.log(`✅ synced ${skills.length} skill(s): ${skills.join(", ")}`);
	console.log(`   ${path.relative(process.cwd(), SOURCE)}`);
	console.log(`   → ${path.relative(process.cwd(), TARGET)}`);
}

sync();
