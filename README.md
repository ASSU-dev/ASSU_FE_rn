# A:SSU Frontend (React Native + Expo)

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

## 기술 스택
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

## 아키텍처 (FSD)
```
src/
  app/        # 엔트리, 전역 프로바이더
  pages/      # 화면 단위
  widgets/    # 화면에서 공용으로 사용하는 독립적인 UI 컴포넌트
  features/   # 특정 기능의 로직, UI, API 호출
  entities/   # 도메인 모델과 관련된 데이터 처리
  shared/     # 공용 assets/hooks/styles/utils 등
```

## 스크립트 (yarn)
- `yarn start` — Expo 개발 서버 실행
- `yarn typecheck` — TypeScript 타입체크 (`tsc --noEmit`)
- `yarn biome:lint` — Biome lint (`./src`)
- `yarn biome:format` — Biome formatter (`./src`, write)
- `yarn biome:fix` — Biome check + 자동 수정 (`./src`, write)


## 빠른 시작
1) 의존성: `yarn install --frozen-lockfile`
2) 실행: `yarn start` 후 a/i/w 선택
3) 품질 체크(권장): `yarn biome:format && yarn biome:lint && yarn typecheck`

