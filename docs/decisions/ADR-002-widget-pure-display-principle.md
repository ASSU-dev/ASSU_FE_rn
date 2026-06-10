# ADR-002: Widget은 순수 Display 컴포넌트로 설계한다

## Status

Accepted

## Context and Problem Statement

FSD 아키텍처에서 Widget 계층은 여러 페이지에서 공유하는 UI 블록이다. Widget이 데이터 fetch를 직접 담당해야 하는가(self-contained), 아니면 데이터를 props로 받아 렌더링만 담당해야 하는가(pure display)를 결정해야 한다.

구체적인 계기: `PartnershipListWidget`에 `isError` prop을 추가하는 방식으로 구현했다가, Widget이 fetch 계층의 관심사를 알게 되는 문제를 발견하여 설계 원칙을 명문화한다.

## Decision Drivers

- FSD 계층 규칙: Widget은 상위 계층(pages, features)의 데이터를 받아 UI를 조합하는 역할이다.
- 단일 책임 원칙: UI 렌더링과 데이터 fetch는 별개의 책임이다.
- 재사용성: 동일한 Widget을 다양한 데이터 소스에서 사용할 수 있어야 한다.
- 테스트 용이성: props만 주입하면 독립적으로 렌더링 테스트가 가능해야 한다.

## Considered Options

- **A. Pure Display Widget** — props로 데이터를 받고 렌더링만 담당. 비동기 상태는 외부(페이지)에서 처리.
- **B. Self-Contained Widget** — Widget 내부에서 직접 fetch하고 loading/error/empty/data 상태를 모두 처리.

## Decision Outcome

**Chosen option: A. Pure Display Widget**

현재 Widget들은 pages에서 fetch한 데이터를 props로 전달받는 구조다. 이 구조에서 Widget이 `isError` 같은 fetch 상태를 props로 받는 것은 책임 경계를 모호하게 만든다. 데이터를 소유하는 pages가 상태를 처리하고, Widget은 유효한 데이터를 렌더링하는 역할만 맡는다.

```tsx
// ✅ Pure display - fetch 상태를 모름
<PartnershipListWidget
    partnerships={partnerships}  // 유효한 데이터만 전달
    maxItems={3}
    onViewAll={...}
    onPressCard={...}
/>

// ❌ Anti-pattern - fetch 계층의 관심사가 Widget으로 유입됨
<PartnershipListWidget
    partnerships={partnerships}
    isError={isError}      // fetch 상태가 Widget prop으로 들어옴
    isLoading={isLoading}
/>
```

### Positive Consequences

- Widget props가 UI 관련 값으로만 구성되어 인터페이스가 명확해진다.
- 동일한 Widget을 mock 데이터, 실서버 데이터, 다른 API 응답 등 어디서든 재사용할 수 있다.
- 스토리북 등에서 props만으로 모든 UI 상태를 재현할 수 있다.

### Negative Consequences

- Widget이 self-contained가 아니므로, 사용하는 페이지마다 fetch + 상태 분기 코드를 작성해야 한다.
- 향후 Widget이 복잡해져 자체 fetch가 필요해지면 설계를 변경해야 한다.

## Pros and Cons of the Options

### A. Pure Display Widget

- Good: 단일 책임 원칙 준수 — 렌더링만 담당
- Good: FSD Widget 계층의 의도에 부합
- Good: props 기반 테스트 용이
- Bad: 페이지가 fetch + 분기 + Widget 호출을 모두 담당하여 코드량 증가

### B. Self-Contained Widget

- Good: Widget 단독으로 어디서든 사용 가능 (plug-and-play)
- Good: 페이지 코드가 단순해짐
- Bad: Widget이 특정 API에 결합되어 재사용성이 낮아짐
- Bad: fetch 로직 변경 시 Widget 내부를 수정해야 함
- Bad: 동일 Widget을 다른 데이터 소스로 테스트하기 어려움
- Bad: FSD에서 Widget은 features/entities를 조합하는 UI 블록으로 정의되며, 직접 API를 호출하는 것은 과도한 책임
