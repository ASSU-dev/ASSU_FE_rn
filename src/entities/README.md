# Entities Layer

`entities` 레이어는 비즈니스 엔티티(도메인 모델)와 관련된 코드를 포함합니다.

## 📋 목차

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [사용 가이드](#사용-가이드)
4. [주의사항](#주의사항)
5. [예시](#예시)

---

## 개요

`entities` 레이어는 **비즈니스 도메인의 핵심 개념(엔티티)**을 표현합니다. 예를 들어, 사용자(User), 상품(Product), 주문(Order) 등이 엔티티입니다.

### 특징

- ✅ **도메인 모델**: 비즈니스의 핵심 개념을 표현
- ✅ **비즈니스 로직 포함**: 엔티티 관련 비즈니스 규칙 포함 가능
- ✅ **재사용 가능**: 여러 features에서 사용될 수 있음
- ✅ **독립적**: 특정 기능에 종속되지 않음

---

## 디렉토리 구조

```
entities/
├── user/              # 사용자 엔티티
│   ├── model/         # 타입 정의, 인터페이스
│   │   └── types.ts
│   ├── api/           # API 호출 (선택적)
│   │   └── userApi.ts
│   ├── lib/           # 엔티티 관련 유틸리티
│   │   └── formatUser.ts
│   └── ui/            # 엔티티 표시용 기본 컴포넌트 (선택적)
│       └── UserAvatar.tsx
├── product/           # 상품 엔티티
│   ├── model/
│   │   └── types.ts
│   └── lib/
│       └── calculatePrice.ts
└── README.md          # 이 문서
```

### 각 디렉토리 설명

#### `model/`
엔티티의 타입 정의, 인터페이스, 기본 데이터 구조를 정의합니다.

**예시: `entities/user/model/types.ts`**
```tsx
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

export type UserRole = "admin" | "user" | "guest";
```

#### `api/` (선택적)
엔티티 관련 API 호출을 정의합니다. 단순 CRUD 작업이 주를 이룹니다.

**예시: `entities/user/api/userApi.ts`**
```tsx
import { User } from "../model/types";

export async function fetchUser(id: string): Promise<User> {
  // API 호출
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  // API 호출
}
```

#### `lib/`
엔티티 관련 비즈니스 로직 및 유틸리티 함수를 포함합니다.

**예시: `entities/user/lib/formatUser.ts`**
```tsx
import { User } from "../model/types";

export function formatUserName(user: User): string {
  return user.name.trim();
}

export function getUserInitials(user: User): string {
  return user.name.charAt(0).toUpperCase();
}
```

#### `ui/` (선택적)
엔티티를 표시하는 기본적인 UI 컴포넌트를 포함합니다. **단순한 표시용 컴포넌트만** 포함합니다.

**예시: `entities/user/ui/UserAvatar.tsx`**
```tsx
import { User } from "../model/types";

interface UserAvatarProps {
  user: User;
  size?: number;
}

export function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  return (
    <Image
      source={{ uri: user.avatarUrl }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  );
}
```

---

## 사용 가이드

### 1. 새로운 엔티티 추가

새로운 비즈니스 엔티티를 추가할 때는 다음 구조를 따릅니다.

**예시: `entities/product/` 생성**

1. **타입 정의 (`model/types.ts`)**
```tsx
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: ProductCategory;
  inStock: boolean;
}

export type ProductCategory = "electronics" | "clothing" | "food";
```

2. **비즈니스 로직 (`lib/calculatePrice.ts`)**
```tsx
import { Product } from "../model/types";

export function calculateDiscountedPrice(
  product: Product,
  discountPercent: number
): number {
  return product.price * (1 - discountPercent / 100);
}
```

3. **API 호출 (`api/productApi.ts`)** - 선택적
```tsx
import { Product } from "../model/types";

export async function fetchProduct(id: string): Promise<Product> {
  // API 호출
}
```

### 2. 엔티티 간 관계 정의

엔티티 간 관계는 타입으로 표현합니다.

**예시: `entities/order/model/types.ts`**
```tsx
import { User } from "@/entities/user/model/types";
import { Product } from "@/entities/product/model/types";

export interface Order {
  id: string;
  userId: string;
  user?: User; // 관계 (선택적)
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export interface OrderItem {
  productId: string;
  product?: Product; // 관계 (선택적)
  quantity: number;
  price: number;
}
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **도메인 모델 중심으로 구성**
   ```tsx
   // ✅ 좋은 예: 사용자 엔티티
   entities/user/model/types.ts
   entities/user/lib/formatUser.ts
   ```

2. **비즈니스 로직 포함**
   ```tsx
   // ✅ 좋은 예: 엔티티 관련 비즈니스 규칙
   export function calculateUserAge(user: User): number {
     return new Date().getFullYear() - user.birthYear;
   }
   ```

3. **타입 안정성 보장**
   ```tsx
   // ✅ 좋은 예: 명시적 타입 정의
   export interface User {
     id: string;
     name: string;
   }
   ```

4. **재사용 가능한 구조**
   ```tsx
   // ✅ 좋은 예: 여러 features에서 사용 가능
   import { User } from "@/entities/user/model/types";
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **UI 로직 포함 금지**
   ```tsx
   // ❌ 나쁜 예: UI 상태 관리
   export function useUserProfile() {
     const [isLoading, setIsLoading] = useState(false);
     // UI 로직은 features나 widgets에 있어야 함
   }
   
   // ✅ 좋은 예: 순수 비즈니스 로직
   export function formatUserName(user: User): string {
     return user.name.trim();
   }
   ```

2. **특정 기능에 종속된 코드 금지**
   ```tsx
   // ❌ 나쁜 예: 특정 기능에만 사용되는 로직
   export function useUserProfileForSettings() {
     // settings 기능에만 사용되는 로직은 features/settings에 있어야 함
   }
   
   // ✅ 좋은 예: 범용 엔티티 로직
   export function getUserDisplayName(user: User): string {
     return user.name || user.email;
   }
   ```

3. **복잡한 상태 관리 금지**
   ```tsx
   // ❌ 나쁜 예: 전역 상태 관리
   import { create } from "zustand";
   export const useUserStore = create(...);
   
   // ✅ 좋은 예: 단순 데이터 구조
   export interface User { ... }
   ```

4. **UI 컴포넌트는 최소화**
   ```tsx
   // ⚠️ 주의: UI 컴포넌트는 단순 표시용만
   // 복잡한 인터랙션이나 상태 관리는 features나 widgets에 있어야 함
   
   // ✅ 좋은 예: 단순 표시 컴포넌트
   export function UserAvatar({ user }: { user: User }) {
     return <Image source={{ uri: user.avatarUrl }} />;
   }
   
   // ❌ 나쁜 예: 복잡한 인터랙션
   export function UserProfileCard() {
     const [isEditing, setIsEditing] = useState(false);
     // 복잡한 로직은 features에 있어야 함
   }
   ```

5. **다른 레이어 import 제한**
   ```tsx
   // ✅ entities는 shared와 다른 entities만 import 가능
   import { formatDate } from "@/shared/lib/format";
   import { Product } from "@/entities/product/model/types";
   
   // ❌ 나쁜 예: 상위 레이어 import 금지
   import { SomeFeature } from "@/features/some-feature";
   ```

---

## 예시

### 완전한 엔티티 예시

**`entities/user/model/types.ts`**
```tsx
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "admin" | "user" | "guest";

export interface UserPreferences {
  theme: "light" | "dark";
  language: "ko" | "en";
}
```

**`entities/user/lib/formatUser.ts`**
```tsx
import { User } from "../model/types";

export function formatUserName(user: User): string {
  return user.name.trim();
}

export function getUserDisplayName(user: User): string {
  return user.name || user.email;
}

export function getUserInitials(user: User): string {
  const name = formatUserName(user);
  return name.charAt(0).toUpperCase();
}
```

**`entities/user/api/userApi.ts`**
```tsx
import { User } from "../model/types";

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}
```

**`entities/user/ui/UserAvatar.tsx`** (선택적)
```tsx
import { View, Image, Text } from "react-native";
import { User } from "../model/types";
import { getUserInitials } from "../lib/formatUser";

interface UserAvatarProps {
  user: User;
  size?: number;
}

export function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  const initials = getUserInitials(user);

  if (user.avatarUrl) {
    return (
      <Image
        source={{ uri: user.avatarUrl }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }

  return (
    <View
      className="bg-primary items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    >
      <Text className="text-content-inverse font-semibold">
        {initials}
      </Text>
    </View>
  );
}
```

---

## 참고

- **FSD 아키텍처**: [Feature-Sliced Design 공식 문서](https://feature-sliced.design/docs/get-started/overview)
- **엔티티 가이드**: [FSD Entities 레이어 가이드](https://feature-sliced.design/docs/reference/layers/entities)
