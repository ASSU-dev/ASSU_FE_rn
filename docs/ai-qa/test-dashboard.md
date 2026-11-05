# 테스트 코드 현황

프로젝트 전체 기능 테스트의 누적 현황입니다. `assu-test` 또는 `assu-test-implementation`으로 테스트를 추가·수정하면, 회원가입·지도 검색·리뷰 등 기능 구분 없이 해당 행을 추가하거나 갱신합니다.

이 문서는 테스트 적용 현황을 관리합니다. 성공한 Jest 실행과 변경 내역은 [`test-run-log.md`](./test-run-log.md)에 별도로 기록합니다. 실패하거나 중단한 실행은 누적 실행 기록에 남기지 않고 작업 결과로 보고합니다.

| 기능 | 우선순위 | 계층 | 테스트 대상 / 보호하는 규칙 | 테스트 파일 | 작성자 | 날짜 |
| --- | --- | --- | --- | --- | --- | --- |
| 회원가입 | P0 | 단위 | 역할별 단계 유효성, 필수 개인정보 동의·첨부 파일, 요청 payload 변환 | `src/features/signup-user-flow/model/validation.test.ts`, `src/features/signup-user-flow/model/signupPayloadAdapters.test.ts` | ahcgnoej | 2026-10-01 |
| 회원가입 | P0 | 훅 | 휴대폰 번호 정규화·인증 발송/검증 성공과 실패 처리 | `src/features/signup-user-flow/model/usePhoneVerificationAction.test.tsx` | ahcgnoej | 2026-10-01 |
| 회원가입 | P1 | 훅 | 학생·제휴업체·관리자 가입 성공 및 실패 복구, 관리자 이메일 중복확인 | `src/features/signup-user-flow/model/useStudentSignupAction.test.tsx`, `src/features/signup-user-flow/model/usePartnerSignupAction.test.tsx`, `src/features/signup-user-flow/model/useAdminSignupAction.test.tsx`, `src/features/signup-user-flow/model/useAdminEmailAvailabilityAction.test.tsx` | ahcgnoej | 2026-10-01 |
| 회원가입 | P2 | 컴포넌트 | 약관 선택 상태·토글 전달, 역할 선택 UI와 선택 이벤트 | `src/features/signup-user-flow/ui/SignupAgreementSection.test.tsx`, `src/features/signup-user-flow/ui/sections/RoleStepSection.test.tsx` | ahcgnoej | 2026-10-01 |
| 관리자 홈 | 높음 | 컴포넌트 | 제휴 목록 상위 3개 표시, 전체보기·상세 이동, 추천 업체 문의 시 관리자 역할과 업체 ID 전달 | `src/pages/admin/home/ui/AdminHomePage.test.tsx` | chunjaemin | 2026-10-07 |
| 제휴업체 홈 | 높음 | 컴포넌트 | 제휴 목록 상위 3개 표시, 전체보기·상세 이동, 추천 단체 문의 시 제휴업체 역할과 관리자 ID 전달 | `src/pages/partner/home/ui/PartnerHomePage.test.tsx` | chunjaemin | 2026-10-07 |
| 제휴 목록 위젯 | 높음 | 컴포넌트 | 최대 항목 수, 빈 목록·로딩·오류 상태, 목록이 없을 때 전체보기 숨김 | `src/widgets/partnership-list/ui/PartnershipListWidget.test.tsx` | chunjaemin | 2026-10-07 |

테스트를 처음 추가하는 기능 PR에서 첫 행을 기록합니다.

## 기록 규칙

- 하나의 테스트 파일이 여러 규칙을 다루면, 가장 높은 우선순위 기준으로 한 행에 기록한다.
- 테스트를 보강하면 새 행을 중복 추가하지 않고 기존 행의 테스트 대상, 파일, 작성자, 날짜를 갱신한다.
- 작성자는 현재 저장소의 `git config --get user.name` 값을 GitHub 사용자명으로 기록한다. 값이 없거나 불분명하면 사용자에게 확인한다.
- E2E는 도구와 실행 환경이 정해진 뒤 별도 현황으로 추가한다.
