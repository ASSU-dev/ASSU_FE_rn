# Toggle

On/Off 상태를 전환하는 공통 토글 컴포넌트.

- 트랙 색상 및 thumb 위치가 `withTiming`으로 부드럽게 전환됨
- iOS / Android 동일하게 렌더링 (react-native-reanimated 기반)
- 색상은 `colorTokens` 키로만 지정 가능 → 디자인 시스템 일관성 보장

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | — | 현재 on/off 상태 |
| `onValueChange` | `(value: boolean) => void` | — | 상태 변경 콜백 |
| `trackColorOn` | `keyof typeof colorTokens` | `"primary"` | On 상태 트랙 색상 |
| `trackColorOff` | `keyof typeof colorTokens` | `"contentSecondary"` | Off 상태 트랙 색상 |
| `thumbColor` | `keyof typeof colorTokens` | `"canvas"` | Thumb 색상 |
| `width` | `number` | `48` | 트랙 너비 |
| `height` | `number` | `30` | 트랙 높이 |
| `padding` | `number` | `2.5` | 트랙 내부 패딩 (thumbSize = height - padding * 2 자동 계산) |
| `duration` | `number` | `200` | 애니메이션 시간 (ms) |

---

## 기본 사용 (디자인 시안 그대로)

```tsx
import { useState } from "react";
import { Toggle } from "@/shared/ui";

export function NotificationSetting() {
  const [isEnabled, setIsEnabled] = useState(false);

  return <Toggle value={isEnabled} onValueChange={setIsEnabled} />;
}
```

---

## 색상 오버라이드 (토큰 키만 허용)

```tsx
// colorTokens에 선언된 키만 허용 (raw hex 불가)
<Toggle
  value={isOn}
  onValueChange={setIsOn}
  trackColorOn="danger"
  trackColorOff="neutralVariant"
/>
```

---

## 사이즈 오버라이드

```tsx
// thumb 크기는 height - padding * 2 로 자동 계산
<Toggle
  value={isOn}
  onValueChange={setIsOn}
  width={60}
  height={36}
  padding={3}
/>
```

---

## 라벨과 함께 사용

```tsx
import { useState } from "react";
import { View, Text } from "react-native";
import { Toggle } from "@/shared/ui";

export function SettingRow() {
  const [isOn, setIsOn] = useState(false);

  return (
    <View className="flex-row items-center justify-between px-screen-m py-4">
      <Text className="text-content-primary font-medium">알림 수신</Text>
      <Toggle value={isOn} onValueChange={setIsOn} />
    </View>
  );
}
```

---

## 디자인 스펙 (default 값)

| 항목 | 값 |
|------|-----|
| Track 크기 | 48 × 30 |
| Thumb 크기 | 25 × 25 (자동 계산) |
| Padding | 2.5 |
| Off 색상 | `contentSecondary` (#8E9398) |
| On 색상 | `primary` (#0068FE) |
| Thumb 색상 | `canvas` (#FEFFFE) |
| Transition | 200ms |
