# Jest 성공 실행 기록

승인된 테스트 범위의 Jest 실행이 성공했을 때 작업 단위로 한 건을 추가합니다. 실패하거나 중단한 실행은 이 문서에 누적하지 않고 현재 작업 결과로 보고합니다. 원본 로그 전체 대신 재실행 과정과 변경 내역을 요약합니다.

| 날짜 | 작업/PR | 승인된 범위 | 대상 테스트 및 명령 | 시도별 결과 | 최종 결과 | 변경 파일 및 요약 | 제품 코드 수정 승인 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-11-01 | #272 학생 지도 화면 테스트 코드 작성 | P0~P2: 지도 마커 변환, 매장 카드 표시 규칙, 위치 권한별 시작 위치, 겹친 매장 묶음, 카테고리·학생회 필터, 주변 매장 조회 조건, 조회 범위 변환, 선택 매장 카드 | 학생 지도 테스트 8개 파일 / `yarn test --testPathPattern "src/(features/map-search\|features/map-filter\|entities/store/lib\|widgets/map)/.*\.test\.tsx?$"` | 1회차 통과·경고 2건(act 미포함, worker 미종료) → 위치 훅 act 대기 보강, QueryClient `gcTime: Infinity`·`clear()` 추가 / 2회차 통과·act 경고 1건 → 렌더를 act 안으로 이동 / 3회차 위치 훅 4건 실패(unmounted renderer, 2회차 수정이 원인) → 렌더는 act 밖, 첫 권한 응답을 대기 Promise로 두고 act 안에서 resolve / 4회차 해당 파일 통과 / 5회차 전체 통과 | 8 suites · 56 tests 통과, 경고 없음 | 신규 테스트 8개(`mapSearchMappers`, `mapDisplay`, `useUserLocation`, `useClusterStores`, `useMapFilterStore`, `useMapSearch`, `toViewport`, `StudentSelectedStoreCard`), `test-dashboard.md` 갱신. mock은 `expo-location`·`useFocusEffect`·`Alert`·`fetchNearbyStores`만 사용 | 해당 없음(제품 코드 미수정) |

## 기록 규칙

- 대상 테스트가 최종 통과한 경우에만 기록한다.
- 시도별 결과에는 최초 실행부터 성공까지의 원인과 조치를 간단히 남긴다. 예: `1회차 실패: mock 응답 형식 오류 → mock 수정, 2회차 통과`.
- 변경 파일과 요약에는 테스트 코드·fixture·mock 변경을 기록한다. 제품 코드 변경이 포함되면 개발자가 승인한 범위와 승인 사실도 기록한다.
- 실제 Jest 명령과 작업 날짜를 기록한다. 원본 실패 로그는 붙이지 않는다.
