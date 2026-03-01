# Select(드롭다운) 사용 가이드

이 문서는 `A:SSU` 프로젝트의 공용 `Select`(드롭다운) 컴포넌트 사용법을 정리합니다.

## 구현 세부사항 

- **내부 구현**: `react-native-element-dropdown`라이브러리 기반 래퍼(Wrapper) 
- **스타일링**:
  - NativeWind `className` + RN `style` 혼합
  - 색상은 `global.styles.css` 디자인 토큰과 **동일 값**을 갖는 TS 토큰(`src/shared/styles/tokens.ts`)을 통해 사용

## 설치 의존성

이 컴포넌트는 내부적으로 `react-native-element-dropdown`를 사용합니다.

```bash
yarn add react-native-element-dropdown
```

## import 방법 
- `import { Select } from "@/shared/ui/select";`



## 빠른 사용 예시 (가장 기본)

`Select`는 **controlled 컴포넌트**입니다. 즉, `items/value/onChange`를 항상 함께 사용합니다.

```tsx
import { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Select } from "@/shared/ui/select";

export default function Example() {
  const items = useMemo(
    () => [
      { label: "총학생회", value: "university" },
      { label: "단과대학 학생회", value: "college" },
      { label: "학과/부 학생회", value: "department" },
    ],
    []
  );

  const [value, setValue] = useState<string | null>(null);

  return (
    <View>
      <Select
        label="학생회 유형"
        items={items}
        value={value}
        onChange={setValue}
        placeholder="선택하세요"
        helperText="UI는 동일하고 items만 바꿔서 재사용합니다."
      />
    </View>
  );
}
```

## Props 설명

`SelectProps`는 `src/shared/ui/select/types.ts`에 정의되어 있습니다.

### 필수

- **`items`**
  - 옵션 목록
  - 타입: `Array<{ label: string; value: string; disabled?: boolean }>`
  - `label`: 사용자에게 보이는 텍스트
  - `value`: 상태/서버/스토어에 저장하는 “안정적인 식별자”
- **`value`**
  - 현재 선택된 값
  - 타입: `string | null`
  - `null`이면 placeholder가 보입니다.
- **`onChange`**
  - 선택 변경 콜백
  - 타입: `(value: string | null) => void`

### 선택(옵션)

- **`placeholder`**: 선택 전 노출 문구 (기본값: `"선택"`)
- **`disabled`**: 비활성화(필드 전체)
- **`label`**: 필드 상단 라벨 텍스트
- **`helperText`**: 하단 도움말
- **`errorText`**: 하단 에러 문구 (값이 있으면 에러 상태로 렌더링)
- **`size`**: `"sm" | "md"` (패딩/폰트 크기 프리셋 크기 조절 가능)
- **`testID`**: 테스트 자동화/QA 용 식별자

## 상태/연결 패턴

### 1) 로컬 상태(useState)

가장 기본적인 사용법입니다.

```tsx
const [value, setValue] = useState<string | null>(null);
<Select items={items} value={value} onChange={setValue} />;
```

### 2) Zustand(전역 상태)

상태를 store에서 꺼내 props로 그대로 연결합니다.

```tsx
const value = useLoginStore((s) => s.councilType);
const setValue = useLoginStore((s) => s.setCouncilType);

<Select items={items} value={value} onChange={setValue} />;
```

## disabled 옵션 처리

`items`의 `disabled: true` 항목은:
- 리스트에서 opacity가 낮게 보이고
- 잠금 아이콘이 표시됩니다
- 선택이 무시됩니다(선택값이 바뀌지 않음)

> NOTE: `react-native-element-dropdown`는 item 단위 disabled를 공식 지원하지 않아,
> disabled 항목 탭 시 내부 선택 표시가 바뀔 수 있습니다. `Select`는 이 경우 표시값이 남지 않도록 내부적으로 강제 리마운트로 원복합니다.

```tsx
const items = [
  { label: "총학생회", value: "university" },
  { label: "단과대학 학생회", value: "college", disabled: true },
];
```

### 1) “필드 전체” disabled (`Select`의 `disabled` prop)

이건 **드롭다운 자체를 통째로 비활성화**하는 옵션입니다.

- **언제 쓰나**
  - 선행 선택이 없어서 아직 고를 수 없을 때(의존 Select)
  - API 로딩 중(옵션을 불러오는 중)
  - 권한/상태상 선택 변경을 막아야 할 때

```tsx
<Select
  label="단과대학"
  items={collegeItems}
  value={college}
  onChange={setCollege}
  disabled={!councilType || collegeLoading}
  placeholder={!councilType ? "학생회 유형을 먼저 선택" : "선택하세요"}
/>
```

### 2) “특정 옵션만” disabled (`items[].disabled`)

이건 **목록은 보여주되, 일부 항목만 선택 불가**로 만드는 옵션입니다.

- **언제 쓰나**
  - “준비중/마감/권한 없음” 같은 상태를 옵션으로 노출해야 할 때
  - 리스트에서 존재는 알려야 하지만, 선택은 막아야 할 때

```tsx
const items = [
  { label: "총학생회", value: "university" },
  { label: "단과대학 학생회(준비중)", value: "college", disabled: true },
  { label: "학과/부 학생회", value: "department" },
];
```

