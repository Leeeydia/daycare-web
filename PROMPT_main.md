# Claude Code 실행 프롬프트 — 주간노인복지센터 홈페이지

> 사용법: 빈 프로젝트 폴더에 CLAUDE.md를 먼저 넣고, 아래 프롬프트를 Phase 단위로 순서대로 Claude Code에 입력한다.
> 한 번에 전부 넣지 말고 Phase별로 진행 → 확인 → 다음 Phase로 넘어가는 것을 권장.
> 개발 환경: macOS

---

## 사전 준비 — 맥 개발 환경 세팅 (터미널에서 직접 실행)

Claude Code 실행 전에 아래를 먼저 설치한다. 이미 설치된 건 건너뛴다.

```bash
# Homebrew (없으면 먼저 설치 — 설치 후 안내에 따라 PATH 등록)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# git (Xcode Command Line Tools에 포함돼 있으면 생략 가능)
brew install git

# Java 21 LTS (Temurin)
brew install --cask temurin@21

# Node.js 20 LTS (keg-only라 PATH 등록 필요)
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Docker Desktop for Mac
brew install --cask docker
```

설치 후 **새 터미널 창**을 열고 확인:

```bash
git --version
java -version     # 21.x
node -v           # v20.x (LTS가 22로 잡히면 그대로 써도 무방)
docker --version  # Docker Desktop 앱을 한 번 실행해 고래 아이콘이 뜬 뒤 확인
```

Claude Code 설치:

```bash
npm install -g @anthropic-ai/claude-code
```

프로젝트 폴더 생성 후 CLAUDE.md를 넣고 그 폴더에서 `claude`를 실행한다.
경로에 한글·공백이 없어야 한다.

```bash
mkdir -p ~/dev/daycare-web && cd ~/dev/daycare-web
# CLAUDE.md를 이 폴더에 복사 (Finder로 옮겨도 됨)
git config --global core.autocrlf input   # 줄바꿈 문제 예방 (한 번만)
claude
```

---

## Phase 0-A — 폴더 구조 먼저 잡기

```
CLAUDE.md를 읽어줘. 코드는 아직 작성하지 말고, 프로젝트 뼈대(폴더 구조)만 먼저 만들어줘.

1. 개발 환경 확인부터: java -version(21), node -v, docker --version, docker 데몬 동작 여부를
   체크하고 문제가 있으면 진행 전에 알려줘. 환경은 macOS + zsh야.
2. CLAUDE.md의 디렉터리 구조 그대로 전체 폴더 트리를 생성해줘.
   - frontend/src 하위: config, api, components/common, components/ui, pages, hooks, styles
   - backend/src/main/java/com/daycare 하위: domain/{notice,consult,qna,job,program,gallery,meal,admin}
     각각에 controller/service/repository/entity/dto 패키지, global/{config,security,exception,sms}
   - docs/, 루트에 docker-compose.yml·docker-compose.prod.yml 자리(빈 파일 X, 아직 만들지 않음)
3. 빈 폴더가 git에 잡히도록 필요한 곳에 .gitkeep 추가.
4. 각 최상위 폴더(frontend, backend, docs)에 해당 영역의 역할과 하위 구조 설명을 담은
   짧은 README.md 생성.
5. .gitignore(node_modules, build, .env, application-prod.yml, .DS_Store 등)와
   .gitattributes(*.sh와 gradlew는 eol=lf, 윈도우 협업 대비 *.bat는 eol=crlf) 작성.
6. git init 후 "chore: 프로젝트 폴더 구조 생성" 커밋.

완료되면 전체 폴더 구조를 트리 형태로 출력해서 보여주고, 내 의도와 다른 부분이 없는지
확인받은 뒤 멈춰줘.
```

구조 확인 후 마음에 들면 Phase 0-B로 진행.

---

## Phase 0-B — 프로젝트 초기화

```
확정된 폴더 구조 위에 실제 프로젝트를 초기화해줘. 기존 구조를 임의로 바꾸지 마.
환경은 macOS + zsh니 명령은 셸(zsh) 문법으로, gradlew는 ./gradlew로 실행해 (실행 권한 없으면 chmod +x gradlew).

1. frontend: Vite + React 18.3 + TypeScript 템플릿을 frontend/에 생성(기존 폴더 구조와 병합),
   Tailwind CSS 3.4, React Router v6, TanStack Query v5, Axios, React Hook Form + Zod,
   Framer Motion, Swiper, react-helmet-async 설치.
   src/config/site.ts에 센터 정보 플레이스홀더({{CENTER_NAME}}, 전화번호, 주소, 운영시간,
   카카오채널 URL)를 상수로 정의해줘.
2. backend: Spring Boot 3.5.x + Java 21 Gradle 프로젝트를 backend/에 생성.
   start.spring.io API로 스캐폴드를 받아 병합하고 Gradle Wrapper(gradlew) 포함·실행 권한 확인.
   Web, Data JPA, Security, Validation, Flyway, MySQL Driver, Lombok 의존성 추가.
   application.yml을 local/prod 프로필로 분리하고 prod는 환경변수 참조로 작성.
   공통 응답 포맷(ApiResponse), 전역 예외 처리(@RestControllerAdvice), 에러코드 enum 뼈대 작성.
3. 루트 docker-compose.yml 작성(로컬용 mysql 8.0만, 볼륨 영속화, 포트 3306).
4. 루트 README.md에 맥 기준 로컬 실행 방법 정리 후 커밋.

완료 후 docker compose up -d mysql → backend ./gradlew bootRun → frontend dev 서버까지
셋 다 정상 기동되는 걸 확인하고 결과를 보여줘.
```

---

## Phase 1 — 공개 페이지 레이아웃 + 정적 콘텐츠 (더미 데이터)

```
공개 사이트의 전체 화면을 더미 데이터로 먼저 완성해줘. 반응형(모바일 우선) 필수.
디자인 방향: 시니어 케어 업종에 맞는 따뜻하고 신뢰감 있는 톤(밝은 배경, 포인트 컬러 1개),
40~60대 보호자가 주 이용자이므로 큰 글자(기본 16px+), 높은 대비, 넉넉한 터치 영역.
참고 사이트 분위기: byl.im (콘텐츠 구성), visitingangels-djy.com (상담 유도 패턴).

공통 레이아웃:
- Header: 로고 + GNB(센터소개 / 이용안내 / 프로그램 / 활동앨범 / 알림마당 / 채용·구직).
  모바일은 햄버거 메뉴. 우측에 항상 보이는 "무료상담 신청" 강조 버튼.
- Footer: 센터 정보, 개인정보처리방침 링크, 사업자 정보 자리.
- FloatingButtons(모바일 하단 고정): 전화 바로걸기(tel:), 카카오톡 채널, 상담신청. 항상 노출.
- 모든 페이지 하단에 상담 유도 배너 섹션(ConsultBanner) 공통 삽입.

페이지 목록:
1. 메인(/)
   - 풀와이드 히어로 캐러셀(Swiper, 3장, 자동재생+페이드): 센터 슬로건 + "무료상담" CTA
   - 간편상담 섹션: 이름 + 연락처 + 개인정보동의 체크만 받는 폼(10초 신청 컨셉). 메인 상단 가까이 배치
   - 센터 핵심 강점 3~4개 카드 (스크롤 시 Framer Motion으로 순차 등장)
   - 프로그램 미리보기 캐러셀
   - 이용 절차 4단계 다이어그램(등급확인 → 상담 → 방문·체험 → 계약·이용)
   - 최근 공지 3개 + 활동앨범 최신 4장
2. 센터소개(/about): 대표(원장) 인사말, 센터 연혁/비전, 시설안내(사진 갤러리 그리드 + 라이트박스),
   직원 소개(선택), 오시는길(카카오맵 JS SDK 임베드 + 주소 복사 버튼 + 대중교통/주차 안내)
3. 이용안내(/guide):
   - 이용 대상/시간/절차
   - 하루 일과표(시간표 테이블)
   - 송영(차량 운행) 서비스 안내
   - 요양 등급별 이용요금표: 장기요양 등급(1~5등급, 인지지원등급)별 1일 수가,
     본인부담금(일반 15% / 감경 9%·6% / 기초수급 0%) 비교 테이블. 수치는 더미로 넣고
     "2026년 기준 예시, 상담 시 정확 안내" 문구 포함
   - 장기요양등급 가이드(등급이란, 신청 방법) 콘텐츠 페이지
4. 프로그램(/programs): 카테고리(인지활동/신체활동/여가/정서지원 등)별 프로그램 카드 목록
5. 활동앨범(/gallery): 사진 그리드 + 카테고리 필터 + 상세(이미지 캐러셀)
6. 알림마당: 공지사항(/notices) 목록·상세, 식단표(/meals) 주간 식단, QnA(/qna) 목록·작성·상세
7. 채용·구직(/jobs): 채용공고 목록·상세 + "구직 신청하기" 폼 페이지
8. 상담신청(/consult): 상세 상담 폼(이름, 연락처, 어르신 등급 보유 여부 선택, 문의내용, 개인정보동의)
9. 개인정보처리방침(/privacy)

SEO: 페이지별 title/description/OG 태그, 시맨틱 마크업.
완료 후 모바일(375px)/태블릿/데스크톱에서 레이아웃 확인 스크린샷 찍어줘.
```

---

## Phase 2 — 백엔드 도메인 + 공개 API

```
CLAUDE.md의 도메인 모델대로 백엔드를 구현해줘. Flyway V1 마이그레이션으로 전체 스키마 생성.

도메인: Consult, Notice, Program, GalleryPost, Qna, JobPosting, JobApplication, MealPlan, Admin

공개 API (/api/v1):
- POST /consults : 상담 신청 (간편/상세 공용. name, phone 필수, privacyAgreed=true 검증,
  phone 형식 검증 010-XXXX-XXXX 정규화)
- GET /notices, GET /notices/{id} (조회수 증가), GET /programs, GET /gallery, GET /gallery/{id}
- GET /meals/current : 이번 주 식단
- POST /qna (비밀글 비밀번호 BCrypt), GET /qna, GET /qna/{id} (비밀글은 비밀번호 확인 API 별도)
- GET /jobs, GET /jobs/{id}, POST /job-applications
- 공개 POST 엔드포인트 전부 IP 기준 분당 5회 rate limit (간단한 인메모리 버킷으로 구현)

파일 업로드: 이미지 업로드 API(관리자용, 다음 Phase에서 사용) — 로컬 디스크 /uploads 저장,
nginx로 서빙할 수 있게 경로 설계. 확장자/용량(5MB) 검증.

각 도메인 서비스 단위 테스트 작성. 완료 후 프론트의 더미 데이터를 실제 API 연동으로 교체해줘
(TanStack Query 사용, 로딩/에러 상태 처리 포함).
```

---

## Phase 3 — SMS 알림 (SOLAPI)

```
상담 신청/구직 신청이 들어오면 관리자(원장) 휴대폰으로 문자가 오도록 구현해줘.

- SmsSender 인터페이스 정의 → SolapiSmsSender 구현 (SOLAPI 공식 Java SDK: net.nurigo:sdk)
- 환경변수: SOLAPI_API_KEY, SOLAPI_API_SECRET, SMS_FROM(발신번호), SMS_ADMIN_PHONE(수신번호)
- 발송 시점: 상담/구직 신청 트랜잭션 커밋 이후 @Async로 발송. 발송 실패해도 신청 저장은 유지,
  실패는 로그 + DB에 발송상태 기록
- 문자 내용 예시(90byte 이내 SMS 우선):
  "[{{CENTER_NAME}}] 새 상담신청\n홍*동 010-1234-5678"  ← 이름은 가운데 마스킹
- 로컬/테스트 환경에서는 실제 발송 대신 콘솔 로그로 대체되는 FakeSmsSender를 프로필로 분리
- 알리고로 교체 가능하도록 SmsSender 구현체만 갈아끼우면 되는 구조 유지

SOLAPI 계정에서 발신번호 사전 등록이 필요하다는 점을 README에 체크리스트로 적어줘.
```

---

## Phase 4 — 관리자 페이지

```
관리자 기능을 구현해줘. 경로는 /admin, 프론트 같은 React 앱 내 라우트로 분리(별도 레이아웃).

인증:
- POST /api/v1/admin/login → JWT(Access 30분 + Refresh 14일, httpOnly 쿠키) 
- Spring Security로 /api/v1/admin/** 보호. 로그인 실패 5회 시 10분 잠금
- 초기 관리자 계정은 Flyway 시드 or 환경변수로 생성, 최초 로그인 시 비밀번호 변경 강제

관리자 화면:
1. 대시보드: 신규 상담 수, 미답변 QnA 수, 신규 구직신청 수 카드
2. 상담신청 관리: 목록(상태 필터: 신규/연락완료/종결), 상태 변경, 메모 작성, 엑셀 다운로드
3. 공지사항 CRUD: 에디터(Toast UI Editor)로 작성, 이미지 업로드, 상단 고정 설정
4. 프로그램 CRUD, 활동앨범 CRUD(다중 이미지 업로드), 식단표 등록(주 단위)
5. QnA 답변 작성/수정
6. 채용공고 CRUD(모집중/마감 토글), 구직신청 목록·상태 관리
7. 사이트 설정: 센터 전화번호·주소·운영시간 등 site 설정 DB화 후 수정 화면(선택)

완료 후 전체 플로우 통합 테스트: 공개 폼 제출 → 문자 로그 확인 → 관리자에서 확인·처리.
```

---

## Phase 5 — 배포 준비

```
운영 배포를 준비해줘. 대상: AWS Lightsail Ubuntu 22.04 단일 인스턴스, 도메인은 가비아에서
구매해 A 레코드로 연결 예정.

1. frontend 프로덕션 빌드 → nginx가 정적 서빙 + /api는 spring으로 프록시하는 구성
2. docker-compose.prod.yml: nginx / spring-app(멀티스테이지 Dockerfile) / mysql(볼륨 영속화)
3. Let's Encrypt(certbot) HTTPS 설정 + HTTP→HTTPS 리다이렉트, www→루트 도메인 통일
4. MySQL 일일 백업 스크립트(cron, 7일 보관) 작성
5. 보안 점검: CORS 운영 도메인만 허용, 시크릿 전부 환경변수화, actuator 외부 차단,
   업로드 디렉터리 실행권한 제거, 관리자 경로 robots.txt 차단
6. SEO 마무리: sitemap.xml, robots.txt, 네이버 서치어드바이저/구글 서치콘솔 등록용 메타태그 자리
7. docs/DEPLOY.md 작성: Lightsail 인스턴스 생성 → 도커 설치 → 가비아 DNS 설정(A 레코드)
   → 인증서 발급 → 배포 명령까지 처음 하는 사람 기준 단계별 가이드

마지막으로 내가 직접 채워야 하는 값 목록(센터명, 전화번호, 주소, SOLAPI 키, 발신번호,
도메인명, 관리자 초기 비밀번호)을 한 곳에 정리해서 알려줘.
```

---

## 운영 시작 전 체크리스트 (직접 할 일)

- [ ] 가비아에서 도메인 구매 (.com 또는 .co.kr)
- [ ] AWS Lightsail 인스턴스 생성 (2GB RAM 이상 권장)
- [ ] SOLAPI 가입 → 발신번호 등록(통신서비스 이용증명원 필요할 수 있음) → API 키 발급 → 소액 충전
- [ ] 센터 상호명 확정 → site.ts / 환경변수 일괄 교체
- [ ] 시설 사진, 프로그램 사진, 대표 인사말 원고, 요금표 실제 수가 준비
- [ ] 개인정보처리방침 내용 검토 (수집 항목·보유 기간)
- [ ] 카카오 지도 JavaScript 키 발급 (카카오 개발자 콘솔)
- [ ] 카카오톡 채널 개설 (상담 버튼 연결용, 추후 알림톡 확장 시에도 필요)
- [ ] 사업자 등록 후 푸터에 사업자 정보 기재 (전자상거래는 아니지만 신뢰도용)
- [ ] 네이버 스마트플레이스 / 구글 비즈니스 프로필 등록 (지역 검색 유입이 실제로 가장 큼)
