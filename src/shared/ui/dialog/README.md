# Dialog

복합 컴포넌트(Compound Component) 패턴으로 구현된 모달 다이얼로그.
단일 `Dialog` 컴포넌트와 네임스페이스로 묶인 서브 컴포넌트로 4가지 유형을 모두 커버한다.

---

## 파일 구조

```
dialog/
├── Dialog.tsx               # 루트: Modal + 오버레이 + 흰 카드 + X 버튼
├── DialogTitle.tsx          # 굵은 제목 텍스트
├── DialogContent.tsx        # 본문 자유 영역
├── DialogActions.tsx        # 버튼 행 (flex-row, 버튼 수에 따라 자동 분배)
├── DialogCancelButton.tsx   # 보조 버튼 (bg-primary-tint, 파란 텍스트)
├── DialogConfirmButton.tsx  # 주요 버튼 (bg-primary, 흰 텍스트, disabled 지원)
├── DialogSelectGroup.tsx    # 선택 버튼 그룹 (value/onChange Context + 상단 20px + 버튼 간 7px)
├── DialogSelectButton.tsx   # 아웃라인 토글 버튼 (Context에서 선택 상태 관리)
├── DialogRadioGroup.tsx     # 라디오 그룹 컨테이너 (Context로 value 전달)
├── DialogRadioItem.tsx      # 라디오 아이템 (커스텀 원형 + 텍스트)
├── types.ts                 # 공유 타입 (DialogRadioContextValue, DialogSelectContextValue)
└── index.ts                 # Namespace 조립 및 export
```

---

## Namespace 구조

```
Dialog
├── Dialog.Title
├── Dialog.Content
├── Dialog.Actions
├── Dialog.CancelButton
├── Dialog.ConfirmButton
├── Dialog.SelectGroup
│   └── Dialog.SelectButton
├── Dialog.RadioGroup
│   └── Dialog.RadioItem
```

---

## Props

### `<Dialog>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | ✅ | 다이얼로그 표시 여부 |
| `onDismiss` | `() => void` | ❌ | X 버튼 탭 시 콜백. 미전달 시 X 버튼 숨김 |
| `children` | `ReactNode` | ✅ | 내부 컨텐츠 |

### `<Dialog.SelectGroup>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| null` | ✅ | 현재 선택된 값 |
| `onChange` | `(value: string \| null) => void` | ✅ | 선택 변경 콜백 (토글 off 시 null) |
| `children` | `ReactNode` | ✅ | `Dialog.SelectButton` 목록 |

### `<Dialog.SelectButton>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | 이 버튼의 값 (SelectGroup의 value와 비교) |
| `children` | `ReactNode` | ✅ | 버튼 레이블 |

### `<Dialog.RadioGroup>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| null` | ✅ | 현재 선택된 값 |
| `onChange` | `(value: string \| null) => void` | ✅ | 선택 변경 콜백 (토글 off 시 null) |
| `children` | `ReactNode` | ✅ | `Dialog.RadioItem` 목록 |

### `<Dialog.RadioItem>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | 이 아이템의 값 (RadioGroup의 value와 비교) |
| `children` | `ReactNode` | ✅ | 라디오 레이블 |

### `<Dialog.ConfirmButton>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `disabled` | `boolean` | ❌ | `true` 시 버튼 비활성화 (opacity 0.3, 터치 불가) |
| `children` | `ReactNode` | ✅ | 버튼 레이블 |
| `onPress` | `() => void` | ❌ | 탭 콜백 |

---

## 사용 예시

### 유형 1 — 확인/취소 (텍스트 본문)

```tsx
import { Dialog } from "@/shared/ui/dialog";
import { Text } from "react-native";

const [open, setOpen] = useState(false);
const close = () => setOpen(false);

<Dialog visible={open} onDismiss={close}>
  <Dialog.Title>정말로 차단하시겠습니까?</Dialog.Title>
  <Dialog.Content>
    <Text className="font-regular text-sm text-content-secondary">
      차단하실 경우 대화내용은 삭제되고, 채팅 목록도 제거됩니다.
    </Text>
  </Dialog.Content>
  <Dialog.Actions>
    <Dialog.CancelButton onPress={close}>취소</Dialog.CancelButton>
    <Dialog.ConfirmButton onPress={handleBlock}>차단하기</Dialog.ConfirmButton>
  </Dialog.Actions>
</Dialog>
```

---

### 유형 2 — 라디오 선택

```tsx
import { Dialog } from "@/shared/ui/dialog";
import { Text } from "react-native";

const [open, setOpen] = useState(false);
const close = () => setOpen(false);
const [reason, setReason] = useState<string | null>(null);

<Dialog visible={open} onDismiss={close}>
  <Dialog.Title>작성자를 신고하는 사유를 선택해주세요</Dialog.Title>
  <Dialog.Content>
    <Text className="font-regular text-sm text-content-secondary">
      작성자를 신고할 경우 해당 사용자가 작성한 모든 리뷰가 비공개 처리됩니다
    </Text>
    <Dialog.RadioGroup value={reason} onChange={setReason}>
      <Dialog.RadioItem value="inappropriate">
        부적절한 내용 및 욕설이 포함한 글을 작성했어요
      </Dialog.RadioItem>
      <Dialog.RadioItem value="false">
        허위사실 / 거짓이 포함된 글을 작성했어요
      </Dialog.RadioItem>
      <Dialog.RadioItem value="ad">
        홍보/광고를 위한 건의글을 작성했어요
      </Dialog.RadioItem>
    </Dialog.RadioGroup>
  </Dialog.Content>
  <Dialog.Actions>
    <Dialog.CancelButton onPress={close}>취소</Dialog.CancelButton>
    <Dialog.ConfirmButton onPress={handleReport} disabled={!reason}>신고하기</Dialog.ConfirmButton>
  </Dialog.Actions>
</Dialog>
```

---

### 유형 3 — 버튼 선택

```tsx
import { Dialog } from "@/shared/ui/dialog";
import { Text } from "react-native";

const [open, setOpen] = useState(false);
const close = () => setOpen(false);
const [target, setTarget] = useState<string | null>(null);

<Dialog visible={open} onDismiss={close}>
  <Dialog.Title>신고하고자 하는 대상을 선택해주세요</Dialog.Title>
  <Dialog.Content>
    <Text className="font-regular text-sm text-content-secondary">
      작성자를 신고할 경우 해당 사용자가 작성한 모든 리뷰가 비공개 처리됩니다
    </Text>
    <Dialog.SelectGroup value={target} onChange={setTarget}>
      <Dialog.SelectButton value="author">
        고객 리뷰 작성자
      </Dialog.SelectButton>
      <Dialog.SelectButton value="content">
        고객 리뷰 글
      </Dialog.SelectButton>
    </Dialog.SelectGroup>
  </Dialog.Content>
  <Dialog.Actions>
    <Dialog.CancelButton onPress={close}>취소</Dialog.CancelButton>
    <Dialog.ConfirmButton onPress={handleReport} disabled={!target}>신고하기</Dialog.ConfirmButton>
  </Dialog.Actions>
</Dialog>
```

---

### 유형 4 — 단일 확인 버튼 (전체 너비 자동 적용)

```tsx
import { Dialog } from "@/shared/ui/dialog";
import { Text } from "react-native";

const [open, setOpen] = useState(false);
const close = () => setOpen(false);

<Dialog visible={open} onDismiss={close}>
  <Dialog.Title>리뷰 작성자에 대한 신고가 완료되었습니다!</Dialog.Title>
  <Dialog.Content>
    <Text className="font-regular text-sm text-content-secondary">
      신고 직후 해당 사용자가 작성한 모든 리뷰는 비공개 처리되며,
      해당 사실이 작성자에게 고지되지 않습니다.
    </Text>
  </Dialog.Content>
  <Dialog.Actions>
    <Dialog.ConfirmButton onPress={close}>확인</Dialog.ConfirmButton>
  </Dialog.Actions>
</Dialog>
```

---

## 동작 방식

### 오버레이 및 닫기
- 오버레이 배경: `rgba(0, 0, 0, 0.3)`
- 다이얼로그는 반드시 **X 버튼** 또는 **액션 버튼**을 눌러야만 닫힘 (오버레이 탭으로 닫기 불가)
- `onDismiss` 전달 시: X 버튼 표시
- `onDismiss` 미전달 시: X 버튼 숨김 (닫을 수 없는 다이얼로그)

### 버튼 너비 자동 분배
`Dialog.Actions`는 `flex-row`로 구성되며, 각 버튼(`flex-1`)이 자동으로 공간을 나눈다.
- 버튼 2개: 각각 50% 너비
- 버튼 1개: 100% 너비 (전체 폭)

### Safe Area 대응
`useSafeAreaInsets`로 노치/다이나믹 아일랜드 영역을 감지하고,
카드 좌우 여백을 `Math.max(left, right, 32)`로 계산한다.

### Platform 대응
- Android: `Modal`의 `statusBarTranslucent={true}` — 오버레이가 상태바 아래로 잘리지 않도록 처리
