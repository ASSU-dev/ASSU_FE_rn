# RankItem 사용 가이드

이 문서는 `A:SSU` 프로젝트의 공용 `RankItem` 컴포넌트 사용법을 정리합니다.

## 구현 세부사항

- **구조**: 순위 숫자 + 이름 텍스트를 수평으로 나열하는 단순 표시용 컴포넌트
- **스타일링**: NativeWind `className` + RN `style` 혼합
  - 순위 숫자 색상만 동적으로 `style` prop 사용 (`rankColor`)
  - 색상 기본값은 `colorTokens.primary` (`#0068FE`)

## import 방법

```ts
import { RankItem } from "@/shared/ui/rank";
```

## 사용 예시 (가장 기본)

```tsx
import { RankItem } from "@/shared/ui/rank";

export function Example() {
  return <RankItem rank={1} name="역전할머니맥주" />;
}
```

## Props 설명

### 필수

- **`rank`**
  - 표시할 순위 숫자
  - 타입: `number`
- **`name`**
  - 표시할 이름 텍스트
  - 타입: `string`

### 선택(옵션)

- **`rankColor`**
  - 순위 숫자의 색상
  - 타입: `string`
  - 기본값: `colorTokens.primary` (`#0068FE`, 파란색)
  - `colorTokens` 또는 hex 문자열 직접 전달 가능

## 사용 패턴

### 1) 기본 (파란색 순위)

```tsx
<RankItem rank={1} name="역전할머니맥주" />
```

### 2) 순위 색상 커스터마이징

```tsx
import { colorTokens } from "@/shared/styles/tokens";
import { RankItem } from "@/shared/ui/rank";

// 회색 (낮은 순위 강조 없음)
<RankItem rank={5} name="역전할머니맥주" rankColor={colorTokens.contentSecondary} />

// 연한 회색
<RankItem rank={8} name="인생맥주" rankColor={colorTokens.contentTertiary} />
```

### 3) 리스트 렌더링 예시 

```tsx
import { FlatList, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { RankItem } from "@/shared/ui/rank";

const RANK_COLOR_THRESHOLD = 3; // 1~3위는 파란색, 4위~ 회색

const items = [
  { rank: 1, name: "역전할머니맥주" },
  { rank: 2, name: "취향" },
  { rank: 3, name: "Bread & co" },
  { rank: 4, name: "인생맥주" },
  { rank: 5, name: "역전할머니맥주" },
  { rank: 6, name: "취향" },
  { rank: 7, name: "Bread & co" },
  { rank: 8, name: "인생맥주" },
];

export function RankList() {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.rank)}
      renderItem={({ item }) => (
        <RankItem
          rank={item.rank}
          name={item.name}
          rankColor={
            item.rank <= RANK_COLOR_THRESHOLD
              ? colorTokens.primary
              : colorTokens.contentSecondary
          }
        />
      )}
    />
  );
}
```

## 디자인 스펙 (Figma)

| 항목 | 값 |
|------|----|
| Width | 152 (Hug) |
| Height | 18 (Hug) |
| Gap | 8px |
| Alignment | 수직 중앙 정렬 |
| 순위 폰트 | 14px / Regular |
| 이름 폰트 | 14px / Regular |
