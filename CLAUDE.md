# CLAUDE.md — 주간노인복지센터 홈페이지 프로젝트

## 프로젝트 개요
- 주간노인복지센터(데이케어센터) 홍보 + 상담 유입용 실운영 웹사이트
- 상호명 미정 → 코드/문구에서는 `{{CENTER_NAME}}` 플레이스홀더 사용, 설정 파일 한 곳(`frontend/src/config/site.ts`)에서 일괄 관리
- 핵심 목표: **무료 상담 신청 전환**. 모든 페이지에서 상담 신청으로 이어지는 동선 유지
- 참고 사이트: https://visitingangels-djy.com (간편상담 패턴), https://byl.im (콘텐츠 구성/구직 페이지)

## 기술 스택 (버전 고정 — 임의로 올리지 말 것)
### Frontend (`/frontend`)
- React 18.3.x + TypeScript 5.x + Vite 5.x
- Tailwind CSS 3.4.x
- React Router v6
- Framer Motion (스크롤 등장 애니메이션, 페이지 전환)
- Swiper 11.x (메인 히어로/활동앨범 캐러셀)
- TanStack Query v5 (서버 상태) + Axios
- React Hook Form + Zod (폼 검증)

### Backend (`/backend`)
- Spring Boot 3.5.x + Java 21 (LTS)
- Spring Web, Spring Data JPA, Spring Security (관리자 JWT 인증), Validation
- MySQL 8.0 / 로컬 개발은 동일하게 MySQL (H2 사용 금지 — 운영 DB와 동일 환경 유지)
- Flyway (DB 마이그레이션)
- 문자 발송: SOLAPI 공식 Java SDK (`net.nurigo:sdk`)
- 빌드: Gradle (Groovy DSL)

### Infra
- Docker Compose: nginx(리버스 프록시+정적 서빙) / spring-app / mysql
- HTTPS: Let's Encrypt (certbot)
- 배포 대상: AWS Lightsail Ubuntu 22.04 단일 인스턴스
- 도메인: 가비아 구매 → A 레코드로 서버 IP 연결

## 디렉터리 구조
```
/
├── CLAUDE.md
├── docker-compose.yml
├── docker-compose.prod.yml
├── frontend/
│   ├── src/
│   │   ├── config/site.ts        # 센터명, 전화번호, 주소, 운영시간 등 전부 여기
│   │   ├── api/                  # axios 인스턴스, API 함수
│   │   ├── components/
│   │   │   ├── common/           # Header, Footer, FloatingCallButton, ConsultBanner
│   │   │   └── ui/               # Button, Card, SectionTitle 등
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
├── backend/
│   └── src/main/java/com/daycare/
│       ├── domain/               # 도메인별 패키지: consult, notice, program, gallery, qna, job, meal, admin
│       │   └── {domain}/         # controller / service / repository / entity / dto
│       ├── global/               # config, security, exception, sms
│       └── DaycareApplication.java
└── docs/                         # ERD, API 명세, 배포 가이드
```

## API 규약
- Base path: `/api/v1`
- 공개 API는 인증 없음, 관리자 API는 `/api/v1/admin/**` + JWT Bearer
- 응답 포맷 통일:
```json
{ "success": true, "data": {...}, "error": null }
{ "success": false, "data": null, "error": { "code": "CONSULT_001", "message": "..." } }
```
- 예외는 `@RestControllerAdvice` 전역 처리, 도메인별 에러코드 enum 관리
- 목록 API는 페이지네이션 기본 (`page`, `size`, 기본 size=10)

## 코딩 규칙
### 공통
- 커밋 메시지: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` 컨벤션
- 주석/문서/UI 문구는 한국어, 코드 식별자는 영어
- 환경변수/시크릿은 절대 커밋하지 않음 (`.env`, `application-prod.yml`은 `.gitignore` + `*.example` 파일 제공)

### Frontend
- 컴포넌트는 함수형 + named export, 페이지 컴포넌트만 default export
- 반응형 breakpoint: 모바일 우선. `sm:640 / md:768 / lg:1024 / xl:1280`
- 주 이용자가 40~60대 보호자임을 고려: 기본 폰트 16px 이상, 명확한 대비, 큰 터치 영역(44px+)
- 이미지: WebP 우선, `loading="lazy"`, 히어로 이미지만 eager
- 애니메이션은 `prefers-reduced-motion` 존중
- SEO: react-helmet-async로 페이지별 title/description/OG 태그, 시맨틱 태그 사용

### Backend
- Entity에 `@Setter` 금지, 생성자/정적 팩토리 + 의도 드러나는 변경 메서드
- DTO는 record 사용, Entity 직접 노출 금지
- Service 계층에 트랜잭션 경계(`@Transactional`), 조회는 `readOnly = true`
- 문자 발송은 `SmsSender` 인터페이스로 추상화 → `SolapiSmsSender` 구현 (알리고 전환 대비)
- 문자 발송 실패가 상담 신청 저장을 실패시키면 안 됨: 저장 커밋 후 비동기(@Async) 발송 + 실패 로그
- Rate limiting: 상담/구직/QnA 등 공개 POST 엔드포인트는 IP당 분당 5회 제한 (스팸 방지)

## 도메인 모델 (핵심)
- **Consult** 상담신청: name, phone, memo(선택), status(NEW/CONTACTED/DONE), privacyAgreed, createdAt
- **Notice** 공지: title, content(HTML), pinned, viewCount, attachments
- **Program** 프로그램: name, description, imageUrl, category, sortOrder
- **GalleryPost** 활동앨범: title, images[], programCategory, createdAt
- **Qna** 문의: name, phone, password(비회원 글 확인용, BCrypt), question, answer(관리자), isSecret
- **JobPosting** 채용공고(관리자 작성): title, workType, payInfo, content, isOpen
- **JobApplication** 구직신청: name, phone, hasCertificate, preferredWorkType, memo, status
- **Admin** 관리자 계정: username, password(BCrypt), 최초 1개 계정 시드
- **MealPlan** 주간식단: weekStartDate, imageUrl 또는 요일별 텍스트

## 개인정보 처리 (필수 준수)
- 상담/구직/QnA 폼에 개인정보 수집·이용 동의 체크박스 필수 (미동의 시 제출 불가)
- 수집 항목 최소화: 이름, 연락처, 문의내용만
- 개인정보처리방침 페이지 필수 (푸터 링크)
- 전화번호는 DB 저장 시 그대로, 관리자 목록 화면 외 노출 금지. 로그에 전화번호 남기지 않음
- 상담 데이터 보존 기간 명시 (기본 1년 후 파기 안내)

## 개발 환경
- macOS 기준. Java 21(Temurin), Node 20 LTS, Docker Desktop for Mac, git(Homebrew 또는 Xcode CLT) 사용
- 터미널은 zsh 기준으로 명령 작성 (gradlew는 `./gradlew`, 실행 권한 없으면 `chmod +x gradlew`)
- git 줄바꿈: `git config --global core.autocrlf input` 설정 전제. `.gitattributes`로 `*.sh text eol=lf` 지정
- 경로에 한글/공백 없는 위치에 프로젝트 생성 (예: `~/dev/daycare-web`)

## 실행 명령
```bash
# 로컬 전체 실행
docker compose up -d mysql
cd backend && ./gradlew bootRun
cd frontend && npm run dev

# 테스트
cd backend && ./gradlew test
cd frontend && npm run build && npm run lint

# 운영 배포 (리눅스 서버에서)
docker compose -f docker-compose.prod.yml up -d --build
```

## 작업 방식
- 단계(Phase)별로 진행하며, 각 Phase 완료 시 실행 가능한 상태 유지
- 새 라이브러리 추가 전 반드시 사유 설명 후 진행
- DB 스키마 변경은 반드시 Flyway 마이그레이션 파일로 (`V{n}__desc.sql`)
- 프론트 더미 데이터로 먼저 화면 완성 → 백엔드 API 연동 순서
- 모르는 값(센터명, 전화번호, 주소, SOLAPI 키)은 하드코딩하지 말고 site.ts / 환경변수 플레이스홀더로 두고 목록 정리해서 알려줄 것
