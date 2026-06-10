# ADR-001: 메인 화면 비동기 상태 UI 처리 패턴

## Status

Accepted

## Context and Problem Statement

메인 화면(AdminHomePage, PartnerHomePage)에서 제휴 목록 데이터를 fetch할 때, API 호출 결과가 error / empty / data 세 가지 상태로 나뉜다. 각 상태에 맞는 UI를 **어느 계층에서, 어떤 방식으로** 렌더링할 것인가를 결정해야 한다.

## Decision Drivers

- FSD 계층 원칙: 상위 계층(pages)이 하위 계층(widgets)의 내부 구현을 제어하지 않도록 한다.
- 컴포넌트 책임 분리: 데이터를 소유하는 쪽이 상태를 처리한다.
- 테스트 용이성: Widget을 독립적으로 테스트할 수 있어야 한다.
- React Native(Expo) 환경 제약: Suspense for data fetching이 안정적으로 지원되지 않는다.

## Considered Options

- **A. Early Return 패턴** — 페이지에서 isError / empty를 분기하고, Widget은 유효한 데이터가 있을 때만 렌더링
- **B. Suspense + Error Boundary 패턴** — `useSuspenseQuery`로 loading/error를 throw하고, 상위 경계에서 포착
- **C. Widget에 상태 prop 전달** — `isError`, `isEmpty` 등을 Widget prop으로 전달하여 Widget 내부에서 UI 분기

## Decision Outcome

**Chosen option: A. Early Return 패턴**

페이지가 fetch 상태를 소유하고 있으므로, 페이지에서 직접 분기하는 것이 책임 소재가 명확하다. Widget은 유효한 데이터를 받아 렌더링만 담당한다.

```tsx
// AdminHomePage
const renderPartnershipSection = () => {
    if (isPartnershipsError) return <EmptyState title="목록을 불러오지 못했어요" ... />;
    if (partnerships.length === 0) return <EmptyState title="진행 중인 제휴가 없어요" ... />;
    return <PartnershipListWidget partnerships={partnerships} maxItems={3} ... />;
};
```

### Positive Consequences

- Widget이 fetch 상태를 전혀 모르므로 순수 display 컴포넌트로 유지된다.
- 상태별 UI를 페이지에서 한눈에 파악할 수 있다.
- Widget을 props만으로 독립적으로 테스트할 수 있다.

### Negative Consequences

- 동일한 분기 로직(error/empty/data)이 AdminHomePage와 PartnerHomePage에 반복된다.
- 페이지에 비동기 분기 코드가 늘어나 컴포넌트가 길어질 수 있다.

## Pros and Cons of the Options

### A. Early Return 패턴

- Good: TanStack Query 공식 권장 패턴
- Good: Widget이 `isError` 같은 fetch 관련 prop을 갖지 않아도 됨
- Good: React Native 환경에서 안정적으로 동작
- Bad: 페이지마다 동일한 분기 패턴을 반복 작성해야 함

### B. Suspense + Error Boundary 패턴

- Good: 선언적이고 컴포넌트가 단순해짐 (Next.js App Router 권장 방향)
- Good: loading/error 처리가 컴포넌트 외부로 완전히 분리됨
- Bad: React Native(Expo)에서 Suspense for data fetching 미완성
- Bad: Expo Router와 Error Boundary 조합이 불안정한 케이스 존재
- Bad: SSR Streaming과의 시너지가 핵심인데 React Native에는 SSR이 없음

### C. Widget에 상태 prop 전달

- Good: Widget 호출부 코드가 짧아짐
- Bad: Widget이 fetch 계층의 관심사(isError)를 알게 되어 책임 경계가 모호해짐
- Bad: Widget의 props가 비대해지고 테스트 시 상태 조합이 복잡해짐
- Bad: FSD 원칙상 Widget은 UI 빌딩 블록이어야 하며 상태 관리 역할을 맡지 않는 것이 바람직함
