const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");
const SPEC_PATH = path.join(ROOT, "openapi/oepnapi.json");

const args = process.argv.slice(2);
const opsArgIndex = args.indexOf("--operations");
const opsArg = opsArgIndex !== -1 ? args[opsArgIndex + 1] : null;
const targetOperationIds = opsArg
  ? opsArg.split(",").map((s) => s.trim())
  : null;

const featureArgIndex = args.indexOf("--feature");
const featureArg = featureArgIndex !== -1 ? args[featureArgIndex + 1] : null;

function collectSchemaRefs(node, allSchemas, visited = new Set()) {
  if (!node || typeof node !== "object") return visited;
  if (Array.isArray(node)) {
    for (const item of node) {
      collectSchemaRefs(item, allSchemas, visited);
    }
    return visited;
  }
  const ref = node["$ref"];
  if (ref) {
    const name = ref.split("/").pop();
    if (!visited.has(name)) {
      visited.add(name);
      if (allSchemas[name]) {
        collectSchemaRefs(allSchemas[name], allSchemas, visited);
      }
    }
  }
  for (const v of Object.values(node)) {
    collectSchemaRefs(v, allSchemas, visited);
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

function runOrval(inputSpecPath, outputTarget) {
  const tmpConfigPath = path.join(ROOT, ".orval.tmp.config.js");
  const config = {
    api: {
      input: { target: inputSpecPath },
      output: {
        target: outputTarget,
        mode: "single",
        client: "axios",
        mock: false,
        override: {
          mutator: {
            path: path.join(ROOT, "src/shared/api/orvalMutator.ts"),
            name: "customInstance",
          },
        },
      },
    },
  };

  fs.writeFileSync(
    tmpConfigPath,
    `module.exports = ${JSON.stringify(config, null, 2)}`,
  );

  try {
    execSync(`npx orval --config ${tmpConfigPath}`, { stdio: "inherit" });
  } finally {
    fs.unlinkSync(tmpConfigPath);
  }
}

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

function parseGeneratedFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const interfaces = [...content.matchAll(/^export interface (\w+)/gm)].map(
    (m) => m[1],
  );

  // "export type X = typeof X[keyof typeof X]" 패턴이 enum
  const enumNames = [
    ...content.matchAll(
      /^export type (\w+) = typeof \1\[keyof typeof \1\]/gm,
    ),
  ].map((m) => m[1]);

  const allTypeAliases = [...content.matchAll(/^export type (\w+) =/gm)].map(
    (m) => m[1],
  );

  // enum과 orval 내부 Result 타입 제외
  const typeAliases = allTypeAliases.filter(
    (name) => !enumNames.includes(name) && !name.endsWith("Result"),
  );

  const typeNames = [...interfaces, ...typeAliases];

  // "return {operationFnName}};" 에서 함수명 추출
  const returnMatch = content.match(/return \{(\w+)\}\}/);
  const operationFnName = returnMatch ? returnMatch[1] : null;

  // 함수 파라미터 타입 추출 (GET useQuery 템플릿에 사용)
  let paramType = null;
  if (operationFnName) {
    const paramPattern = new RegExp(
      `const ${operationFnName} = \\(\\s*\\w+:\\s*(\\w+)`,
      "s",
    );
    const paramMatch = content.match(paramPattern);
    if (paramMatch) {
      paramType = paramMatch[1];
    }
  }

  return { typeNames, enumNames, operationFnName, paramType };
}

// index.ts에 이미 export된 타입/enum 이름 수집 (중복 방지용)
function getAlreadyExportedNames(indexContent) {
  const names = new Set();

  // export type { A, B, C } from (멀티라인 포함)
  for (const match of indexContent.matchAll(/export type \{([^}]+)\}/gs)) {
    for (const part of match[1].split(",")) {
      const name = part.trim();
      if (name && /^\w+$/.test(name)) names.add(name);
    }
  }

  // export { EnumName } from (as 없는 단순 export만)
  for (const match of indexContent.matchAll(/export \{ (\w+) \} from/g)) {
    names.add(match[1]);
  }

  return names;
}

function updateIndexTs(operationId, generatedFilePath) {
  const indexPath = path.join(ROOT, "src/shared/api/index.ts");
  let indexContent = fs.readFileSync(indexPath, "utf-8");

  if (indexContent.includes(`_generated/auth/${operationId}`)) {
    console.log(`ℹ️  index.ts에 이미 등록됨: ${operationId}`);
    return;
  }

  const { typeNames, enumNames } = parseGeneratedFile(generatedFilePath);
  const alreadyExported = getAlreadyExportedNames(indexContent);

  // 이미 다른 API에서 export된 타입은 제외
  const newTypeNames = typeNames.filter((name) => !alreadyExported.has(name));
  const newEnumNames = enumNames.filter((name) => !alreadyExported.has(name));

  const skipped = [
    ...typeNames.filter((n) => alreadyExported.has(n)),
    ...enumNames.filter((n) => alreadyExported.has(n)),
  ];
  if (skipped.length > 0) {
    console.log(`ℹ️  중복 타입 스킵: ${skipped.join(", ")}`);
  }

  const aliasName = toApiAliasName(operationId);
  const relativePath = `./_generated/auth/${operationId}`;

  let newExports = `\n// ${operationId}\n`;
  newExports += `export { getAssuApi as ${aliasName} } from "${relativePath}";\n`;

  if (newTypeNames.length > 0) {
    newExports += `export type {\n`;
    for (const name of newTypeNames) {
      newExports += `\t${name},\n`;
    }
    newExports += `} from "${relativePath}";\n`;
  }

  for (const name of newEnumNames) {
    newExports += `export { ${name} } from "${relativePath}";\n`;
  }

  indexContent = indexContent.trimEnd() + "\n" + newExports;
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✅ index.ts 등록 완료`);
}

function createHookFile(operationId, generatedFilePath, method, feature) {
  const { operationFnName, paramType } = parseGeneratedFile(generatedFilePath);
  if (!operationFnName) {
    console.warn(`⚠️  operationFnName을 찾지 못해 훅 생성을 건너뜁니다.`);
    return;
  }

  const hookName = toHookName(operationId, method);
  const aliasName = toApiAliasName(operationId);
  const isQuery = method === "GET";

  const featureDir = path.join(ROOT, `src/features/${feature}/api`);
  fs.mkdirSync(featureDir, { recursive: true });

  const fileName = `${hookName}.ts`;
  const filePath = path.join(featureDir, fileName);

  if (fs.existsSync(filePath)) {
    console.log(
      `ℹ️  훅 파일 이미 존재: src/features/${feature}/api/${fileName}`,
    );
    return;
  }

  let content;

  if (isQuery && paramType) {
    // GET + 파라미터 있음
    content = `import { useQuery } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";
import type { ${paramType} } from "@/shared/api";

const { ${operationFnName} } = ${aliasName}();

export function ${hookName}(params: ${paramType}) {
\treturn useQuery({
\t\tqueryKey: ["${operationFnName}", params],
\t\tqueryFn: () => ${operationFnName}(params),
\t});
}
`;
  } else if (isQuery) {
    // GET + 파라미터 없음
    content = `import { useQuery } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";

const { ${operationFnName} } = ${aliasName}();

export function ${hookName}() {
\treturn useQuery({
\t\tqueryKey: ["${operationFnName}"],
\t\tqueryFn: ${operationFnName},
\t});
}
`;
  } else {
    // POST / PUT / DELETE
    content = `import { useMutation } from "@tanstack/react-query";
import { ${aliasName} } from "@/shared/api";

const { ${operationFnName} } = ${aliasName}();

export function ${hookName}() {
\treturn useMutation({ mutationFn: ${operationFnName} });
}
`;
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ 훅 생성: src/features/${feature}/api/${fileName}`);
}

function getAvailableFeatures() {
  const featuresDir = path.join(ROOT, "src/features");
  return fs
    .readdirSync(featuresDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function promptFeatureSelection(features) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n❓ --feature 가 없습니다. 어느 feature에 훅을 생성할까요?\n");
    features.forEach((name, i) => {
      console.log(`   ${i + 1}. ${name}`);
    });
    console.log(`   ${features.length + 1}. 훅 생성 건너뜀\n`);

    rl.question(`선택 (1-${features.length + 1}): `, (answer) => {
      rl.close();
      const index = parseInt(answer, 10) - 1;
      if (index >= 0 && index < features.length) {
        resolve(features[index]);
      } else {
        resolve(null);
      }
    });
  });
}

async function run() {
  const spec = JSON.parse(fs.readFileSync(SPEC_PATH, "utf-8"));

  if (args.includes("--list")) {
    listOperations(spec);
    return;
  }

  const operationsToProcess = targetOperationIds
    ? targetOperationIds
    : Object.values(spec.paths ?? {}).flatMap((pathItem) =>
        Object.values(pathItem)
          .filter((op) => typeof op === "object" && op.operationId)
          .map((op) => op.operationId),
      );

  console.log(`\n🔍 생성 대상: ${operationsToProcess.join(", ")}`);

  const operationMethods = getOperationMethods(spec, operationsToProcess);

  // --feature 없으면 대화형 선택
  let selectedFeature = featureArg;
  if (!selectedFeature) {
    const features = getAvailableFeatures();
    selectedFeature = await promptFeatureSelection(features);
  }

  console.log("");
  const failed = [];

  for (const operationId of operationsToProcess) {
    const tmpSpecPath = path.join(ROOT, `.orval.tmp.${operationId}.json`);
    const outputTarget = path.join(
      ROOT,
      `src/shared/api/_generated/auth/${operationId}.ts`,
    );

    try {
      const filteredSpec = buildFilteredSpec(spec, [operationId]);
      fs.mkdirSync(path.dirname(outputTarget), { recursive: true });
      fs.writeFileSync(tmpSpecPath, JSON.stringify(filteredSpec, null, 2));

      console.log(`⚙️  ${operationId} → _generated/auth/${operationId}.ts`);
      runOrval(tmpSpecPath, outputTarget);

      updateIndexTs(operationId, outputTarget);

      if (selectedFeature) {
        const method = operationMethods[operationId] ?? "POST";
        createHookFile(operationId, outputTarget, method, selectedFeature);
      }
    } catch (err) {
      console.error(`❌ ${operationId} 처리 실패: ${err.message}`);
      failed.push(operationId);
    } finally {
      if (fs.existsSync(tmpSpecPath)) {
        fs.unlinkSync(tmpSpecPath);
      }
    }
  }

  if (failed.length > 0) {
    console.log(`\n⚠️  실패한 항목: ${failed.join(", ")}\n`);
  } else {
    console.log("\n✅ 완료\n");
  }
}

run();
