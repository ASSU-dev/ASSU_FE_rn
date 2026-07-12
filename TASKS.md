# taegeon2 작업 체크리스트

담당자: taegeon2  
API 명세서: `openapi/oepnapi.json`

---

## 작업 현황

### 신고 (Report)

- [ ] 공통 신고 다이얼로그 API 연동 (`POST /reports`, `POST /reports/students`)

### 학생 대시보드

- [x] 건의함 작성 API 연동 (`POST /suggestion`, `GET /suggestion/admin`)
- [x] 이용한 제휴 내역 API 연동 (`GET /students/partnerships/{year}/{month}`)
- [ ] 내 리뷰 목록 API 연동 (`GET /reviews/student`)

### 관리자 대시보드

- [ ] 통계 카드 API 연동 (`GET /admin/dashBoard`, `/countUser`, `/new`, `/top`)
- [ ] 이용 현황 목록 API 연동 (`GET /admin/dashBoard/usage`)
- [ ] 제휴 건의함 목록 API 연동 (`GET /suggestion/list`) // 관리자가 받은 건의 목록

### 제휴업체 대시보드

- [ ] 통계 UI 구현 (미착수) -> 기획 보고 수정 예정
- [ ] 통계 API 연동 (`GET /store/ranking/weekly`)
- [ ] 고객 리뷰 목록 API 연동 (`GET /reviews/store/{storeId}`, `GET /reviews/average`)

### 맵 (최후반 — 네이티브 전환 후 진행)

- [ ] 주변 가게 목록 API 연동 (`GET /map/nearby`)
- [ ] 가게 검색 API 연동 (`GET /map/search`, `GET /map/place`)

> 맵은 현재 WebView 기반 임시 구현. 네이티브 전환 시 팀 전체 EAS dev client 전환 필요 (팀 회의 필요).

---

## 완료 항목

### 학생

- [x] 제휴 건의함 UI
- [x] 이용한 제휴 내역 UI
- [x] 내 리뷰 목록 UI

### 관리자

- [x] 대시보드 통계 UI
- [x] 제휴 건의함 UI

### 제휴업체

- [x] 고객 리뷰 목록 UI

### 공통

- [x] 신고 다이얼로그 UI
- [x] 맵 탭 UI (학생/관리자/제휴업체)
- [x] 가게 검색 UI
- [x] 카카오맵 WebView 연동 // 네이티브로 수정 예정
