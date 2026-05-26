# generate-api.js

openapi 스펙에서 지정한 API만 골라 타입·axios 함수·React Query 훅까지 자동생성하는 스크립트.

orval을 직접 실행하면 스펙 전체(API 200개, DTO 200개)가 생성되는 문제를 해결하기 위해
필요한 API만 필터링한 미니 스펙을 만들어 orval에 넘기는 방식으로 동작한다.

---

## 실행 방법

프로젝트 루트(`ASSU_FE_RN/`)에서 실행한다.

```bash
# 사용 가능한 operationId 목록 확인
yarn generate:api --list

# 파일 생성 + index.ts 등록 (훅 제외)
yarn generate:api --operations ssuAuth

# 파일 생성 + index.ts 등록 + 훅 파일 생성 (권장)
yarn generate:api --operations ssuAuth --feature signup-user-flow

# 여러 API 한 번에 (콤마로 구분)
yarn generate:api --operations ssuAuth,signupStudent --feature signup-user-flow
```

> `node scripts/generate-api.js` 로 직접 실행해도 동일하다.

---

## 자동 처리 범위

| 플래그 | 1. _generated 파일 생성 | 2. index.ts 등록 | 3. 훅 파일 생성 |
|---|:---:|:---:|:---:|
| `--operations <id>` | ✅ | ✅ | ❌ |
| `--operations <id> --feature <name>` | ✅ | ✅ | ✅ |

- **HTTP 메서드 자동 감지**: GET → `useQuery`, 나머지 → `useMutation`
- **이미 등록된 경우**: 중복 없이 건너뜀
- **공통 DTO 중복 방지**: 여러 API가 같은 DTO를 참조하더라도 `index.ts`에 중복 export 없음
- **GET 파라미터 자동 감지**: 함수 시그니처를 파싱해 파라미터가 있으면 훅에 자동 반영
- **에러 격리**: 하나의 operationId 처리가 실패해도 나머지는 계속 진행

---

## 전체 흐름 (예시: getNotices 연동)

### 1단계 — operationId 확인

```bash
yarn generate:api --list
```

출력 예시:
```
ssuAuth          POST /auth/students/ssu-verify
signupStudent    POST /auth/students/signup
getNotices       GET  /notices
```

### 2단계 — 전체 자동생성

```bash
yarn generate:api --operations getNotices --feature notice
```

스크립트 내부 동작:
```
openapi/oepnapi.json (전체 스펙)
         ↓
getNotices 하나만 추출
         ↓
해당 API가 참조하는 DTO만 재귀 수집 ($ref 추적)
         ↓
미니 스펙 임시 파일 생성 (.orval.tmp.getNotices.json)
         ↓
orval 실행 → src/shared/api/_generated/auth/getNotices.ts 생성
         ↓
임시 파일 삭제 (에러 발생 시에도 반드시 정리)
         ↓
생성 파일 파싱 → 타입명·enum명·함수명·파라미터 타입 추출
         ↓
src/shared/api/index.ts에 export 자동 추가 (중복 타입 스킵)
         ↓
src/features/notice/api/useGetNoticesQuery.ts 생성
```

### 생성되는 파일

```typescript
// src/shared/api/_generated/auth/getNotices.ts  ← 수정 금지
export interface NoticeDTO { ... }

export const getAssuApi = () => {
  const getNotices = (params: GetNoticesParams) => customInstance(...)
  return { getNotices };
};
```

```typescript
// src/shared/api/index.ts  ← 자동 추가됨
// getNotices
export { getAssuApi as getGetNoticesApi } from "./_generated/auth/getNotices";
export type { NoticeDTO, ... } from "./_generated/auth/getNotices";
```

```typescript
// GET + 파라미터 있는 경우
// src/features/notice/api/useGetNoticesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getGetNoticesApi } from "@/shared/api";
import type { GetNoticesParams } from "@/shared/api";

const { getNotices } = getGetNoticesApi();

export function useGetNoticesQuery(params: GetNoticesParams) {
  return useQuery({
    queryKey: ["getNotices", params],
    queryFn: () => getNotices(params),
  });
}
```

```typescript
// GET + 파라미터 없는 경우
export function useGetNoticesQuery() {
  return useQuery({
    queryKey: ["getNotices"],
    queryFn: getNotices,
  });
}
```

```typescript
// POST / PUT / DELETE
export function useCreateNoticeMutation() {
  return useMutation({ mutationFn: createNotice });
}
```

### 3단계 — 컴포넌트에서 사용

```typescript
const { data, isLoading } = useGetNoticesQuery({ page: 1 });
const mutation = useCreateNoticeMutation();

mutation.mutate({ title: "공지", content: "..." });
```

---

## 폴더 구조 요약

```
openapi/oepnapi.json                         ← 스펙 원본 (수정 금지)
scripts/generate-api.js                      ← 생성 스크립트
src/shared/api/
  index.ts                                   ← Public API (스크립트가 자동 등록)
  orvalMutator.ts                            ← apiInstance 연결 (수정 불필요)
  _generated/auth/<operationId>.ts           ← 자동생성 (수정 금지)
src/features/<feature>/api/
  use<Name>Query.ts / use<Name>Mutation.ts   ← 스크립트가 자동 생성
```

---

## 함수 설명

### `collectSchemaRefs`
API 정의에서 `$ref`를 따라가며 필요한 DTO 이름을 재귀적으로 수집한다.
중첩 참조(DTO가 다른 DTO를 참조)도 빠짐없이 추적한다.

### `buildFilteredSpec`
전체 스펙에서 지정한 operationId의 경로와 수집된 DTO만 남긴 미니 스펙을 반환한다.

### `listOperations`
`--list` 옵션 실행 시 스펙의 모든 operationId와 HTTP 메서드/경로를 출력한다.

### `getOperationMethods`
operationId별 HTTP 메서드를 추출한다. 훅 종류(Query/Mutation) 결정에 사용한다.

### `runOrval`
미니 스펙을 입력으로 orval을 실행한다.
임시 config 파일(`.orval.tmp.config.js`)을 만들어 orval에 넘기고 실행 후 삭제한다.
생성된 파일은 `src/shared/api/orvalMutator.ts`의 `customInstance`를 통해 기존 axios 인스턴스를 사용한다.

### `parseGeneratedFile`
생성된 `.ts` 파일을 파싱해 타입명·enum명·함수명·파라미터 타입을 추출한다.
- enum: `export type X = typeof X[keyof typeof X]` 패턴으로 감지
- 파라미터 타입: 함수 시그니처에서 추출, GET 훅 템플릿 분기에 사용
- orval 내부 `Result` 타입은 제외

### `getAlreadyExportedNames`
현재 `index.ts`에 이미 export된 타입·enum 이름을 수집한다.
여러 API가 동일한 공통 DTO(예: `PageDTO`)를 참조할 때 중복 export를 방지한다.

### `updateIndexTs`
`src/shared/api/index.ts`에 새 API의 export를 추가한다.
- 이미 등록된 operationId면 건너뜀
- 다른 API에서 이미 export된 타입은 스킵하고 로그 출력

### `createHookFile`
`src/features/<feature>/api/` 아래에 React Query 훅 파일을 생성한다.
- GET + 파라미터 있음: `(params: ParamType)` 받아서 `queryKey`에 포함
- GET + 파라미터 없음: 기본 `useQuery` 템플릿
- POST/PUT/DELETE: `useMutation` 템플릿

### `run`
진입점. operationId별로 생성 → index.ts 등록 → 훅 생성을 순서대로 실행한다.
각 operationId는 독립적인 `try/catch/finally`로 감싸져 하나가 실패해도 나머지를 계속 처리한다.
`finally`에서 임시 파일(`.orval.tmp.*.json`)을 무조건 정리한다.
