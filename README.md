# A:SSU — 숭실대학교 종합 제휴 플랫폼 (App)

> **"제휴의 시작부터 끝까지, A:SSU에서 한 번에!"**

[📱 Google Play Store](https://play.google.com/store/apps/details?id=com.ssu.assu) · [🏠 Organization](https://github.com/ASSU-dev)

학생은 주변 제휴 혜택을 찾고 이용하기 번거롭고, 학생회는 매 학기 제휴 관리 부담이 크며, 제휴업체는 인증과 홍보 효과 측정이 어려웠습니다.
A:SSU는 제휴 계약부터 이용까지를 하나의 앱으로 묶어, 위치 기반 검색과 모바일 인증으로 이용 절차를 단순화합니다.

이 저장소는 **학생 · 제휴업체 · 관리자(학생회)** 가 함께 쓰는 React Native 앱입니다.

<br/>

## 📱 화면별 기능

### 🔐 공통 · 인증
| 화면 | 설명 |
| :--- | :--- |
| 로그인 | 학생·제휴업체·관리자 공통 로그인, 로그인 후 역할별 홈으로 이동 |
| 회원가입 | 역할을 고른 뒤 역할마다 다른 단계로 진행 — 학생: 본인인증 → 학교 LMS 인증 → 약관 / 제휴업체: 계정 → 업체 정보 → 사업자등록증 업로드 → 약관 / 관리자: 계정 → 총학·단과대·학과 학생회 선택 → 단체 인감 등록 → 약관 |
| 제휴 제안서 · 계약서 | 학생회와 업체가 주고받는 제휴 제안서 작성과 계약서 확인 |
| 제휴 QR | 매장 포스터용 제휴 인증 QR 다운로드 |
| 고객센터 | 문의 작성과 답변 확인 |

### 🎓 학생
| 화면 | 설명 |
| :--- | :--- |
| 홈 | 이용 가능한 제휴 혜택 확인 |
| 지도 · 매장 검색 | 주변 제휴 매장을 지도와 목록으로 탐색, 매장 상세 · 리뷰 보기 |
| 제휴 인증 | 매장 QR 스캔 또는 매장 번호 입력으로 인증 → 혜택 선택 → 완료 |
| 단체 혜택 인증 | 여러 명이 함께 받는 혜택은 필요한 인원이 모두 인증하면 자동으로 다음 단계로 이동 |
| 외부 제휴 연결 | 외부 페이지에서 받는 제휴는 해당 인증 페이지로 연결 |
| 제휴 건의 | 원하는 가게의 제휴를 학생회에 건의, 제휴 내역 확인 |
| 리뷰 | 이용한 매장에 별점과 리뷰 작성, 내가 쓴 리뷰 관리 |
| 마이페이지 · FAQ | 계정 정보, 자주 묻는 질문 |

### 🏪 제휴업체
| 화면 | 설명 |
| :--- | :--- |
| 홈 | 제휴 중인 학생회(단체) 목록 |
| 지도 · 검색 | 주변 매장과 제휴 단체 탐색 |
| 채팅 | 학생회와 1:1 실시간 채팅으로 제휴 협의 |
| 제휴 내역 | 진행 중이거나 체결된 제휴 목록 |
| 고객 리뷰 | 받은 리뷰를 최신순·오래된순·별점순으로 보고 부적절한 리뷰 신고 |
| 알림 · 계정 · 차단 관리 | 알림 센터와 알림 설정, 계정 관리, 차단한 상대 관리 |

### 🏛 관리자 (학생회)
| 화면 | 설명 |
| :--- | :--- |
| 홈 | 제휴업체 목록과 추천 업체 확인, 제휴 수동 등록 |
| 대시보드 | 제휴 이용자 수 등 이용 현황 통계 |
| 지도 · 검색 | 주변 매장 탐색과 새 제휴 후보 찾기 |
| 채팅 | 업체와 1:1 실시간 채팅으로 제휴 협의 |
| 제휴건의함 | 학생들이 보낸 제휴 건의 확인 |
| 대기 중인 계약서 | 아직 체결되지 않은 제휴 계약서 확인 · 삭제 |
| 제휴 내역 | 체결된 제휴 목록 관리 |
| 알림 · 계정 · 차단 업체 관리 | 알림 센터와 설정, 계정 관리, 차단 업체 해제 |

<br/>

## 👥 Frontend

| 이름 | GitHub |
| :---: | :---: |
| 이태건 | [@taegeon2](https://github.com/taegeon2) |
| 진채정 | [@ahcgnoej](https://github.com/ahcgnoej) |
| 김은혜 | [@eunhyekimyeah](https://github.com/eunhyekimyeah) |
| 천재민 | [@chunjaemin](https://github.com/chunjaemin) |
| 김예원 | [@kimyw1018](https://github.com/kimyw1018) |

전체 팀 구성과 백엔드·인프라는 [조직 소개](https://github.com/ASSU-dev)에서 볼 수 있습니다.

<br/>

---

![Expo](https://img.shields.io/badge/Expo-54.0.33-000?logo=expo) 
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react) 
![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript) 
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwindcss)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2.1-06B6D4) 
![Reanimated](https://img.shields.io/badge/Reanimated-4.1.1-FF6F61)
![Biome](https://img.shields.io/badge/Biome-2.3.14-2D2E83) 
![React Query](https://img.shields.io/badge/React%20Query-5.90-FF4154?logo=reactquery) 
![Zustand](https://img.shields.io/badge/Zustand-5.0-444444)

## 🛠 기술 스택
- **앱 런타임**: Expo SDK 54 / React Native 0.81.5 / React 19.1
- **라우팅**: Expo Router (`typedRoutes: true`)
- **언어**: TypeScript 5.9.3
- **상태 관리**: Zustand 5
- **서버 상태**: @tanstack/react-query 5
- **스타일링**: Tailwind 3.4.17 + NativeWind 4.2.1
  - 전역 토큰: `src/shared/styles/global.styles.css`
  - Tailwind 설정: `tailwind.config.js`
- **애니메이션**: react-native-reanimated 4 + react-native-worklets
- **품질 도구**: Biome 2.3.14

## 🧱 아키텍처 — Feature-Sliced Design

모든 코드는 `src/` 아래에 있고, `@/*` 경로 별칭으로 가져옵니다.

### 레이어와 의존 방향

```text
app → pages → widgets → features → entities → shared
```

**위 레이어는 아래 레이어만 가져올 수 있습니다.** 아래에서 위로 가져오는 것은 금지합니다.

| 레이어 | 역할 | 이 프로젝트에서 |
| :--- | :--- | :--- |
| `app` | Expo Router 라우트 · `_layout` · 리다이렉트 · route param 처리 | `(auth)` · `(protected)/student·partner·admin` 라우트 그룹 |
| `pages` | 화면의 실제 소유자. 하위 레이어를 조합해 한 화면을 만든다 | 12개 · 라우트 경로와 같은 이름 (`pages/student/home` ↔ `app/(protected)/student/(tabs)/home`) |
| `widgets` | 여러 feature·entity를 조합한 화면 블록 | 12개 · `signup-user-flow`, `map`, `chat`, `bottom-tab-bar` … |
| `features` | 사용자가 하는 행동 단위 기능 | 27개 · `qr-auth`, `send-message`, `review-management`, `pending-contract-management` … |
| `entities` | 도메인 모델과 타입 | 13개 · `user`, `store`, `partnership`, `review`, `chat` … |
| `shared` | 도메인을 모르는 공통 코드 | API 클라이언트·인터셉터, 공통 UI, 디자인 토큰, STOMP·FCM 래퍼 |

### 슬라이스 내부 구조 (segment)

```text
features/<기능 이름>/
├── index.ts   # Public API — 슬라이스 밖에서는 이 파일로만 가져온다
├── ui/        # 컴포넌트
├── model/     # 상태 · 훅 · 스키마 · 타입
├── api/       # React Query 훅
└── lib/       # 슬라이스 전용 유틸
```

### 프로젝트 규칙

- **`app`은 얇게 둡니다.** 라우트 파일은 `pages`의 화면을 렌더링만 하고, 화면 UI는 전부 `pages`에 있습니다.
- **Widget은 순수 표시 컴포넌트입니다** ([ADR-002](docs/decisions/ADR-002-widget-pure-display-principle.md)). 데이터를 직접 불러오지 않고 props로만 받습니다. `isError`·`isLoading` 같은 요청 상태도 받지 않습니다.
- **로딩·에러·빈 상태는 페이지가 처리합니다** ([ADR-001](docs/decisions/ADR-001-async-state-ui-handling.md)). 페이지가 상태별로 먼저 분기하고, Widget에는 유효한 데이터만 넘깁니다.
- **API 코드는 OpenAPI 스펙에서 생성합니다.** `shared/api/_generated`에 orval 클라이언트를 만들고, feature의 `api/`에 React Query 훅을 둡니다 ([scripts/generate-api.md](scripts/generate-api.md)).
- **디자인 토큰을 씁니다.** 토큰으로 바꿀 수 있는 크기·색상은 하드코딩하지 않습니다 (`shared/styles`).

### 예시 — 회원가입이 레이어를 지나는 흐름

```text
app/(auth)/register.tsx              라우트 연결만
  └ pages/auth/register              회원가입 화면
      └ widgets/signup-user-flow     단계별 화면 조립 (진행바 · 단계 제목 · 섹션)
          └ features/signup-user-flow
              ├ model/   역할별 단계 설정 · 단계별 Zod 스키마 · 가입 액션 훅
              ├ api/     이메일·전화번호 확인, 학교 인증, 역할별 가입 mutation
              └ lib/     파일 선택 · 에러 문구
          └ entities/signup          가입 도메인 타입
  └ shared/api                       axios 인스턴스 · 토큰 재발급 인터셉터 · 토큰 저장소
```

각 레이어의 자세한 가이드는 레이어별 README에 있습니다: [pages](src/pages/README.md) · [widgets](src/widgets/README.md) · [features](src/features/README.md) · [entities](src/entities/README.md) · [shared](src/shared/README.md)

## ⚙️ 스크립트 (yarn)
- `yarn start` — Expo 개발 서버 실행
- `yarn typecheck` — TypeScript 타입체크 (`tsc --noEmit`)
- `yarn biome:lint` — Biome lint (`./src`)
- `yarn biome:format` — Biome formatter (`./src`, write)
- `yarn biome:fix` — Biome check + 자동 수정 (`./src`, write)


## 🚀 빠른 시작
1) 의존성: `yarn install --frozen-lockfile`
2) 실행: `yarn start` 후 a/i/w 선택
3) 품질 체크(권장): `yarn biome:format && yarn biome:lint && yarn typecheck`

