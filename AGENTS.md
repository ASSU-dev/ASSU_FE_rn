# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

ASSU Frontend — a React Native mobile app built with Expo SDK 54, React 19, and NativeWind (Tailwind for RN). The project follows **Feature-Sliced Design (FSD)** architecture.

## Commands

### Setup & Development

```bash
yarn install --frozen-lockfile  # Install dependencies (required on first setup)
yarn start                       # Start Expo dev server (press a/i/w for Android/iOS/Web)
yarn android                     # Run on Android emulator/device
yarn ios                         # Run on iOS simulator
yarn web                         # Run on web (development)
```

### Code Quality

```bash
yarn typecheck          # TypeScript strict check (tsc --noEmit)
yarn biome:lint         # Lint with Biome
yarn biome:fix          # Auto-fix lint issues with Biome check
yarn biome:format       # Format code with Biome
```

### Assets

```bash
yarn icons              # Generate icon assets
```

## Guidelines

- **Never show code changes as markdown diff blocks (no `diff` code blocks, no `+`/`-` prefixed lines).** Always apply changes directly using the Edit or Write tool so the user sees them as IDE highlights (red/green) in their editor.
- **Do not run `yarn typecheck` or any code quality commands autonomously. The user runs these manually.**
- **Before applying any fix, briefly explain in one sentence why the existing code was wrong or suboptimal. Then proceed with the edit immediately.**

CI runs: `biome:lint`, `typecheck`, `npx expo-doctor`, and `npx expo export` (iOS/Android).

## Architecture (Feature-Sliced Design)

All source code lives under `src/` with path alias `@/*` → `./src/*`.

```
src/
├── app/          # Expo Router layouts & routes (file-based routing, typedRoutes enabled)
├── pages/        # Full screen components
├── widgets/      # Composite UI blocks combining multiple features
├── features/     # User-facing functionality (each with ui/, model/, api/ slices)
├── entities/     # Domain models and business logic
└── shared/       # Global utilities, styles, assets, hooks
```

**FSD import rule**: layers can only import from layers below them (app → pages → widgets → features → entities → shared). Never import upward.

Each FSD layer has its own README with detailed structure and guidelines.

## Styling & Design Tokens

- **NativeWind** (Tailwind CSS for React Native) configured via `tailwind.config.js`
- Design tokens defined as CSS variables in `src/shared/styles/global.styles.css`

### ⚠️ 디자인 토큰 사용 규칙 (MANDATORY)

**토큰으로 대체 가능한 값은 반드시 토큰을 사용한다. 하드코딩 절대 금지.**

코드를 작성하거나 수정할 때, 아래 토큰 매핑표를 먼저 확인하고 적용할 것:

| 하드코딩 값 | 사용할 토큰 클래스 |
|---|---|
| `text-[13px]` | `text-sm` |
| `text-[16px]` | `text-md` |
| `text-[17px]` | `text-lg` |
| `text-[18px]` | `text-xl` |
| `rounded-[4px]` | `rounded-sm` |
| `rounded-[5px]` | `rounded-md` |
| `p-[15px]` / `px-[15px]` / `py-[15px]` | `p-card-p` / `px-card-p` / `py-card-p` |
| `gap-[10px]` / `px-[10px]` / `py-[10px]` | `gap-gutter` / `px-gutter` / `py-gutter` |
| `px-[24px]` / `mx-[24px]` | `px-screen-m` / `mx-screen-m` |

색상 토큰 (`className` 사용):
- `bg-primary`, `text-primary` — 브랜드 블루
- `bg-neutral`, `bg-neutral-variant` — 회색 박스
- `bg-canvas` — 흰 배경
- `text-content-primary`, `text-content-secondary`, `text-content-tertiary`, `text-content-inverse`

색상 토큰 (RN `style` 객체 / 아이콘 `color` prop):
- `colorTokens.*` from `@/shared/styles/tokens` 사용 (CSS 변수 직접 사용 불가)

**하드코딩이 허용되는 경우**: 위 매핑표에 해당하지 않는 값 (예: `text-[11px]`, `gap-[6px]`, `rounded-[999px]` 등 토큰이 존재하지 않는 값)

- Font weights: `font-regular`, `font-medium`, `font-semibold`, `font-bold` (Pretendard)
- React Native shadow objects exported from `src/shared/styles/shadows.ts`

## Key Tech Choices

- **Routing**: Expo Router with typed routes (file-based in `src/app/`)
- **State**: Zustand (global state), @tanstack/react-query (server state)
- **Linting/Formatting**: Biome (not ESLint/Prettier) — double quotes, tab indentation
- **Animations**: react-native-reanimated
- **Fonts**: Pretendard loaded via `src/shared/lib/hooks/useLoadFonts.ts`
- **TypeScript**: strict mode enabled, extends `expo/tsconfig.base`
