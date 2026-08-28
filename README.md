# 주간노인복지센터 홈페이지

주간보호(데이케어) 센터 홍보 및 **무료 상담 신청 전환**을 목표로 하는 실운영 웹사이트입니다.
상호명이 확정되지 않아 코드와 문구에서는 `{{CENTER_NAME}}` 플레이스홀더를 사용합니다.

## 현재 진행 상황

| Phase | 내용 | 상태 |
| --- | --- | --- |
| 0-A | 폴더 구조 | ✅ 완료 |
| 0-B | 프론트엔드 초기화 (Vite/React/TS/Tailwind) | ✅ 완료 |
| 0-B | 백엔드 초기화 (Spring Boot) | ⏸ 대기 — Java 21 설치 필요 |
| 1 | 공개 페이지 전체 (더미 데이터, 반응형) | ✅ 완료 |
| 2 | 백엔드 도메인 + 공개 API + 프론트 연동 | ⬜ |
| 3 | SOLAPI 문자 알림 | ⬜ |
| 4 | 관리자 페이지 | ⬜ |
| 5 | 배포 준비 (nginx / HTTPS / Lightsail) | ⬜ |

## 기술 스택

- **Frontend** React 18.3 + TypeScript 5.6 + Vite 5.4 / Tailwind CSS 3.4 / React Router 6 / TanStack Query 5 / React Hook Form + Zod / Framer Motion / Swiper 11 / react-helmet-async
- **Backend** Spring Boot 3.5 + Java 21 / Spring Data JPA / Spring Security / Flyway / MySQL 8
- **Infra** Docker Compose (nginx / spring-app / mysql), Let's Encrypt, AWS Lightsail

## 로컬 실행 (macOS + zsh)

### 사전 설치

```bash
brew install --cask temurin@21   # Java 21 (백엔드 개발 시 필요)
brew install node@20             # Node 20 LTS
brew install --cask docker       # Docker Desktop (MySQL 실행용)
```

### 프론트엔드 (지금 바로 실행 가능)

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

빌드/검사:

```bash
npm run build      # 타입체크 + 프로덕션 빌드
npm run lint
```

### MySQL (백엔드 작업 시)

```bash
docker compose up -d mysql
```

### 백엔드 (Phase 0-B 잔여 작업)

```bash
cd backend
chmod +x gradlew
./gradlew bootRun  # http://localhost:8080
```

## 운영 전 채워야 하는 값

`frontend/src/config/site.ts` 한 곳에서 관리합니다. 자세한 목록은 [docs/PLACEHOLDERS.md](docs/PLACEHOLDERS.md) 참고.

## 문서

- [docs/PLACEHOLDERS.md](docs/PLACEHOLDERS.md) — 직접 채워야 하는 값 목록
- [docs/](docs/) — ERD, API 명세, 배포 가이드 (Phase 2 이후 작성)
