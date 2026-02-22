# FormField

`FormField`는 **React Native 환경에서 폼 입력을 쉽게 만들기 위한 공용 입력 컴포넌트**입니다.

- 폼 상태 관리 자동 연결
- validation 에러 자동 표시
- 디자인 시스템 스타일 일관성 유지
- label / helper / right element 지원

👉 **React Hook Form** 기반으로 동작합니다.

---

## 언제 사용하나요?

다음과 같은 입력 UI에 사용합니다

- 로그인 / 회원가입 폼
- 인증번호 입력
- 설정 화면
- 문의 작성 폼

👉 **텍스트 기반 입력 필드 전용 컴포넌트입니다.**

---

## 빠른 시작

### 1. 폼 스키마 정의

보통 **Zod**와 함께 사용합니다.

```ts
const schema = z.object({
  phone: z.string().min(10, "전화번호를 입력해주세요"),
});
```

---

### 2. useForm 설정

```ts
const { control } = useForm({
  resolver: zodResolver(schema),
  defaultValues: { phone: "" },
});
```

---

### 3. FormField 사용

```tsx
<FormField
  control={control}
  name="phone"
  label="전화번호"
  placeholder="숫자만 입력해주세요"
/>
```

---

## 기본 사용 패턴

### 라벨 + helper 메시지

```tsx
<FormField
  control={control}
  name="phone"
  label="전화번호"
  helperText="인증번호가 오지 않았나요?"
/>
```

---

### 오른쪽 버튼 추가

```tsx
<FormField
  control={control}
  name="phone"
  rightElement={
    <Pressable>
      <Text>인증번호 받기</Text>
    </Pressable>
  }
/>
```

👉 인증 버튼, 아이콘 등에 사용합니다.

---

### 스타일 변경

```tsx
<FormField control={control} name="title" appearance="outlined" />
```

지원 스타일:

- `"filled"` (기본값)
- `"outlined"`

---

## Props 설명

### 필수 props

| 이름      | 설명                          |
| --------- | ----------------------------- |
| `control` | useForm에서 받은 control 객체 |
| `name`    | 폼 필드 이름                  |

---

### 선택 props

| 이름           | 설명                         |
| -------------- | ---------------------------- |
| `label`        | 입력 필드 라벨               |
| `helperText`   | 보조 설명 메시지             |
| `appearance`   | `"filled"` 또는 `"outlined"` |
| `rightElement` | 입력창 오른쪽 커스텀 요소    |
| `labelColor`   | 라벨 색상 토큰               |

---

### TextInput props

`placeholder`, `keyboardType` 등 React Native TextInput props를 그대로 사용할 수 있습니다.

```tsx
<FormField keyboardType="numeric" placeholder="숫자만 입력" />
```

---

## Validation 동작 방식

validation 에러가 발생하면:

- 입력창 테두리가 빨간색으로 변경됨
- helper 영역에 에러 메시지 표시됨

예:

```ts
z.string().min(10, "10자리 이상 입력해주세요");
```

---

## 권장 사용 방식

### ✅ 권장

- Zod + react-hook-form 조합
- 기본 디자인 토큰 사용
- validation 메시지 명확하게 작성

---

### ❌ 권장하지 않음

- 숫자/객체 값을 직접 바인딩
- 복잡한 커스텀 UI를 input 안에 삽입

👉 이 컴포넌트는 **텍스트 입력 전용**입니다.

---

## 예시

```tsx
<FormField
  control={control}
  name="title"
  label="제목"
  placeholder="제목을 입력해주세요"
  appearance="outlined"
/>
```
