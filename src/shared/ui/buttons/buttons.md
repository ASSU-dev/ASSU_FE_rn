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
import { SmallButton } from "@/shared/ui/buttons/small_button";

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
import { MediumButton } from "@/shared/ui/buttons/medium_button";

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

## LargeButton

제목 + 설명을 포함하는 토글형 대형 버튼입니다. 클릭 시 선택/해제 상태가 전환됩니다.

| 상태 | 테두리                    | 배경              |
| ---- | ------------------------- | ----------------- |
| 기본 | `color-content-secondary` | `bg-neutral`      |
| 선택 | `color-primary`           | `bg-primary-tint` |

**Props**

| prop          | 타입         | 설명               |
| ------------- | ------------ | ------------------ |
| `title`       | `string`     | 버튼 제목          |
| `description` | `string`     | 버튼 설명          |
| `onPress`     | `() => void` | 클릭 핸들러 (선택) |

### 사용 예시

```tsx
import { LargeButton } from "@/shared/ui/buttons/large_button";

export default function MyScreen() {
  return (
    <LargeButton
      title="IT대학 학생회"
      description="IT대학 학생인증 시, 10% 할인"
      onPress={() => console.log("선택됨")}
    />
  );
}
```

여러 개 나열:

```tsx
<LargeButton title="IT대학 학생회" description="IT대학 학생인증 시, 10% 할인" />
<LargeButton title="경영대학 학생회" description="경영대학 학생인증 시, 5% 할인" />
```
