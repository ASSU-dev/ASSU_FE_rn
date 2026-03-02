# TabBar

stateless 탭바 컴포넌트입니다. 선택된 탭에 따라 underline이 슬라이드 애니메이션으로 이동합니다. 배경은 투명하여 부모 배경에 맞춰 사용할 수 있습니다.

## 사용법

### Import

```tsx
import { TabBar } from "@/shared/ui/TabBar";
```

### 기본 사용

```tsx
const [activeTab, setActiveTab] = useState("inquiry");

<TabBar
  tabs={[
    { id: "inquiry", label: "문의하기" },
    { id: "history", label: "문의내역확인" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### 탭 3개 이상

```tsx
<TabBar
  tabs={[
    { id: "all", label: "전체" },
    { id: "pending", label: "대기중" },
    { id: "done", label: "완료" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### 탭에 따른 콘텐츠 전환

```tsx
const [activeTab, setActiveTab] = useState("inquiry");

<View>
  <TabBar
    tabs={[
      { id: "inquiry", label: "문의하기" },
      { id: "history", label: "문의내역확인" },
    ]}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
  {activeTab === "inquiry" && <InquiryForm />}
  {activeTab === "history" && <InquiryHistory />}
</View>
```

## Props

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| `tabs` | `TabBarTab[]` | ✅ | 탭 목록 (`{ id, label }`) |
| `activeTab` | `string` | ✅ | 현재 선택된 탭 id |
| `onTabChange` | `(id: string) => void` | ✅ | 탭 클릭 시 호출 |
| `testID` | `string` | | 테스트용 id |

## 참고

- **stateless**: `activeTab`과 `onTabChange`로 부모가 상태를 제어합니다.
- **배경**: 투명. 부모 `View`의 `className`으로 배경색을 지정합니다.
- **underline**: 선택된 탭으로 200ms 슬라이드 애니메이션.
- **탭 개수**: 2개 이상 모두 지원. `flex-1`로 균등 배치됩니다.
