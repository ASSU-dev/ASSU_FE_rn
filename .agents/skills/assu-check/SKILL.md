---
name: assu-check
description: ASSU 프로젝트 전용 코드 품질 검사 스킬. 사용자가 "체크", "검사", "lint", "typecheck", "코드 확인", "assu-check", "품질 검사" 등을 언급할 때 사용한다. yarn biome:lint → yarn biome:format → yarn biome:fix → yarn typecheck 순서로 실행하고 결과를 요약한다.
---

# ASSU Check

ASSU 프로젝트의 코드 품질을 검사하는 스킬이다. 아래 순서대로 명령어를 실행하고 각 단계의 결과를 파악한 뒤 최종 요약을 제공한다.

## 실행 순서

프로젝트 루트(`C:/Projects/ASSU/ASSU_FE_RN`)에서 아래 명령을 **순서대로** 실행한다. 앞 단계가 실패해도 나머지 단계를 계속 실행해서 전체 상황을 파악한다.

1. `yarn biome:lint` — 린트 규칙 위반 검사
2. `yarn biome:format` — 코드 포맷 검사
3. `yarn biome:fix` — 자동 수정 가능한 이슈 수정
4. `yarn typecheck` — TypeScript 타입 오류 검사

## 결과 요약 형식

모든 명령 실행 후 아래 형식으로 요약한다:

```
## ASSU Check 결과

| 단계 | 상태 | 내용 |
|---|---|---|
| biome:lint | ✅ 통과 / ❌ 실패 | 오류 N개 |
| biome:format | ✅ 통과 / ❌ 실패 | 포맷 변경 N개 |
| biome:fix | ✅ 완료 / ⚠️ 일부 수동 필요 | 자동 수정 N개 |
| typecheck | ✅ 통과 / ❌ 실패 | 타입 오류 N개 |

### 조치 필요 항목
(오류가 있으면 파일명과 내용을 간략히 나열, 없으면 "없음")

### 최종 상태
(전체 통과 여부 한 줄 요약)
```

## 주의사항

- 각 명령의 출력이 길면 핵심 오류만 추려서 표시한다.
- `biome:fix`는 파일을 직접 수정하므로 수정된 파일 목록을 언급한다.
- typecheck 오류는 파일 경로와 줄 번호를 포함해서 알려준다.
