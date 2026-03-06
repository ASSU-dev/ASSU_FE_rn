# Comment Component

댓글 UI 컴포넌트 모음입니다. `CommentCard`를 통해 전체 댓글을 렌더링할 수 있습니다.

## 📌 사용 방법

### 기본 사용법

```typescript
import { CommentCard } from "@/shared/ui/comment";

function MyComponent() {
  return (
    <CommentCard
      comment={{
        author: { department: "컴퓨터학부" },
        rating: 5,
        content: "정말 좋은 강의입니다!",
        createdAt: new Date("2025-03-15"),
      }}
      onDelete={() => console.log("삭제")}
    />
  );
}
```

## Props

| Props | 타입 | 필수 | 설명 |
|-------|------|------|------|
| `comment` | object | ✅ | `author`, `rating`, `content`, `createdAt`, `images?` |
| `onDelete` | function | ✅ | 삭제 클릭 시 실행 함수 |

**comment 객체:**
| Props      | 타입     | 필수 | 설명                                                  |
| ---------- | -------- | ---- | ----------------------------------------------------- |
| `comment`  | object   | ✅   | `author`, `rating`, `content`, `createdAt`, `images?` |
| `onDelete` | function | ✅   | 삭제 클릭 시 실행 함수                                |

**comment 객체:**

- `author.department` (string) - 학과/직책
- `rating` (number) - 평점 1~5
- `content` (string) - 댓글 텍스트
- `createdAt` (Date) - 작성 시간
- `images?` (string[]) - 선택사항, 이미지 URL 배열
