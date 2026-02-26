# entities/chat/ui

채팅 도메인 UI 컴포넌트 모음.

---

## ChatRoomItem

채팅방 목록에서 각 행을 표시하는 컴포넌트.

```tsx
import { ChatRoomItem } from "@/entities/chat";

<ChatRoomItem
  profileImage={require("@/shared/assets/images/profile.png")}
  roomName="떡집할머니는돈목욕"
  lastMessage="제휴 협력 요청 드리고 싶습니다!"
  unreadCount={10}
/>
```

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| `profileImage` | `ImageSource` | ✅ | 프로필 이미지 |
| `roomName` | `string` | ✅ | 채팅방 이름 |
| `lastMessage` | `string` | ✅ | 마지막 메시지 |
| `unreadCount` | `number` | ❌ | 읽지 않은 메시지 수. 0이면 배지 미표시. |

---

## MessageItem

받은 메시지·보낸 메시지를 모두 처리하는 조합 컴포넌트. `isMine` 값에 따라 레이아웃이 달라진다.

```tsx
import { MessageItem } from "@/entities/chat";

// 받은 메시지
<MessageItem
  message={{
    id: "1",
    text: "제휴 협력 요청 드리고 싶습니다!",
    senderId: "other-user-id",
    sentAt: "17:42",
    unreadCount: 6,
  }}
  isMine={false}
  profileImage={require("@/shared/assets/images/profile.png")}
/>

// 보낸 메시지
<MessageItem
  message={{
    id: "2",
    text: "네, 말씀해 주세요!",
    senderId: "my-user-id",
    sentAt: "17:43",
  }}
  isMine={true}
/>
```

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| `message` | `Message` | ✅ | 메시지 데이터 |
| `isMine` | `boolean` | ✅ | `true`면 오른쪽 정렬(파란 버블), `false`면 왼쪽 정렬(흰 버블) |
| `profileImage` | `ImageSource` | ❌ | 받은 메시지(`isMine=false`)일 때만 사용 |

### Message 타입

```ts
interface Message {
  id: string;
  text: string;
  senderId: string;
  sentAt: string;       // "HH:mm" 포맷
  unreadCount?: number; // 프로필 우하단 배지 숫자
}
```

---

## MessageBubble

말풍선 단독 컴포넌트. `MessageItem` 내부에서 사용되며, 필요 시 단독으로도 사용 가능.

```tsx
import { MessageBubble } from "@/entities/chat";

<MessageBubble text="안녕하세요!" variant="received" />
<MessageBubble text="네, 안녕하세요!" variant="sent" />
```

| Prop | 타입 | 설명 |
|------|------|------|
| `text` | `string` | 메시지 텍스트 |
| `variant` | `"sent" \| "received"` | `sent`=파란 배경, `received`=neutral 배경 |

---

## MessageTime

전송 시간 텍스트 단독 컴포넌트.

```tsx
import { MessageTime } from "@/entities/chat";

<MessageTime time="17:42" variant="received" />
<MessageTime time="17:42" variant="sent" />
```

| Prop | 타입 | 설명 |
|------|------|------|
| `time` | `string` | `"HH:mm"` 포맷 문자열 |
| `variant` | `"sent" \| "received"` | 정렬 방향 결정 |

---

## 채팅방 화면에서의 레이아웃

```tsx
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { MessageItem } from "@/entities/chat";
import { ChatBar } from "@/features/send-message";

function ChatRoomPage() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            isMine={item.senderId === myUserId}
            profileImage={item.senderId !== myUserId ? senderProfile : undefined}
          />
        )}
        contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
        inverted
      />

      <ChatBar onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
```
