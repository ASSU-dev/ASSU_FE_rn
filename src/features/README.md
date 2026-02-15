# Features Layer

`features` 레이어는 사용자 기능(기능 단위)과 관련된 코드를 포함합니다.

## 📋 목차

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [사용 가이드](#사용-가이드)
4. [주의사항](#주의사항)
5. [예시](#예시)

---

## 개요

`features` 레이어는 **사용자가 수행할 수 있는 구체적인 기능**을 구현합니다. 예를 들어, "사용자 프로필 편집", "상품 검색", "주문하기" 등이 feature입니다.

### 특징

- ✅ **사용자 기능**: 사용자가 수행하는 구체적인 액션
- ✅ **비즈니스 로직 포함**: 기능 관련 비즈니스 로직 포함
- ✅ **UI 포함**: 기능을 위한 UI 컴포넌트 포함
- ✅ **독립적**: 각 feature는 독립적으로 동작 가능

---

## 디렉토리 구조

```
features/
├── edit-user-profile/      # 사용자 프로필 편집 기능
│   ├── ui/                 # UI 컴포넌트
│   │   ├── EditProfileForm.tsx
│   │   └── EditProfileButton.tsx
│   ├── model/              # 기능 관련 상태/타입
│   │   └── types.ts
│   ├── api/                # 기능 관련 API 호출
│   │   └── updateProfile.ts
│   └── lib/                # 기능 관련 유틸리티
│       └── validateProfile.ts
├── search-products/        # 상품 검색 기능
│   ├── ui/
│   │   └── SearchBar.tsx
│   ├── model/
│   │   └── useSearchProducts.ts
│   └── api/
│       └── searchProducts.ts
└── README.md              # 이 문서
```

### 각 디렉토리 설명

#### `ui/`
기능을 위한 UI 컴포넌트를 포함합니다. 사용자 인터랙션을 처리합니다.

**예시: `features/edit-user-profile/ui/EditProfileForm.tsx`**
```tsx
import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { updateProfile } from "../api/updateProfile";
import { validateProfile } from "../lib/validateProfile";

export function EditProfileForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateProfile({ name })) return;
    
    setIsLoading(true);
    await updateProfile(userId, { name });
    setIsLoading(false);
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <Button title="저장" onPress={handleSubmit} disabled={isLoading} />
    </View>
  );
}
```

#### `model/`
기능 관련 상태 관리, 타입 정의, 커스텀 훅을 포함합니다.

**예시: `features/search-products/model/useSearchProducts.ts`**
```tsx
import { useState } from "react";
import { searchProducts } from "../api/searchProducts";
import { Product } from "@/entities/product/model/types";

export function useSearchProducts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    const products = await searchProducts(searchQuery);
    setResults(products);
    setIsLoading(false);
  };

  return {
    query,
    results,
    isLoading,
    search: handleSearch,
  };
}
```

#### `api/`
기능 관련 API 호출을 정의합니다.

**예시: `features/edit-user-profile/api/updateProfile.ts`**
```tsx
import { User } from "@/entities/user/model/types";

export async function updateProfile(
  userId: string,
  data: Partial<User>
): Promise<User> {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  return response.json();
}
```

#### `lib/`
기능 관련 유틸리티 함수를 포함합니다.

**예시: `features/edit-user-profile/lib/validateProfile.ts`**
```tsx
interface ProfileData {
  name?: string;
  email?: string;
}

export function validateProfile(data: ProfileData): boolean {
  if (data.name && data.name.length < 2) {
    return false;
  }
  if (data.email && !data.email.includes("@")) {
    return false;
  }
  return true;
}
```

---

## 사용 가이드

### 1. 새로운 기능 추가

새로운 사용자 기능을 추가할 때는 다음 구조를 따릅니다.

**예시: `features/add-to-cart/` 생성**

1. **타입 정의 (`model/types.ts`)**
```tsx
export interface AddToCartParams {
  productId: string;
  quantity: number;
}
```

2. **API 호출 (`api/addToCart.ts`)**
```tsx
import { AddToCartParams } from "../model/types";

export async function addToCart(params: AddToCartParams): Promise<void> {
  // API 호출
}
```

3. **UI 컴포넌트 (`ui/AddToCartButton.tsx`)**
```tsx
import { useState } from "react";
import { Button } from "react-native";
import { addToCart } from "../api/addToCart";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    await addToCart({ productId, quantity: 1 });
    setIsLoading(false);
  };

  return (
    <Button
      title="장바구니 추가"
      onPress={handleAdd}
      disabled={isLoading}
    />
  );
}
```

### 2. 기능 간 통신

기능 간 통신은 props나 이벤트를 통해 이루어집니다.

**예시: 검색 후 상세 페이지로 이동**
```tsx
// features/search-products/ui/SearchResults.tsx
import { ProductCard } from "@/features/view-product/ui/ProductCard";

export function SearchResults({ results }: { results: Product[] }) {
  return (
    <View>
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
}
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **사용자 기능 중심으로 구성**
   ```tsx
   // ✅ 좋은 예: 구체적인 사용자 기능
   features/edit-user-profile/
   features/search-products/
   features/add-to-cart/
   ```

2. **독립적인 기능 단위**
   ```tsx
   // ✅ 좋은 예: 각 feature는 독립적으로 동작 가능
   export function EditProfileForm() {
     // 완전한 기능 구현
   }
   ```

3. **entities와 shared 활용**
   ```tsx
   // ✅ 좋은 예: 하위 레이어 활용
   import { User } from "@/entities/user/model/types";
   import { formatDate } from "@/shared/lib/format";
   ```

4. **명확한 책임 분리**
   ```tsx
   // ✅ 좋은 예: UI, 로직, API 분리
   features/edit-user-profile/
     ├── ui/EditProfileForm.tsx      # UI
     ├── model/useEditProfile.ts     # 상태 관리
     └── api/updateProfile.ts       # API 호출
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **여러 기능을 하나의 feature에 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 여러 기능이 섞임
   features/user-management/  # 프로필 편집, 로그인, 회원가입이 모두 포함
   
   // ✅ 좋은 예: 각 기능을 분리
   features/edit-user-profile/
   features/login/
   features/signup/
   ```

2. **entities의 역할 침해 금지**
   ```tsx
   // ❌ 나쁜 예: 엔티티 타입을 features에 정의
   // features/user-profile/model/types.ts
   export interface User { ... }  // entities에 있어야 함
   
   // ✅ 좋은 예: entities에서 import
   import { User } from "@/entities/user/model/types";
   ```

3. **shared의 역할 침해 금지**
   ```tsx
   // ❌ 나쁜 예: 범용 유틸리티를 features에 정의
   // features/some-feature/lib/formatDate.ts
   export function formatDate(date: Date) { ... }  // shared에 있어야 함
   
   // ✅ 좋은 예: shared에서 import
   import { formatDate } from "@/shared/lib/format";
   ```

4. **복잡한 페이지 레이아웃 금지**
   ```tsx
   // ❌ 나쁜 예: 전체 페이지 레이아웃
   export function UserProfilePage() {
     return (
       <ScrollView>
         <Header />
         <ProfileSection />
         <SettingsSection />
         <Footer />
       </ScrollView>
     );
   }
   
   // ✅ 좋은 예: 기능 단위 컴포넌트
   export function EditProfileForm() {
     // 프로필 편집 기능만 담당
   }
   ```

5. **다른 features 직접 import 제한**
   ```tsx
   // ⚠️ 주의: features 간 직접 import는 피하는 것이 좋음
   // 대신 widgets나 pages에서 조합
   
   // ❌ 나쁜 예: feature 간 직접 import
   import { SearchBar } from "@/features/search-products/ui/SearchBar";
   
   // ✅ 좋은 예: widgets나 pages에서 조합
   // widgets/product-list/ui/ProductList.tsx
   import { SearchBar } from "@/features/search-products/ui/SearchBar";
   import { ProductCard } from "@/features/view-product/ui/ProductCard";
   ```

6. **상위 레이어 import 금지**
   ```tsx
   // ❌ 나쁜 예: 상위 레이어 import
   import { SomePage } from "@/pages/some-page";
   import { SomeWidget } from "@/widgets/some-widget";
   
   // ✅ features는 entities, shared, 다른 features만 import 가능
   ```

---

## 예시

### 완전한 기능 예시

**`features/edit-user-profile/model/types.ts`**
```tsx
export interface EditProfileFormData {
  name: string;
  email: string;
  bio?: string;
}

export interface EditProfileState {
  isLoading: boolean;
  error: string | null;
}
```

**`features/edit-user-profile/lib/validateProfile.ts`**
```tsx
import { EditProfileFormData } from "../model/types";

export function validateProfile(data: EditProfileFormData): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2) {
    errors.name = "이름은 2자 이상이어야 합니다";
  }

  if (!data.email || !data.email.includes("@")) {
    errors.email = "올바른 이메일을 입력하세요";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

**`features/edit-user-profile/api/updateProfile.ts`**
```tsx
import { User } from "@/entities/user/model/types";
import { EditProfileFormData } from "../model/types";

export async function updateProfile(
  userId: string,
  data: EditProfileFormData
): Promise<User> {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("프로필 업데이트에 실패했습니다");
  }

  return response.json();
}
```

**`features/edit-user-profile/model/useEditProfile.ts`**
```tsx
import { useState } from "react";
import { updateProfile } from "../api/updateProfile";
import { validateProfile } from "../lib/validateProfile";
import { EditProfileFormData, EditProfileState } from "./types";

export function useEditProfile(userId: string) {
  const [state, setState] = useState<EditProfileState>({
    isLoading: false,
    error: null,
  });

  const handleSubmit = async (data: EditProfileFormData) => {
    const validation = validateProfile(data);
    if (!validation.isValid) {
      setState({ isLoading: false, error: "입력값을 확인하세요" });
      return;
    }

    setState({ isLoading: true, error: null });
    try {
      await updateProfile(userId, data);
      setState({ isLoading: false, error: null });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "오류가 발생했습니다",
      });
    }
  };

  return {
    ...state,
    submit: handleSubmit,
  };
}
```

**`features/edit-user-profile/ui/EditProfileForm.tsx`**
```tsx
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useEditProfile } from "../model/useEditProfile";
import { EditProfileFormData } from "../model/types";

interface EditProfileFormProps {
  userId: string;
  initialData?: EditProfileFormData;
  onSuccess?: () => void;
}

export function EditProfileForm({
  userId,
  initialData,
  onSuccess,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState<EditProfileFormData>(
    initialData || { name: "", email: "" }
  );
  const { isLoading, error, submit } = useEditProfile(userId);

  const handleSubmit = async () => {
    await submit(formData);
    onSuccess?.();
  };

  return (
    <View className="p-4">
      <TextInput
        className="border border-neutral-variant rounded-lg p-3 mb-3"
        value={formData.name}
        onChangeText={(name) => setFormData({ ...formData, name })}
        placeholder="이름"
      />
      <TextInput
        className="border border-neutral-variant rounded-lg p-3 mb-3"
        value={formData.email}
        onChangeText={(email) => setFormData({ ...formData, email })}
        placeholder="이메일"
        keyboardType="email-address"
      />
      {error && (
        <Text className="text-danger mb-3">{error}</Text>
      )}
      <Button
        title="저장"
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </View>
  );
}
```

---

## 참고

- **FSD 아키텍처**: [Feature-Sliced Design 공식 문서](https://feature-sliced.design/docs/get-started/overview)
- **Features 가이드**: [FSD Features 레이어 가이드](https://feature-sliced.design/docs/reference/layers/features)
