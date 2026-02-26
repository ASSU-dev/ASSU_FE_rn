# ChatBar

메시지 전송을 위한 채팅 입력 바 컴포넌트입니다. 텍스트가 길어지면 입력창이 위로 자동 확장됩니다.

## 사용법

```tsx
import { ChatBar } from "@/features/send-message";

<ChatBar
  onSend={(message) => console.log(message)}
  onAttach={() => console.log("attach pressed")}
/>
```

## Props

| Prop | 타입 | 필수 여부 | 설명 |
|------|------|----------|------|
| `onSend` | `(message: string) => void` | ✅ | 전송 버튼 클릭 시 호출. 앞뒤 공백이 제거된 텍스트가 전달되며, 전송 후 입력창은 초기화됩니다. |
| `onAttach` | `() => void` | ❌ | `+` 버튼 클릭 시 호출. |

## 동작 방식

- 입력창이 비어있으면 전송 버튼이 **비활성화**(회색), 텍스트가 있으면 **활성화**(파란색)됩니다.
- 텍스트가 한 줄을 넘으면 입력창이 위로 확장되며, 아이콘은 하단에 고정됩니다.
- `onSend`에는 앞뒤 공백이 제거된 텍스트가 전달됩니다.
- Android 기본 `TextInput` 패딩을 제거하여 플랫폼 간 정렬이 일관되게 유지됩니다.

## 채팅 화면에서의 레이아웃

```tsx
import { KeyboardAvoidingView, Platform } from "react-native";
import { ChatBar } from "@/features/send-message";

function ChatRoomPage() {
  function handleSend(message: string) {
    // 서버에 메시지 전송
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 메시지 목록 */}
      <MessageList />

      <ChatBar onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
```

> **주의:** 키보드가 올라올 때 `ChatBar`가 함께 올라오도록 `KeyboardAvoidingView`로 화면을 감싸야 합니다.
