# 테스트 코드 현황

프로젝트 전체 기능 테스트의 누적 현황입니다. `assu-test` 또는 `assu-test-implementation`으로 테스트를 추가·수정하면, 회원가입·지도 검색·리뷰 등 기능 구분 없이 해당 행을 추가하거나 갱신합니다.

이 문서는 테스트 적용 현황을 관리합니다. 성공한 Jest 실행과 변경 내역은 [`test-run-log.md`](./test-run-log.md)에 별도로 기록합니다. 실패하거나 중단한 실행은 누적 실행 기록에 남기지 않고 작업 결과로 보고합니다.

| 기능 | 우선순위 | 계층 | 테스트 대상 / 보호하는 규칙 | 테스트 파일 | 작성자 | 날짜 |
| --- | --- | --- | --- | --- | --- | --- |
| 관리자 홈 | 높음 | 컴포넌트 | 제휴 목록 상위 3개 표시, 전체보기·상세 이동, 추천 업체 문의 시 관리자 역할과 업체 ID 전달 | `src/pages/admin/home/ui/AdminHomePage.test.tsx` | chunjaemin | 2026-10-07 |
| 제휴업체 홈 | 높음 | 컴포넌트 | 제휴 목록 상위 3개 표시, 전체보기·상세 이동, 추천 단체 문의 시 제휴업체 역할과 관리자 ID 전달 | `src/pages/partner/home/ui/PartnerHomePage.test.tsx` | chunjaemin | 2026-10-07 |
| 제휴 목록 위젯 | 높음 | 컴포넌트 | 최대 항목 수, 빈 목록·로딩·오류 상태, 목록이 없을 때 전체보기 숨김 | `src/widgets/partnership-list/ui/PartnershipListWidget.test.tsx` | chunjaemin | 2026-10-07 |
| QR 매장 인식·제휴 인증 API | 높음 | 단위 | 숫자·JSON·URL·경로 QR의 매장 번호 인식과 잘못된 번호 차단, 인원 조건 2명 이상이면 단체 혜택, 불완전 혜택 제외, 개인 인증·단체 세션 생성 요청과 실패 처리 | `src/features/partnership-auth/api/partnershipAuth.test.ts` | chunjaemin | 2026-10-31 |
| 단체 인증 QR·진행 구독 | 높음 | 단위·훅 | 단체 인증 딥링크 생성↔인식, 스킴·경로·필드 검증 실패 차단, 진행 인원 갱신·완료 처리, 정상 인증 사용자 목록에 본인이 없으면 1회 안내 후 홈 복귀 (EXPIRED 처리는 미구현으로 제외) | `src/features/partnership-auth/api/useGroupCertificationSocket.test.ts` | chunjaemin | 2026-10-31 |
| QR 인증 화면 | 높음 | 컴포넌트 | 단체 QR은 참여자로 세션 합류, 매장 QR은 혜택 선택 이동, 잘못된 QR 안내 후 재스캔, 프레임 밖 QR 무시, 카메라 권한 거부 시 설정 안내 | `src/pages/student/partnership-qr-auth/ui/PartnershipQrAuthPage.test.tsx` | chunjaemin | 2026-10-31 |
| 제휴 혜택 선택 | 높음 | 컴포넌트 | 개인 혜택은 개인 인증 후 확인 화면 이동, 단체 혜택은 인원 조건으로 세션 생성 후 대표자 QR 화면 이동, 인증 요청 실패 시 안내 후 이동 차단 | `src/pages/student/partnership-benefit-select/ui/PartnershipBenefitSelectPage.test.tsx` | chunjaemin | 2026-10-31 |
| 학생 가게 상세 | 높음 | 컴포넌트 | 로딩·에러 상태 분기, EXTERNAL 가게 자동 리다이렉트, 혜택 미선택 시 제휴 인증 버튼 비활성, 선택 후 storeId·contentId 전달 | `src/widgets/store-detail/ui/StoreDetailWidget.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 가게 상세 데이터 훅 | 높음 | 훅 | store/papers 쿼리 로딩·에러 조합, 혜택 선택 시 selectedBenefit 참조 갱신, title fallback (storeName → fallbackName → "") | `src/widgets/store-detail/model/useStoreDetailData.test.ts` | KimEunHye | 2026-10-31 |
| 학생 가게 리스트 | 높음 | 컴포넌트 | 빈 상태 메시지, 가게 상세 이동 파라미터, 혜택 라벨 포매팅 (HEADCOUNT/PRICE/note fallback) | `src/widgets/home/ui/StudentStoreListWidget.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 홈 탭 섹션 | 높음 | 컴포넌트 | 카테고리 10개 노출, 이벤트 탭 전환 시 스탬프 보드 노출, 카테고리 선택 시 store-list로 category 파라미터 전달 | `src/widgets/home/tab-section/ui/HomeTabSection.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 홈 메인 | 중간 | 컴포넌트 | 인사말 이름 노출, 큐레이션 로딩 전파, 큐레이션 2개 그룹 각각 올바른 섹션에 전달, 스탬프 카운트 전달 | `src/widgets/home/ui/StudentHomeWidget.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 홈 광고 리스트 | 중간 | 컴포넌트 | 광고 없을 때 섹션 숨김, 로딩 중 ActivityIndicator 유지, 광고 선택 시 storeName을 쿼리 문자열로 담아 상세 이동 | `src/widgets/home/ad-list/ui/HomeAdList.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 홈 큐레이션 섹션 | 중간 | 컴포넌트 | 로딩·빈 상태 분기, 큐레이션 가게 선택 시 상세 이동, curationTitle·groupTitle 조합 노출 | `src/widgets/home/curation-section/ui/HomeCurationSection.test.tsx` | KimEunHye | 2026-10-31 |
| 학생 지도 | 높음 | 단위 | 주변 매장 응답의 지도 마커 변환, id·이름·좌표 누락 시 마커 제외, 미정의 카테고리·제휴 여부 누락 처리 | `src/features/map-search/lib/mapSearchMappers.test.ts` | taegeon2 | 2026-11-01 |
| 학생 지도 | 높음 | 단위 | 매장 카드 대표 혜택·학생회, 추가 혜택 개수, 혜택 문구 조건·강조 분리, 거리 m/km 표기 | `src/entities/store/lib/mapDisplay.test.ts` | taegeon2 | 2026-11-01 |
| 학생 지도 | 높음 | 훅 | 위치 권한 허용 시 현재 위치, 거부 시 숭실대 기본 위치, 재요청 불가 시 설정 안내 | `src/widgets/map/model/useUserLocation.test.tsx` | taegeon2 | 2026-11-01 |
| 학생 지도 | 중간 | 훅 | 겹친 매장 2개 이상일 때만 묶음 목록 열기, 필터 변경·매장 감소 시 자동 닫기 | `src/widgets/map/model/useClusterStores.test.tsx` | taegeon2 | 2026-11-01 |
| 학생 지도 | 중간 | 단위 | 카테고리·학생회 칩 선택, 같은 칩 재탭 시 해제, 초기화 | `src/features/map-filter/model/useMapFilterStore.test.ts` | taegeon2 | 2026-11-01 |
| 학생 지도 | 낮음 | 훅 | 지도 범위 없으면 조회 차단, 같은 필터 이동 시 기존 마커 유지, 필터 변경 시 이전 마커 제거 | `src/features/map-search/api/useMapSearch.test.tsx` | taegeon2 | 2026-11-01 |
| 학생 지도 | 낮음 | 단위 | 지도 중심 좌표의 주변 조회 범위(±0.01°) 변환 | `src/widgets/map/model/toViewport.test.ts` | taegeon2 | 2026-11-01 |
| 학생 지도 | 낮음 | 컴포넌트 | 선택 매장 카드 정보 표시, 본문 탭 시 상세 이동, 제휴 인증 탭 시 인증만 시작, 닫기 | `src/widgets/map/ui/StudentSelectedStoreCard.test.tsx` | taegeon2 | 2026-11-01 |

테스트를 처음 추가하는 기능 PR에서 첫 행을 기록합니다.

## 기록 규칙

- 하나의 테스트 파일이 여러 규칙을 다루면, 가장 높은 우선순위 기준으로 한 행에 기록한다.
- 테스트를 보강하면 새 행을 중복 추가하지 않고 기존 행의 테스트 대상, 파일, 작성자, 날짜를 갱신한다.
- 작성자는 현재 저장소의 `git config --get user.name` 값을 GitHub 사용자명으로 기록한다. 값이 없거나 불분명하면 사용자에게 확인한다.
- E2E는 도구와 실행 환경이 정해진 뒤 별도 현황으로 추가한다.
