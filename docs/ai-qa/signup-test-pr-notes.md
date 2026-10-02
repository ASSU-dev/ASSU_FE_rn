# 회원가입 테스트 코드 PR 작업 기록

이 문서는 회원가입 테스트 코드 PR에서 테스트 범위를 어떻게 정하고 구현했는지 기록한다. 리뷰어가 테스트의 의도, mock 경계, 남은 보완 항목을 빠르게 확인할 수 있도록 작성했다.

## 목표

회원가입은 역할별 입력 단계, 휴대폰 인증, 파일 업로드, 가입 API 호출이 연결된 흐름이다. 이 PR은 전체 E2E를 한 번에 추가하지 않고, 회귀 비용이 큰 규칙부터 단위·훅·컴포넌트 테스트로 보호한다.

## 에이전트 요청·응답 발췌

아래는 이 PR에서 테스트 스킬을 사용한 실제 대화의 핵심 발췌다. 도구 호출 출력과 긴 파일 목록은 제외했으며, 요청·설계·승인·보완 판단이 어떻게 이어졌는지 확인하는 용도다.

### 1. 테스트 작성 요청

> 사용자: `$assu-test 회원가입 기능 테스트 코드 작성해줘.`

> 에이전트: `회원가입은 여러 단계와 API가 얽힌 기능이라, 스킬 기준에 따라 먼저 코드·기존 테스트를 바탕으로 전체 테스트 후보와 우선순위를 설계한 뒤 가장 중요한 한 흐름부터 구현하겠습니다.`

### 2. 설계 응답과 구현 승인 요청

> 에이전트: `회원가입 테스트 설계를 정리했습니다. 기능 범위가 커서, 아래 후보 중 가장 높은 우선순위의 한 규칙부터 구현하는 방식이 안전합니다.`

| 우선순위 | 대상 | 계층 | 발췌한 시나리오 |
| --- | --- | --- | --- |
| P0 | 단계별 유효성 검증 | 단위 | 휴대폰 인증번호 발송·유효시간·입력값이 모두 충족될 때만 다음 단계 진행 |
| P0 | 가입 요청 payload 변환 | 단위 | 역할별 요청과 첨부 파일을 API 형식으로 변환 |
| P0 | 휴대폰 인증 액션 | 훅 | 번호 정규화, 발송·검증 성공 및 실패 처리 |
| P1 | 역할별 가입 액션 | 훅 | 가입 성공 시 완료 단계 이동, 실패 시 안내 및 복구 |
| P2 | 약관·역할 선택 UI | 컴포넌트 | 약관 상태·토글, 역할 선택 UI |
| E2E 후보 | 역할 선택부터 가입 완료 | E2E | 역할별 정상 가입 및 인증·중복 가입 실패 여정 |

> 에이전트: `첫 구현 후보는 validation.test.ts의 “개인정보 동의와 첨부 파일이 있어야 관리자·제휴업체 가입을 진행할 수 있다”입니다. ... 이 목록에서 빠진 사용자 흐름, 실패 상황, 역할별 예외 또는 팀 정책이 있나요?`

> 사용자: `p2까지 모두 구현해줘`

### 3. 구현 결과 보고

> 에이전트: `회원가입 P0~P2 테스트를 추가했습니다. 테스트 실행은 프로젝트 규칙에 따라 하지 않았고, git diff --check만 통과 확인했습니다.`

> 에이전트: `의도적으로 제외한 범위는 실제 기기·서버를 연결하는 전체 가입 E2E입니다.`

### 4. 실제 테스트 실행과 수정

> 사용자: `yarn test signup-user-flow` 실행 결과에서 `usePhoneVerificationAction`의 실패 Alert 기대값이 실제 값과 다르다고 보고했다.

> 에이전트: `실패 원인은 구현이 fallback 문구보다 Error.message를 우선 노출하도록 되어 있는데, 테스트가 임의의 "failed" 오류와 fallback 문구를 동시에 기대했기 때문입니다.`

> 에이전트: 오류 mock을 메시지 없는 `new Error()`로 변경하고, 재실행을 요청했다.

### 5. 외부 피드백으로 발견한 보완 항목

> 사용자: `근데 반드시 추가: verifyCode 성공 → 정규화된 payload, onVerified 호출 이거 왜 빠진거야? 테스트코드스킬이 너무 품질이 별론가?`

> 에이전트: `스킬에는 “정상·경계·실패를 설계하라”는 원칙은 있지만, 구현 직전에 sendCode와 verifyCode를 각각 나눠 성공·실패 케이스가 실제 테스트 파일에 모두 존재하는지 강제하는 체크리스트가 없습니다.`

이 피드백에 따라 `verifyCode` 성공 경로는 병합 전 추가해야 할 보완 항목으로 관리한다. 이 누락은 테스트 스킬의 설계 지침이 구현 단위의 완료 조건까지 강제하지 못한 사례이기도 하다.

## 사용한 작업 흐름

1. `assu-test` 스킬로 회원가입 관련 소스, 기존 테스트 환경, `docs/testing-strategy.md`를 확인했다.
2. 역할별 가입 규칙을 순수 로직, API 훅, UI 컴포넌트, E2E 후보로 분류했다.
3. 전체 가입 기능이 크므로 구현 후보와 우선순위를 먼저 제안하고, P0~P2 구현 범위를 승인받았다.
4. 승인된 범위에 한해 테스트를 추가하고 `docs/ai-qa/test-dashboard.md`에 기록했다.
5. 테스트 실행은 요청자가 수행했다. 실행 결과에서 발견된 Alert 기대값 문제는 실제 `getApiErrorMessage` 동작에 맞춰 수정했다.

## 테스트 범위와 이유

| 우선순위 | 계층 | 보호하는 사용자 규칙 | 테스트 파일 |
| --- | --- | --- | --- |
| P0 | 단위 | 인증번호 발송 여부·유효시간·입력값이 충족될 때만 본인인증 단계를 진행한다. | `src/features/signup-user-flow/model/validation.test.ts` |
| P0 | 단위 | 제휴업체·관리자 가입에는 개인정보 동의와 첨부 파일이 필요하다. | `src/features/signup-user-flow/model/validation.test.ts` |
| P0 | 단위 | 관리자 조직 유형에 따라 단과대·학과·주소의 필수 조건이 달라진다. | `src/features/signup-user-flow/model/validation.test.ts` |
| P0 | 단위 | 학생·제휴업체·관리자 가입 요청은 역할별 API payload와 업로드 파일을 올바르게 만든다. | `src/features/signup-user-flow/model/signupPayloadAdapters.test.ts` |
| P0 | 훅 | 휴대폰 번호를 정규화하고, 잘못된 번호를 차단하며, 인증 실패를 사용자에게 알린다. | `src/features/signup-user-flow/model/usePhoneVerificationAction.test.tsx` |
| P1 | 훅 | 학생·제휴업체·관리자 가입 성공 및 실패 시 완료 또는 복구 경로를 제공한다. | `src/features/signup-user-flow/model/useStudentSignupAction.test.tsx`, `usePartnerSignupAction.test.tsx`, `useAdminSignupAction.test.tsx` |
| P1 | 훅 | 관리자 이메일 중복확인 실패 시 다음 단계 이동을 차단한다. | `src/features/signup-user-flow/model/useAdminEmailAvailabilityAction.test.tsx` |
| P2 | 컴포넌트 | 약관 선택 상태와 토글 이벤트, 가입 역할 선택 이벤트를 화면에서 제공한다. | `src/features/signup-user-flow/ui/SignupAgreementSection.test.tsx`, `ui/sections/RoleStepSection.test.tsx` |

## Mock 경계

- 실제 네트워크는 호출하지 않는다. React Query mutation 훅의 `mutateAsync`만 mock해 요청 payload와 성공·실패 후 사용자 상태를 검증한다.
- `Alert.alert`는 mock해 사용자에게 노출되는 제목과 메시지를 검증한다.
- payload 변환, 단계 유효성 검사 같은 핵심 비즈니스 로직은 mock하지 않고 실제 함수를 호출한다.
- 네이티브 파일 선택, LMS WebView 인증, 실제 서버 상태는 이 PR 범위에서 제외한다.

## 검토 중 확인된 보완 항목

`usePhoneVerificationAction.test.tsx`에는 인증번호 발송 성공과 인증 검증 실패는 있으나, 다음 정상 경로가 아직 없다.

- `verifyCode("010-1234-5678", "123456")` 성공 시 API에 `{ phoneNumber: "01012345678", authNumber: "123456" }`를 전달한다.
- 성공 시 `onVerified`를 호출하고 `onVerifyFailed`는 호출하지 않는다.

이는 테스트 스킬의 설계 요구사항이 아니라 구현 단계에서 누락된 항목이다. PR 병합 전 위 테스트를 추가해 인증 훅의 정상·실패 경로를 모두 보호한다.

추가로 서버가 HTTP 오류를 내지 않고 `{ isSuccess: false }`를 반환하는 경우도 인증 실패로 처리되는지 테스트 후보로 둔다. 이 경우는 네트워크 reject와 다른 API 계약 경계다.

## 의도적으로 제외한 범위

- 역할 선택부터 가입 완료까지 실제 기기와 서버를 연결하는 E2E
- UI 스타일·레이아웃 및 React Native/React Query 자체 동작
- 명시된 제품 정책이 없는 `isPending` 상태의 중복 인증 요청 차단

중복 요청 차단은 현재 훅이 `isSending` 상태를 반환하지만 `sendCode` 내부에서 차단하지 않으므로, 테스트만 추가할 대상이 아니다. 제품 정책으로 합의되면 구현과 함께 별도 테스트를 추가한다.

## 확인 명령

```bash
yarn test signup-user-flow
```

테스트 실행 결과는 PR 본문 또는 CI 결과에 기록한다. 이 문서 작성 시점에는 Alert fallback 기대값을 수정한 뒤의 재실행 결과를 아직 기록하지 않았다.
