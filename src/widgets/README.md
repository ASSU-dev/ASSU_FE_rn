# Widgets Layer

`widgets` 레이어는 독립적인 UI 블록(복합 컴포넌트)을 포함합니다.

## 📋 목차

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [사용 가이드](#사용-가이드)
4. [주의사항](#주의사항)
5. [예시](#예시)

---

## 개요

`widgets` 레이어는 **여러 features나 entities를 조합한 복합적인 UI 블록**을 포함합니다. 페이지의 큰 섹션을 구성하거나, 여러 기능을 통합한 독립적인 UI 컴포넌트입니다.

### 특징

- ✅ **복합 컴포넌트**: 여러 features/entities를 조합
- ✅ **독립적**: 자체적으로 완성된 UI 블록
- ✅ **재사용 가능**: 여러 페이지에서 사용 가능
- ✅ **비즈니스 로직 최소화**: 주로 UI 조합에 집중

---

## 디렉토리 구조

```
widgets/
├── header/                 # 헤더 위젯
│   ├── ui/
│   │   ├── Header.tsx
│   │   └── HeaderNavigation.tsx
│   └── model/             # 위젯 관련 상태 (선택적)
│       └── useHeader.ts
├── product-list/          # 상품 목록 위젯
│   ├── ui/
│   │   ├── ProductList.tsx
│   │   └── ProductListHeader.tsx
│   └── model/
│       └── useProductList.ts
├── user-profile-card/     # 사용자 프로필 카드 위젯
│   └── ui/
│       └── UserProfileCard.tsx
└── README.md              # 이 문서
```

### 각 디렉토리 설명

#### `ui/`
위젯의 UI 컴포넌트를 포함합니다. 여러 features나 entities를 조합합니다.

**예시: `widgets/product-list/ui/ProductList.tsx`**
```tsx
import { View } from "react-native";
import { SearchBar } from "@/features/search-products/ui/SearchBar";
import { ProductCard } from "@/features/view-product/ui/ProductCard";
import { Product } from "@/entities/product/model/types";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <View>
      <SearchBar />
      <View>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
}
```

#### `model/` (선택적)
위젯 관련 상태 관리나 커스텀 훅을 포함합니다. 위젯 내부에서만 사용되는 상태입니다.

**예시: `widgets/product-list/model/useProductList.ts`**
```tsx
import { useState } from "react";
import { Product } from "@/entities/product/model/types";

export function useProductList(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return {
    products: filteredProducts,
    filter,
    setFilter,
  };
}
```

---

## 사용 가이드

### 1. 새로운 위젯 추가

새로운 위젯을 추가할 때는 다음 구조를 따릅니다.

**예시: `widgets/user-dashboard/` 생성**

1. **UI 컴포넌트 (`ui/UserDashboard.tsx`)**
```tsx
import { View, Text } from "react-native";
import { UserProfileCard } from "@/widgets/user-profile-card/ui/UserProfileCard";
import { EditProfileButton } from "@/features/edit-user-profile/ui/EditProfileButton";
import { User } from "@/entities/user/model/types";

interface UserDashboardProps {
  user: User;
}

export function UserDashboard({ user }: UserDashboardProps) {
  return (
    <View>
      <UserProfileCard user={user} />
      <EditProfileButton userId={user.id} />
    </View>
  );
}
```

2. **상태 관리 (`model/useUserDashboard.ts`)** - 선택적
```tsx
import { useState } from "react";
import { User } from "@/entities/user/model/types";

export function useUserDashboard(initialUser: User) {
  const [user, setUser] = useState<User>(initialUser);

  return {
    user,
    setUser,
  };
}
```

### 2. Features 조합

위젯은 여러 features를 조합하여 더 큰 UI 블록을 만듭니다.

**예시: `widgets/product-search-section/ui/ProductSearchSection.tsx`**
```tsx
import { View } from "react-native";
import { SearchBar } from "@/features/search-products/ui/SearchBar";
import { SearchResults } from "@/features/search-products/ui/SearchResults";
import { FilterButton } from "@/features/filter-products/ui/FilterButton";
import { useSearchProducts } from "@/features/search-products/model/useSearchProducts";

export function ProductSearchSection() {
  const { query, results, search } = useSearchProducts();

  return (
    <View>
      <View className="flex-row gap-2">
        <SearchBar onSearch={search} />
        <FilterButton />
      </View>
      <SearchResults results={results} />
    </View>
  );
}
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **복합 컴포넌트 중심**
   ```tsx
   // ✅ 좋은 예: 여러 features를 조합한 위젯
   export function ProductList() {
     return (
       <View>
         <SearchBar />
         <ProductCard />
         <FilterButton />
       </View>
     );
   }
   ```

2. **독립적인 UI 블록**
   ```tsx
   // ✅ 좋은 예: 자체적으로 완성된 위젯
   export function Header() {
     return (
       <View>
         <Logo />
         <Navigation />
         <UserMenu />
       </View>
     );
   }
   ```

3. **Features와 Entities 활용**
   ```tsx
   // ✅ 좋은 예: 하위 레이어 활용
   import { SearchBar } from "@/features/search-products/ui/SearchBar";
   import { User } from "@/entities/user/model/types";
   ```

4. **재사용 가능한 구조**
   ```tsx
   // ✅ 좋은 예: 여러 페이지에서 사용 가능
   import { Header } from "@/widgets/header/ui/Header";
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **단순 컴포넌트 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 단순한 버튼 컴포넌트
   // widgets/button/ui/Button.tsx
   export function Button() { ... }  // shared/ui에 있어야 함
   
   // ✅ 좋은 예: 복합 위젯
   export function ProductList() {
     // 여러 features를 조합
   }
   ```

2. **비즈니스 로직 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 복잡한 비즈니스 로직
   export function ProductList() {
     const handleComplexBusinessLogic = () => {
       // 복잡한 로직은 features에 있어야 함
     };
   }
   
   // ✅ 좋은 예: UI 조합에 집중
   export function ProductList() {
     return (
       <View>
         <SearchBar />
         <ProductCard />
       </View>
     );
   }
   ```

3. **페이지 레이아웃 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 전체 페이지 구조
   export function ProductPage() {
     return (
       <ScrollView>
         <Header />
         <ProductList />
         <Footer />
       </ScrollView>
     );
   }
   
   // ✅ 좋은 예: 페이지의 일부 섹션
   export function ProductList() {
     // 페이지의 일부만 담당
   }
   ```

4. **상태 관리 최소화**
   ```tsx
   // ⚠️ 주의: 위젯 내부 상태는 최소화
   // 복잡한 상태는 features나 pages에서 관리
   
   // ✅ 좋은 예: 위젯 내부 UI 상태만
   const [isExpanded, setIsExpanded] = useState(false);
   
   // ❌ 나쁜 예: 복잡한 비즈니스 상태
   const [products, setProducts] = useState([]);
   const [filters, setFilters] = useState({});
   // 이런 상태는 features나 pages에서 관리
   ```

5. **다른 widgets 직접 import 제한**
   ```tsx
   // ⚠️ 주의: widgets 간 직접 import는 피하는 것이 좋음
   // 대신 pages에서 조합
   
   // ❌ 나쁜 예: widget 간 직접 import
   import { Header } from "@/widgets/header/ui/Header";
   
   // ✅ 좋은 예: pages에서 조합
   // pages/product-page/ui/ProductPage.tsx
   import { Header } from "@/widgets/header/ui/Header";
   import { ProductList } from "@/widgets/product-list/ui/ProductList";
   ```

6. **상위 레이어 import 금지**
   ```tsx
   // ❌ 나쁜 예: 상위 레이어 import
   import { SomePage } from "@/pages/some-page";
   
   // ✅ widgets는 features, entities, shared만 import 가능
   ```

---

## 예시

### 완전한 위젯 예시

**`widgets/product-list/ui/ProductList.tsx`**
```tsx
import { View, ScrollView, Text } from "react-native";
import { SearchBar } from "@/features/search-products/ui/SearchBar";
import { ProductCard } from "@/features/view-product/ui/ProductCard";
import { AddToCartButton } from "@/features/add-to-cart/ui/AddToCartButton";
import { Product } from "@/entities/product/model/types";
import { useProductList } from "../model/useProductList";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products: initialProducts }: ProductListProps) {
  const { products, filter, setFilter } = useProductList(initialProducts);

  return (
    <ScrollView className="flex-1 bg-canvas">
      <View className="p-screen-m">
        <SearchBar
          value={filter}
          onChangeText={setFilter}
          placeholder="상품 검색..."
        />
        
        {products.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-content-secondary">
              검색 결과가 없습니다
            </Text>
          </View>
        ) : (
          <View className="mt-4 space-y-gutter">
            {products.map((product) => (
              <View
                key={product.id}
                className="bg-neutral rounded-lg p-4"
              >
                <ProductCard product={product} />
                <View className="mt-3">
                  <AddToCartButton productId={product.id} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
```

**`widgets/product-list/model/useProductList.ts`**
```tsx
import { useState, useMemo } from "react";
import { Product } from "@/entities/product/model/types";

export function useProductList(initialProducts: Product[]) {
  const [products] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>("");

  const filteredProducts = useMemo(() => {
    if (!filter) return products;
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return {
    products: filteredProducts,
    filter,
    setFilter,
  };
}
```

**`widgets/header/ui/Header.tsx`**
```tsx
import { View, Text, TouchableOpacity } from "react-native";
import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { User } from "@/entities/user/model/types";

interface HeaderProps {
  user?: User;
  onProfilePress?: () => void;
}

export function Header({ user, onProfilePress }: HeaderProps) {
  return (
    <View className="bg-neutral px-screen-m py-4 flex-row items-center justify-between">
      <Text className="text-xl font-bold text-content-primary">
        ASSU
      </Text>
      
      {user && (
        <TouchableOpacity onPress={onProfilePress}>
          <UserAvatar user={user} size={32} />
        </TouchableOpacity>
      )}
    </View>
  );
}
```

---

## 참고

- **FSD 아키텍처**: [Feature-Sliced Design 공식 문서](https://feature-sliced.design/docs/get-started/overview)
- **Widgets 가이드**: [FSD Widgets 레이어 가이드](https://feature-sliced.design/docs/reference/layers/widgets)
