# Pages Layer

`pages` 레이어는 애플리케이션의 페이지(화면) 컴포넌트를 포함합니다.

## 📋 목차

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [사용 가이드](#사용-가이드)
4. [주의사항](#주의사항)
5. [예시](#예시)

---

## 개요

`pages` 레이어는 **애플리케이션의 전체 페이지(화면)를 구성**합니다. Expo Router를 사용하는 경우, 이 레이어는 `app` 디렉토리의 라우팅과 연결됩니다.

### 특징

- ✅ **페이지 구성**: 전체 화면 레이아웃 담당
- ✅ **위젯 조합**: 여러 widgets를 조합하여 페이지 구성
- ✅ **라우팅 연결**: Expo Router와 연결
- ✅ **최소한의 로직**: 주로 레이아웃과 조합에 집중

---

## 디렉토리 구조

```
pages/
├── product-list-page/      # 상품 목록 페이지
│   └── ui/
│       └── ProductListPage.tsx
├── product-detail-page/    # 상품 상세 페이지
│   └── ui/
│       └── ProductDetailPage.tsx
├── user-profile-page/      # 사용자 프로필 페이지
│   └── ui/
│       └── UserProfilePage.tsx
└── README.md               # 이 문서
```

### 각 디렉토리 설명

#### `ui/`
페이지 컴포넌트를 포함합니다. 여러 widgets를 조합하여 전체 페이지를 구성합니다.

**예시: `pages/product-list-page/ui/ProductListPage.tsx`**
```tsx
import { ScrollView } from "react-native";
import { Header } from "@/widgets/header/ui/Header";
import { ProductList } from "@/widgets/product-list/ui/ProductList";
import { Footer } from "@/widgets/footer/ui/Footer";

export function ProductListPage() {
  return (
    <ScrollView className="flex-1 bg-canvas">
      <Header />
      <ProductList />
      <Footer />
    </ScrollView>
  );
}
```

---

## 사용 가이드

### 1. Expo Router와의 연결

Expo Router를 사용하는 경우, `app` 디렉토리에서 `pages` 레이어의 컴포넌트를 import하여 사용합니다.

**예시: `app/(tabs)/products.tsx`**
```tsx
import { ProductListPage } from "@/pages/product-list-page/ui/ProductListPage";

export default function ProductsScreen() {
  return <ProductListPage />;
}
```

### 2. 새로운 페이지 추가

새로운 페이지를 추가할 때는 다음 구조를 따릅니다.

**예시: `pages/product-detail-page/` 생성**

1. **페이지 컴포넌트 (`ui/ProductDetailPage.tsx`)**
```tsx
import { ScrollView } from "react-native";
import { Header } from "@/widgets/header/ui/Header";
import { ProductDetailSection } from "@/widgets/product-detail-section/ui/ProductDetailSection";
import { RelatedProducts } from "@/widgets/related-products/ui/RelatedProducts";

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return (
    <ScrollView className="flex-1 bg-canvas">
      <Header />
      <ProductDetailSection productId={productId} />
      <RelatedProducts productId={productId} />
    </ScrollView>
  );
}
```

2. **라우터 연결 (`app/product/[id].tsx`)**
```tsx
import { useLocalSearchParams } from "expo-router";
import { ProductDetailPage } from "@/pages/product-detail-page/ui/ProductDetailPage";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  if (!id) {
    return null;
  }
  
  return <ProductDetailPage productId={id} />;
}
```

### 3. 페이지 간 네비게이션

페이지 간 네비게이션은 Expo Router의 `router`를 사용합니다.

**예시: `pages/product-list-page/ui/ProductListPage.tsx`**
```tsx
import { useRouter } from "expo-router";
import { ProductList } from "@/widgets/product-list/ui/ProductList";

export function ProductListPage() {
  const router = useRouter();

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <ProductList onProductPress={handleProductPress} />
  );
}
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **위젯 조합 중심**
   ```tsx
   // ✅ 좋은 예: 여러 widgets를 조합
   export function ProductListPage() {
     return (
       <ScrollView>
         <Header />
         <ProductList />
         <Footer />
       </ScrollView>
     );
   }
   ```

2. **레이아웃에 집중**
   ```tsx
   // ✅ 좋은 예: 페이지 구조와 레이아웃만 담당
   export function UserProfilePage() {
     return (
       <ScrollView>
         <Header />
         <UserProfileSection />
         <UserSettingsSection />
       </ScrollView>
     );
   }
   ```

3. **하위 레이어 활용**
   ```tsx
   // ✅ 좋은 예: widgets, features, entities 활용
   import { Header } from "@/widgets/header/ui/Header";
   import { ProductList } from "@/widgets/product-list/ui/ProductList";
   ```

4. **라우팅 연결**
   ```tsx
   // ✅ 좋은 예: Expo Router와 연결
   // app/products.tsx
   import { ProductListPage } from "@/pages/product-list-page/ui/ProductListPage";
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **비즈니스 로직 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 복잡한 비즈니스 로직
   export function ProductListPage() {
     const [products, setProducts] = useState([]);
     const fetchProducts = async () => {
       // API 호출 로직은 features에 있어야 함
     };
   }
   
   // ✅ 좋은 예: 레이아웃만 담당
   export function ProductListPage() {
     return (
       <ScrollView>
         <ProductList />
       </ScrollView>
     );
   }
   ```

2. **위젯 내부 로직 포함 금지**
   ```tsx
   // ❌ 나쁜 예: 위젯의 내부 로직을 페이지에 포함
   export function ProductListPage() {
     const [filter, setFilter] = useState("");
     // 필터링 로직은 widgets/product-list에 있어야 함
   }
   
   // ✅ 좋은 예: 위젯에 위임
   export function ProductListPage() {
     return <ProductList />;
   }
   ```

3. **직접적인 API 호출 금지**
   ```tsx
   // ❌ 나쁜 예: 페이지에서 직접 API 호출
   export function ProductListPage() {
     useEffect(() => {
       fetch("/api/products").then(...);
     }, []);
   }
   
   // ✅ 좋은 예: features나 widgets에서 처리
   export function ProductListPage() {
     return <ProductList />; // 내부에서 API 호출 처리
   }
   ```

4. **상태 관리 최소화**
   ```tsx
   // ⚠️ 주의: 페이지 레벨 상태는 최소화
   // 복잡한 상태는 widgets나 features에서 관리
   
   // ✅ 좋은 예: 라우팅 관련 상태만
   const router = useRouter();
   const { id } = useLocalSearchParams();
   
   // ❌ 나쁜 예: 비즈니스 상태
   const [products, setProducts] = useState([]);
   const [filters, setFilters] = useState({});
   ```

5. **Features 직접 import 제한**
   ```tsx
   // ⚠️ 주의: features를 직접 import하는 것보다 widgets를 통해 사용
   
   // ❌ 나쁜 예: features 직접 import
   import { SearchBar } from "@/features/search-products/ui/SearchBar";
   
   // ✅ 좋은 예: widgets를 통해 사용
   import { ProductSearchSection } from "@/widgets/product-search-section/ui/ProductSearchSection";
   ```

6. **Processes import 금지**
   ```tsx
   // ❌ 나쁜 예: processes import
   import { SomeProcess } from "@/processes/some-process";
   
   // ✅ pages는 widgets, features, entities, shared만 import 가능
   ```

---

## 예시

### 완전한 페이지 예시

**`pages/product-list-page/ui/ProductListPage.tsx`**
```tsx
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Header } from "@/widgets/header/ui/Header";
import { ProductList } from "@/widgets/product-list/ui/ProductList";
import { Product } from "@/entities/product/model/types";

interface ProductListPageProps {
  initialProducts?: Product[];
}

export function ProductListPage({ initialProducts }: ProductListPageProps) {
  const router = useRouter();

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <ScrollView className="flex-1 bg-canvas">
      <Header />
      <View className="flex-1">
        <ProductList
          products={initialProducts}
          onProductPress={handleProductPress}
        />
      </View>
    </ScrollView>
  );
}
```

**`app/(tabs)/products.tsx`** (Expo Router 연결)
```tsx
import { ProductListPage } from "@/pages/product-list-page/ui/ProductListPage";

export default function ProductsScreen() {
  return <ProductListPage />;
}
```

**`pages/user-profile-page/ui/UserProfilePage.tsx`**
```tsx
import { ScrollView, View } from "react-native";
import { Header } from "@/widgets/header/ui/Header";
import { UserProfileCard } from "@/widgets/user-profile-card/ui/UserProfileCard";
import { UserSettingsSection } from "@/widgets/user-settings-section/ui/UserSettingsSection";
import { User } from "@/entities/user/model/types";

interface UserProfilePageProps {
  user: User;
}

export function UserProfilePage({ user }: UserProfilePageProps) {
  return (
    <ScrollView className="flex-1 bg-canvas">
      <Header />
      <View className="p-screen-m space-y-4">
        <UserProfileCard user={user} />
        <UserSettingsSection userId={user.id} />
      </View>
    </ScrollView>
  );
}
```

**`app/profile.tsx`** (Expo Router 연결)
```tsx
import { useAuth } from "@/shared/hooks/useAuth"; // 예시
import { UserProfilePage } from "@/pages/user-profile-page/ui/UserProfilePage";

export default function ProfileScreen() {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return <UserProfilePage user={user} />;
}
```

---

## Expo Router와의 통합

### 파일 기반 라우팅

Expo Router는 파일 기반 라우팅을 사용하므로, `app` 디렉토리의 파일 구조가 라우트를 결정합니다.

**예시:**
```
app/
├── (tabs)/
│   ├── index.tsx          → /(tabs)/
│   ├── products.tsx       → /(tabs)/products
│   └── profile.tsx         → /(tabs)/profile
└── product/
    └── [id].tsx           → /product/:id
```

각 라우트 파일에서 `pages` 레이어의 컴포넌트를 import하여 사용합니다.

---

## 참고

- **FSD 아키텍처**: [Feature-Sliced Design 공식 문서](https://feature-sliced.design/docs/get-started/overview)
- **Pages 가이드**: [FSD Pages 레이어 가이드](https://feature-sliced.design/docs/reference/layers/pages)
- **Expo Router**: [Expo Router 공식 문서](https://docs.expo.dev/router/introduction/)
