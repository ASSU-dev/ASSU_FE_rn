# Shared Layer

`shared` 레이어는 프로젝트 전반에서 재사용되는 공통 인프라, 유틸리티, 컴포넌트를 포함합니다.

## 📋 목차

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [사용 가이드](#사용-가이드)
4. [주의사항](#주의사항)
5. [예시](#예시)

---

## 개요

`shared` 레이어는 **프로젝트 전반에서 공통으로 사용되는 코드**를 담는 레이어입니다. 이 레이어의 코드는 비즈니스 로직과 독립적이며, 여러 기능에서 재사용될 수 있어야 합니다.

### 특징

- ✅ **비즈니스 로직 없음**: 특정 기능에 종속되지 않는 순수한 유틸리티
- ✅ **재사용 가능**: 프로젝트 어디서든 사용 가능
- ✅ **프로젝트 특화**: 외부 라이브러리가 아닌 프로젝트 전용 코드

---

## 디렉토리 구조 (현재 구조가 이렇다는 거지 고정 형태가 아닙니다 필요한건 추가하시면 됩니다!)

```
shared/
├── assets/          # 정적 자산 (이미지, 폰트 등)
│   ├── fonts/       # 폰트 파일
│   └── images/      # 이미지 파일
├── hooks/           # 공통 커스텀 훅
├── styles/          # 전역 스타일 및 디자인 토큰
│   ├── global.styles.css  # 전역 CSS 변수 및 Tailwind 설정
│   └── shadows.ts   # 그림자 스타일 객체
└── README.md        # 이 문서
```

### 각 디렉토리 설명

#### `assets/`
정적 자산 파일을 저장합니다.

- **fonts/**: 프로젝트에서 사용하는 폰트 파일 (Pretendard)
- **images/**: 앱 아이콘, 스플래시 이미지 등

**사용 예시:**
```tsx
// 폰트는 useLoadFonts 훅을 통해 로드됨
import { useLoadFonts } from "@/shared/hooks/useLoadFonts";

// 이미지는 require로 직접 참조
const icon = require("@/shared/assets/images/icon.png");
```

#### `hooks/`
프로젝트 전반에서 사용되는 커스텀 훅을 저장합니다.

**현재 훅:**
- `useLoadFonts`: Pretendard 폰트 로딩 및 스플래시 스크린 관리

**사용 예시:**
```tsx
import { useLoadFonts } from "@/shared/hooks/useLoadFonts";

export default function Component() {
  const fontsLoaded = useLoadFonts();
  
  if (!fontsLoaded) {
    return null;
  }
  
  return <View>...</View>;
}
```

#### `styles/`
전역 스타일 및 디자인 토큰을 정의합니다.

- **global.styles.css**: CSS 변수로 정의된 디자인 토큰 (색상, 간격, 그림자)
- **shadows.ts**: React Native용 그림자 스타일 객체

**사용 예시:**
```tsx
// CSS 변수는 Tailwind 클래스로 자동 사용 가능
<View className="bg-primary text-content-primary" />

// 그림자는 직접 import
import { shadows } from "@/shared/styles/shadows";
<View style={shadows.primary} />
```

---

## 사용 가이드

### 1. 새로운 공통 훅 추가

프로젝트 전반에서 사용될 훅을 `shared/hooks/`에 추가합니다.

**예시: `useDebounce.ts`**
```tsx
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**사용:**
```tsx
import { useDebounce } from "@/shared/hooks/useDebounce";
```

### 2. 새로운 스타일 유틸리티 추가

React Native 특화 스타일 유틸리티를 `shared/styles/`에 추가합니다.

**예시: `animations.ts`**
```tsx
import { Animated } from "react-native";

export const fadeIn = (value: Animated.Value) => {
  return Animated.timing(value, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
};
```

### 3. 공통 유틸리티 함수 추가

순수 함수 유틸리티를 `shared/lib/` 또는 `shared/utils/`에 추가합니다.

**예시: `shared/lib/format.ts`**
```tsx
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **순수 함수/유틸리티만 포함**
   ```tsx
   // ✅ 좋은 예: 순수 함수
   export function formatDate(date: Date): string {
     return date.toLocaleDateString("ko-KR");
   }
   ```

2. **비즈니스 로직과 독립적으로 유지**
   ```tsx
   // ✅ 좋은 예: 범용 훅
   export function useDebounce<T>(value: T, delay: number) {
     // 비즈니스 로직 없음
   }
   ```

3. **명확한 네이밍**
   ```tsx
   // ✅ 좋은 예
   useLoadFonts
   formatCurrency
   shadows.primary
   ```

4. **타입 안정성 보장**
   ```tsx
   // ✅ 좋은 예: 명시적 타입
   export function useDebounce<T>(value: T, delay: number): T {
     // ...
   }
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **비즈니스 로직 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 특정 기능에 종속됨
   export function useUserProfile() {
     // 사용자 프로필 관련 로직은 entities나 features에 있어야 함
   }
   ```

2. **상태 관리 라이브러리 직접 사용 금지**
   ```tsx
   // ❌ 나쁜 예: 전역 상태는 app 레이어에서 관리
   import { create } from "zustand";
   export const useStore = create(...);
   
   // ✅ 좋은 예: 순수 유틸리티 함수
   export function formatDate(date: Date): string { ... }
   ```

3. **특정 기능에 종속된 컴포넌트 금지**
   ```tsx
   // ❌ 나쁜 예: 특정 기능에만 사용되는 컴포넌트
   export function UserProfileCard() { ... }
   
   // ✅ 좋은 예: 범용 컴포넌트 (필요시 shared/ui에 추가)
   export function Card({ children }: { children: React.ReactNode }) { ... }
   ```

4. **외부 라이브러리 래퍼는 신중하게**
   ```tsx
   // ⚠️ 주의: 외부 라이브러리 래퍼는 필요한 경우에만
   // 단순 래퍼는 피하고, 프로젝트 특화 로직이 있을 때만 추가
   ```

5. **순환 의존성 방지**
   ```tsx
   // ❌ 나쁜 예: shared가 다른 레이어를 import하면 안 됨
   import { SomeFeature } from "@/features/some-feature";
   
   // ✅ shared는 최상위 레이어이므로 다른 레이어를 import하지 않음
   ```

---

## 예시

### 공통 훅 예시

**`shared/hooks/useDebounce.ts`**
```tsx
import { useEffect, useState } from "react";

/**
 * 값을 지연시키는 훅
 * @param value - 지연시킬 값
 * @param delay - 지연 시간 (ms)
 * @returns 지연된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 스타일 유틸리티 예시

**`shared/styles/shadows.ts`** (이미 존재)
```tsx
export const shadows = {
  primary: {
    shadowColor: "rgba(102, 164, 254, 1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  neutral: {
    shadowColor: "rgba(142, 147, 152, 1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
} as const;
```

### 유틸리티 함수 예시

**`shared/lib/format.ts`**
```tsx
/**
 * 날짜를 한국어 형식으로 포맷
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 숫자를 통화 형식으로 포맷
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}
```

---

## 참고

- **디자인 토큰 가이드**: 프로젝트 루트의 `DESIGN_TOKENS_GUIDE.md` 참고
- **FSD 아키텍처**: [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
