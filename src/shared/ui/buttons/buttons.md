# Button Components

---

## SmallButton

회색 배경의 소형 버튼입니다.

| 속성   | 값                                              |
| ------ | ----------------------------------------------- |
| 너비   | 11.4rem                                         |
| 높이   | 4.1rem                                          |
| 배경   | `bg-neutral`                                    |
| 텍스트 | `text-content-secondary` / 0.8125rem / SemiBold |

**Props** — `PressableProps` 확장 (`onPress`, `disabled`, `style` 등 사용 가능)

### 사용 예시

```tsx
import { SmallButton } from "@/shared/ui/buttons/ActionButton";

export default function MyScreen() {
  return (
    <SmallButton onPress={() => console.log("pressed")}>
      제휴 리뷰 작성하기
    </SmallButton>
  );
}
```

비활성화:

```tsx
<SmallButton disabled>제휴 리뷰 작성하기</SmallButton>
```

---

## MediumButton

파란색 배경의 중형 액션 버튼입니다.

| 속성   | 값                                      |
| ------ | --------------------------------------- |
| 너비   | 21.5625rem                              |
| 패딩   | 1.12rem (상하) / 6.25rem (좌우)         |
| 배경   | `bg-primary`                            |
| 텍스트 | `text-content-inverse` / 1.25rem / Bold |

**Props** — `PressableProps` 확장 (`onPress`, `disabled`, `style` 등 사용 가능)

### 사용 예시

```tsx
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

export default function MyScreen() {
  return (
    <MediumButton onPress={() => console.log("pressed")}>인증완료</MediumButton>
  );
}
```

비활성화:

```tsx
<MediumButton disabled>인증완료</MediumButton>
```

---

## BenefitSelectButton

제목 + 설명을 포함하는 혜택 선택 버튼입니다. **개별 버튼 컴포넌트**로, 선택 상태를 외부에서 관리받습니다.

| 상태 | 테두리                     | 배경              |
| ---- | -------------------------- | ----------------- |
| 기본 | `border-content-secondary` | `bg-neutral`      |
| 선택 | `border-primary`           | `bg-primary-tint` |

**Props**

| prop          | 타입         | 필수 | 설명        |
| ------------- | ------------ | ---- | ----------- |
| `title`       | `string`     | ✓    | 버튼 제목   |
| `description` | `string`     | ✓    | 버튼 설명   |
| `isSelected`  | `boolean`    | ✓    | 선택 여부   |
| `onPress`     | `() => void` | ✓    | 클릭 핸들러 |

### 사용 예시

```tsx
import { BenefitSelectButton } from "@/shared/ui/buttons/BenefitSelectButton";
import { useState } from "react";

export default function MyScreen() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <BenefitSelectButton
      title="IT대학 학생회"
      description="IT대학 학생인증 시, 10% 할인"
      isSelected={isSelected}
      onPress={() => setIsSelected(!isSelected)}
    />
  );
}
```

> **주의**: `BenefitSelectButton`은 개별 버튼 컴포넌트이므로 상태 관리가 필요합니다.
> 여러 버튼을 함께 사용할 때는 **`BenefitSelectionGroup`** 사용을 권장합니다.

---

## BenefitSelectionGroup

여러 개의 혜택 옵션 중 하나를 선택하는 **라디오 버튼 그룹 컴포넌트**입니다.
옵션 배열만 전달하면 자동으로 `BenefitSelectButton`들을 렌더링하고, 라디오 버튼처럼 동작하여 **한 번에 하나의 버튼만 선택**됩니다.

**Props**

| prop       | 타입                      | 필수 | 설명                              |
| ---------- | ------------------------- | ---- | --------------------------------- |
| `options`  | `BenefitOption[]`         | ✓    | 혜택 옵션 배열                    |
| `onSelect` | `(index: number) => void` |      | 옵션 선택 시 콜백 (선택된 인덱스) |

**BenefitOption 타입**

```tsx
interface BenefitOption {
  title: string; // 버튼 제목
  description: string; // 버튼 설명
}
```

### 사용 예시

```tsx
import { BenefitSelectionGroup } from "@/shared/ui/buttons/BenefitSelectionGroup";

export default function BenefitScreen() {
  const benefits = [
    {
      title: "컴퓨터학부 학생회",
      description: "4인이상 식사시, 캔 음료 제공",
    },
    {
      title: "IT대학 학생회",
      description: "4인이상 식사시, 캔 음료 제공",
    },
    {
      title: "IT대학 학생회",
      description: "15,000원 이상 주문시 파인애플 샤베트 제공",
    },
  ];

  return (
    <BenefitSelectionGroup
      options={benefits}
      onSelect={(index) => console.log(`선택된 혜택: ${index}`)}
    />
  );
}
```

### 동작 설명

- 옵션을 클릭하면 해당 버튼이 선택 상태로 변경됩니다.
- 이미 선택된 버튼을 다시 클릭하면 선택이 해제됩니다.
- 다른 버튼을 클릭하면 이전 선택이 자동으로 해제되고 새 버튼이 선택됩니다.
- `onSelect` 콜백으로 선택된 버튼의 인덱스를 받을 수 있습니다..
