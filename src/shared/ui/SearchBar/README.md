# SearchBar

`SearchBar`는 **검색 진입 전·후 두 가지 모드를 하나의 컴포넌트로 지원하는 공용 서치바**입니다.

- 검색 화면 진입 전: 전체 영역이 Pressable로 동작
- 검색 화면 진입 후: 뒤로가기 버튼 + TextInput + 텍스트 초기화(X) 버튼

👉 Safe area 패딩은 이 컴포넌트를 사용하는 **페이지/레이아웃에서 처리**합니다.

---

## import 방법

```ts
import { SearchBar } from "@/shared/ui/SearchBar";
```

---

## 빠른 시작

### default 모드 — 검색 화면 진입 전

```tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { SearchBar } from "@/shared/ui/SearchBar";

export function HomeHeader() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="bg-canvas">
      <View className="px-screen-m py-4">
        <SearchBar
          mode="default"
          placeholder="찾으시는 제휴 가게가 없나요?"
          onPress={() => router.push("/search")}
        />
      </View>
    </SafeAreaView>
  );
}
```

---

### active 모드 — 검색 서브페이지

```tsx
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { SearchBar } from "@/shared/ui/SearchBar";

export function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView edges={["top"]} className="bg-canvas">
      <View className="px-screen-m py-4">
        <SearchBar
          mode="active"
          placeholder="찾으시는 제휴 가게가 없나요?"
          value={query}
          onChangeText={setQuery}
          onBack={() => router.back()}
          autoFocus
        />
      </View>
    </SafeAreaView>
  );
}
```

---

## Props 설명

`SearchBarProps`는 `mode` 값에 따라 두 가지 타입으로 분기됩니다.

### mode="default"

| 이름          | 필수 | 타입         | 설명                         |
| ------------- | ---- | ------------ | ---------------------------- |
| `mode`        | ✅   | `"default"`  | 전체 영역 Pressable 모드     |
| `onPress`     | ✅   | `() => void` | 서치바 터치 시 콜백          |
| `placeholder` |      | `string`     | 입력창 플레이스홀더 텍스트   |

### mode="active"

| 이름           | 필수 | 타입                       | 설명                              |
| -------------- | ---- | -------------------------- | --------------------------------- |
| `mode`         | ✅   | `"active"`                 | 실제 TextInput 모드               |
| `value`        | ✅   | `string`                   | 현재 입력값                       |
| `onChangeText` | ✅   | `(text: string) => void`   | 텍스트 변경 콜백 (X 버튼도 동일) |
| `onBack`       | ✅   | `() => void`               | 뒤로가기 버튼 콜백                |
| `placeholder`  |      | `string`                   | 입력창 플레이스홀더 텍스트        |
| `autoFocus`    |      | `boolean`                  | 마운트 시 자동 포커스             |

---

## 동작 방식

| 상태                     | 뒤로가기 | 입력창      | X 버튼        |
| ------------------------ | -------- | ----------- | ------------- |
| default                  | ❌       | Pressable   | ❌            |
| active (빈 입력)         | ✅       | TextInput   | ❌            |
| active (텍스트 입력 중)  | ✅       | TextInput   | ✅ (전체 삭제) |

---

## 아이콘

| 아이콘    | 파일                                        |
| --------- | ------------------------------------------- |
| 돋보기    | `src/shared/assets/icons/search-icon.svg`   |
| X (초기화) | `src/shared/assets/icons/close-icon.svg`   |
| 뒤로가기  | `src/shared/assets/icons/back-arrow-icon.svg` |

SVG 파일 교체 후 `yarn icons` 실행 시 자동 반영됩니다.
