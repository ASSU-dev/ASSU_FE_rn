# Customer Service Page

고객센터 페이지입니다. 모든 사용자 권한(관리자, 제휴업체, 학생)에서 동일하게 접근할 수 있습니다.

## 주요 기능

- **문의하기**: 고객의 문의를 작성하는 폼
- **문의내역확인**: 작성한 문의 목록 조회

## 구조

```
├── ui/
│   └── CustomerServicePage.tsx  # 페이지 메인 컴포넌트
├── index.ts                     # Re-export
└── README.md                    # 문서
```

## 사용 방법

```tsx
import { CustomerServicePage } from "@/pages/customer-service";

export default function CustomerServiceScreen() {
  return <CustomerServicePage />;
}
```

## Related Features

- `@/features/inquiry-form` - 문의 작성 폼
- `@/features/inquiry-list` - 문의 목록 조회
- `@/shared/ui/CustomerServiceTabBar` - 탭 네비게이션
