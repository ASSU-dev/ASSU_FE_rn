# Pages Layer

`pages` 레이어는 앱의 실제 화면 컴포넌트를 담당합니다.  
이 프로젝트에서는 **Expo Router의 `app`은 라우트 연결만 담당**하고, **실제 화면 UI는 `pages`에 둡니다.**

## 개요

핵심 원칙:

- `app`: 라우트 파일, `_layout.tsx`, 리다이렉트, route param 처리
- `pages`: 실제 화면 UI와 페이지 레벨 조합
- `widgets`/`features`/`entities`/`shared`: `pages`가 조합해서 사용하는 하위 레이어

즉, `app`은 얇게 유지하고 `pages`를 화면의 진짜 소유자로 봅니다.

## 디렉토리 구조

이 프로젝트의 `pages`는 **라우트 매칭 우선 네이밍**을 사용합니다.

```text
pages/
├── auth/
│   ├── login/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── LoginPage.tsx
│   └── register/
│       ├── index.ts
│       └── ui/
│           └── RegisterPage.tsx
├── student/
│   ├── home/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── StudentHomePage.tsx
│   ├── map/
│   ├── suggestion/
│   └── profile/
├── admin/
│   ├── home/
│   ├── map/
│   ├── dashboard/
│   ├── chat/
│   └── profile/
├── partner/
│   ├── home/
│   ├── map/
│   ├── dashboard/
│   ├── chat/
│   └── profile/
└── README.md
```

## 네이밍 규칙

- 폴더명은 **라우트와 최대한 동일하게** 맞춥니다.
  - `app/(protected)/(student)/(tabs)/home.tsx` ↔ `pages/student/home/ui/StudentHomePage.tsx`
  - `app/(auth)/login.tsx` ↔ `pages/auth/login/ui/LoginPage.tsx`
- 컴포넌트명은 역할과 화면 의미가 드러나도록 명명합니다.
  - `StudentHomePage`
  - `AdminDashboardPage`
  - `PartnerChatPage`
- 각 **페이지 슬라이스 폴더**는 `index.ts`로 public API를 노출합니다.
- `pages/student`, `pages/admin`, `pages/partner`, `pages/auth` 같은 그룹 폴더에는 별도 `index.ts`를 두지 않습니다.

## 사용 가이드

### 1. app은 연결만 담당

`app` 라우트 파일은 직접 화면을 구현하지 않고, 대응하는 `pages` 컴포넌트를 import해서 반환합니다.

```tsx
import { StudentHomePage } from "@/pages/student/home";

export default function StudentHomeScreen() {
	return <StudentHomePage />;
}
```

### 2. pages는 화면 조합 담당

페이지 컴포넌트는 화면 전체 레이아웃과 UI 조합을 담당합니다.

```tsx
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export function StudentHomePage() {
	return (
		<View className="flex-1 items-center justify-center bg-canvas">
			<Text className="mb-4 text-content-primary font-medium">학생 홈</Text>
			<Pressable
				className="rounded-lg bg-primary px-4 py-3"
				onPress={() => router.push("/")}
			>
				<Text className="text-sm font-semibold text-white">허브로 돌아가기</Text>
			</Pressable>
		</View>
	);
}
```

### 3. 페이지 추가 순서

새 페이지를 추가할 때는 아래 순서를 따릅니다.

1. `pages/<group>/<route>/ui/<Page>.tsx` 생성
2. `pages/<group>/<route>/index.ts`에서 re-export
3. `app/.../<route>.tsx`에서 해당 페이지를 연결

## 역할별 페이지 정책

현재 프로젝트에서는 역할별 화면을 **독립 페이지로 유지**합니다.

- `student`, `admin`, `partner` 페이지는 각각 별도 컴포넌트로 관리
- 화면이 비슷해 보여도 페이지 자체는 합치지 않음
- 대신 반복되는 블록이 생기면 `widgets`, `entities`, `shared`로 내림

예:

- 페이지 전체가 다르면: `pages/admin/home`, `pages/partner/home` 분리 유지
- 내부 프로필 카드가 같으면: `entities/user/ui/...` 또는 `widgets/...`로 추출

## DO / DON'T

### DO

- 페이지 전체 레이아웃과 조합에 집중
- `widgets`, `features`, `entities`, `shared`를 활용해 화면 구성
- `app` 파일은 최대한 짧게 유지
- 라우트명과 `pages` 폴더 구조를 일치시켜 탐색성을 높이기

### DON'T

- `app` 라우트 파일에 큰 UI 구현 넣기
- `pages`에서 직접 API 호출/복잡한 비즈니스 로직 처리하기
- 아직 검증되지 않은 공통화 때문에 역할별 페이지를 억지로 합치기
- 라우트명과 관계없는 추상적인 폴더명 사용하기

## Expo Router와의 통합

현재 라우팅 구조 예시:

```text
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
└── (protected)/
    ├── (student)/
    │   └── (tabs)/
    │       ├── home.tsx
    │       ├── map.tsx
    │       ├── suggestion.tsx
    │       └── profile.tsx
    ├── (admin)/
    │   └── (tabs)/
    │       ├── home.tsx
    │       ├── map.tsx
    │       ├── dashboard.tsx
    │       ├── chat.tsx
    │       └── profile.tsx
    └── (partner)/
        └── (tabs)/
            ├── home.tsx
            ├── map.tsx
            ├── dashboard.tsx
            ├── chat.tsx
            └── profile.tsx
```

이 파일들은 라우트를 정의하고, 실제 화면은 `pages`에서 가져와 연결합니다.

## 참고

- [FSD 공식 문서](https://feature-sliced.design/docs/get-started/overview)
- [FSD Pages 레이어](https://feature-sliced.design/docs/reference/layers/pages)
- [Expo Router](https://docs.expo.dev/router/introduction/)
