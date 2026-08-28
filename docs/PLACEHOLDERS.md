# 운영 전 채워야 하는 값 목록

플레이스홀더는 `{{...}}` 형태로 표시되어 있습니다. 아래 값을 확정한 뒤 해당 위치를 교체하세요.

## 1. `frontend/src/config/site.ts` (대부분 여기 한 곳)

| 플레이스홀더 | 설명 | 예시 |
| --- | --- | --- |
| `{{CENTER_NAME}}` | 센터 상호명 | 햇살주간보호센터 |
| `{{TEL}}` | 대표 전화번호 (표시용) | 031-000-0000 |
| `{{TEL_RAW}}` | 전화 걸기용 번호 (하이픈 없이) | 0310000000 |
| `{{FAX}}` | 팩스번호 | 031-000-0001 |
| `{{EMAIL}}` | 대표 이메일 | center@example.com |
| `{{ADDRESS}}` | 전체 주소 | 경기도 ○○시 ○○구 ○○로 123, 2층 |
| `{{POSTAL_CODE}}` | 우편번호 | 12345 |
| `address.lat` / `address.lng` | 카카오맵 표시 좌표 | 37.5665 / 126.9780 |
| `{{BUS_INFO}}` / `{{SUBWAY_INFO}}` | 대중교통 안내 | 000번 ○○정류장 하차 |
| `{{KAKAO_CHANNEL_URL}}` | 카카오톡 채널 주소 | http://pf.kakao.com/_xxxxx |
| `{{KAKAO_MAP_JS_KEY}}` | 카카오 개발자 콘솔 JavaScript 키 | (32자리 키) |
| `{{NAVER_PLACE_URL}}` | 네이버 스마트플레이스 주소 | |
| `{{CEO_NAME}}` | 센터장(대표자) 성함 | |
| `{{BUSINESS_NAME}}` | 사업자등록상 기관명 | |
| `{{BUSINESS_NO}}` | 사업자등록번호 | |
| `{{INSTITUTION_NO}}` | 장기요양기관 기호 | |
| `{{DOMAIN}}` | 배포 도메인 (OG 태그 절대 URL) | example.com |

> 카카오맵 키를 넣기 전까지 오시는길 지도는 안내 문구로 대체 표시됩니다.

## 2. 콘텐츠 (더미 → 실제)

| 위치 | 내용 |
| --- | --- |
| `frontend/src/api/dummyData.ts` → `feeTable` | **등급별 실제 수가·본인부담금** (현재 2026년 예시 값) |
| `frontend/src/api/dummyData.ts` → `programs` | 실제 운영 프로그램 목록 |
| `frontend/src/api/dummyData.ts` → `facilities` | 실제 시설 목록 |
| `frontend/src/api/dummyData.ts` → `dailySchedule` | 실제 하루 일과 시간 |
| `frontend/src/pages/AboutPage.tsx` → `history`, `staff` | 센터 연혁, 직원 정보 (`{{STAFF_1}}` 등) |
| `frontend/src/pages/AboutPage.tsx` → 인사말 본문 | 센터장 인사말 원고 |
| 사진 전체 | 히어로 3장, 시설 사진, 프로그램 사진, 활동앨범 사진 (WebP 권장) |
| `frontend/src/pages/PrivacyPage.tsx` | `{{SMS_VENDOR}}`, `{{PRIVACY_EFFECTIVE_DATE}}` 및 내용 최종 검토 |

### 사진 넣는 방법

1. 이미지를 `frontend/public/images/` 에 저장 (예: `hero-1.webp`)
2. 데이터의 이미지 필드를 `/images/hero-1.webp` 처럼 `/`로 시작하는 경로로 교체
3. `/` 또는 `http`로 시작하지 않는 값은 자리표시 그라데이션으로 표시됩니다

## 3. 환경변수 (`.env` — 커밋 금지)

`.env.example`을 복사해 사용합니다.

| 키 | 설명 | 필요 Phase |
| --- | --- | --- |
| `MYSQL_*` | 로컬 MySQL 계정/DB명 | 0-B |
| `DB_URL` / `DB_USERNAME` / `DB_PASSWORD` | 백엔드 DB 접속 정보 | 2 |
| `JWT_SECRET` | 관리자 JWT 서명 키 (임의 32자 이상) | 4 |
| `SOLAPI_API_KEY` / `SOLAPI_API_SECRET` | SOLAPI API 키 | 3 |
| `SMS_FROM` | SOLAPI에 **사전 등록된** 발신번호 | 3 |
| `SMS_ADMIN_PHONE` | 알림 문자를 받을 관리자(원장) 번호 | 3 |
| 관리자 초기 계정 | 최초 로그인 후 비밀번호 변경 강제 | 4 |

## 4. 외부 서비스 준비 체크리스트

- [ ] 센터 상호명 확정
- [ ] 가비아 도메인 구매 (.com 또는 .co.kr)
- [ ] AWS Lightsail 인스턴스 생성 (2GB RAM 이상 권장)
- [ ] SOLAPI 가입 → 발신번호 등록(통신서비스 이용증명원 필요할 수 있음) → API 키 발급 → 소액 충전
- [ ] 카카오 개발자 콘솔에서 지도 JavaScript 키 발급
- [ ] 카카오톡 채널 개설 (상담 버튼 연결, 추후 알림톡 확장 대비)
- [ ] 사업자 등록 후 푸터 기관 정보 기재
- [ ] 네이버 스마트플레이스 / 구글 비즈니스 프로필 등록 (지역 검색 유입이 가장 큼)
- [ ] 개인정보처리방침 수집 항목·보유 기간 최종 검토
