# BottomSnackbar

스택(flex) 레이아웃으로 쌓이는 스낵바 위젯입니다. fade + slide 애니메이션으로 나타나고 사라집니다.

**위치는 absolute가 아닌 flex 스택으로, 부모에서 자식 순서와 `className`(padding, gap 등)으로 제어합니다.**

## 사용법

### Import

```tsx
import { BottomSnackbar } from "@/widgets/chat/bottom-snackbar";
```

### 기본 구조 (채팅 입력창 위에 배치)

부모 `View`에서 flex 순서로 위치를 제어합니다. 스낵바를 입력창 **위**에 두려면 DOM 순서상 입력창 **앞**에 배치합니다.

```tsx
const [visible, setVisible] = useState(false);

<View className="flex-1">
  <ScrollView>...</ScrollView>

  {/* 하단 영역: 스낵바 → 입력창 순으로 쌓임 */}
  <View className="px-6 pb-4 gap-2">
    <BottomSnackbar
      visible={visible}
      title="제목"
      subtitle="부제목 (선택)"
      actions={
        <SmallButton onPress={() => setVisible(false)}>확인</SmallButton>
      }
    />
    <ChatInput />
  </View>
</View>
```

### 버튼 2개

```tsx
<BottomSnackbar
  visible={visible}
  title="저장할까요?"
  subtitle="변경사항이 있습니다"
  actions={
    <View className="flex-row gap-3">
      <SmallButton onPress={() => setVisible(false)}>취소</SmallButton>
      <MediumButton onPress={handleSave}>저장</MediumButton>
    </View>
  }
/>
```

## Props

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| `visible` | `boolean` | ✅ | 노출 여부 (외부 상태로 제어) |
| `title` | `string` | ✅ | 제목 |
| `subtitle` | `string` | | 부제목 |
| `actions` | `ReactNode` | | 하단 액션 영역 (버튼 1개/2개 등) |
| `testID` | `string` | | 테스트용 id |

## 참고

- **위치 제어**: absolute 사용 안 함. 부모 `View`의 자식 순서와 `className`(padding, gap 등)으로 배치합니다.
- **애니메이션**: `visible`이 `false`가 되어도 사라지는 애니메이션이 끝난 뒤에만 언마운트됩니다.
- **actions**: `SmallButton`, `MediumButton` 등 공통 버튼 컴포넌트를 사용할 수 있습니다.
