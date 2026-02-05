# A:SSU Frontend (React Native + Expo)

![Expo](https://img.shields.io/badge/Expo-54.0-000?logo=expo) 
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react) 
![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript) 
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2-06B6D4) 
![Reanimated](https://img.shields.io/badge/Reanimated-3.17-FF6F61)
![Biome](https://img.shields.io/badge/Biome-2.3-2D2E83) 
![React Query](https://img.shields.io/badge/React%20Query-5.x-FF4154?logo=reactquery) 
![Zustand](https://img.shields.io/badge/Zustand-5.x-444444)

## 기술 스택 & 선택 이유
- **앱 런타임**: Expo SDK 54 / React Native 0.81 — 크로스플랫폼 빌드 & OTA.
- **언어**: TypeScript 5.9 
- **상태 관리**: Zustand 5 
- **서버 상태**: @tanstack/react-query 5 
- **스타일링**: Tailwind 3.4 + NativeWind 4 
- **애니메이션**: react-native-reanimated 3 + worklets 
- **품질 도구**: Biome 

## 아키텍처 (FSD)
```
src/
  app/        # 엔트리, 전역 프로바이더
  pages/      # 화면 단위
  widgets/    # 화면에서 공용으로 사용하는 독립적인 UI 컴포넌트
  features/   # 특정 기능의 로직, UI, API 호출
  entities/   # 도메인 모델과 관련된 데이터 처리
  shared/     # 공용 lib/api/ui/config
```

## 스크립트 (yarn)
- `yarn start` / `yarn android` / `yarn ios` / `yarn web`
- `yarn lint` — Biome lint
- `yarn format` — Biome format (write)
- `yarn check` — Biome check (type-aware, write)

## 개발 가이드
- 스타일: `global.css` + `tailwind.config.js` 프리셋, RN 컴포넌트에 `className`.
- 비동기: `QueryClientProvider`로 감싸고 글로벌 상태는 Zustand store와 조합.
- 품질 체크: 커밋 전 `yarn format && yarn lint && yarn check`.
- 리소스 배치: 공용 색상/상수 `src/shared/config`, 네트워크 모듈 `src/shared/api`.

## 빠른 시작
1) 의존성: `yarn install`
2) 실행: `yarn start` 후 a/i/w 선택
3) 포맷 & 린트: `yarn format && yarn lint && yarn check`

> 패키지 매니저: **yarn** 고정 
