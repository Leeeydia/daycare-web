# backend

Spring Boot 3.5 + Java 21 API 서버입니다.

> **현재 상태**: 패키지 구조만 생성되어 있습니다. Java 21이 설치되어 있지 않아 Gradle 스캐폴드는 아직 생성하지 않았습니다.
>
> ```bash
> brew install --cask temurin@21
> java -version   # 21.x 확인
> ```
>
> 설치 후 Phase 0-B(백엔드 초기화) → Phase 2(도메인·API)를 진행합니다.

## 예정 구조

```
src/main/java/com/daycare/
├── domain/
│   ├── consult/      상담신청  (controller / service / repository / entity / dto)
│   ├── notice/       공지사항
│   ├── program/      프로그램
│   ├── gallery/      활동앨범
│   ├── qna/          온라인 문의
│   ├── job/          채용공고 · 구직신청
│   ├── meal/         주간 식단표
│   └── admin/        관리자 계정 · 인증
├── global/
│   ├── config/       공통 설정 (CORS, Async, Web)
│   ├── security/     Spring Security + JWT
│   ├── exception/    전역 예외 처리, 에러코드 enum
│   └── sms/          SmsSender 인터페이스 / SolapiSmsSender / FakeSmsSender
└── DaycareApplication.java

src/main/resources/db/migration/   Flyway 마이그레이션 (V1__init.sql ...)
```

## 규칙

- API base path `/api/v1`, 관리자 API는 `/api/v1/admin/**` + JWT Bearer
- 응답 포맷 `{ "success": true, "data": {...}, "error": null }`
- Entity에 `@Setter` 금지 — 생성자/정적 팩토리 + 의도가 드러나는 변경 메서드
- DTO는 record, Entity 직접 노출 금지
- 조회 트랜잭션은 `@Transactional(readOnly = true)`
- DB 스키마 변경은 반드시 Flyway 마이그레이션 파일(`V{n}__desc.sql`)로
- 공개 POST 엔드포인트는 IP당 분당 5회 rate limit
- 로그에 전화번호를 남기지 않는다

## 실행 (초기화 후)

```bash
docker compose up -d mysql   # 프로젝트 루트에서
cd backend
chmod +x gradlew
./gradlew bootRun
./gradlew test
```
