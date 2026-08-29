# frontend

React 18.3 + TypeScript + Vite 기반 공개 웹사이트입니다.

## 실행

```bash
npm install
npm run dev     # 개발 서버 http://localhost:5173
npm run build   # 타입체크 + 프로덕션 빌드 (dist/)
npm run lint
```

## 디렉터리

```
src/
├── config/site.ts     센터명·전화번호·주소·운영시간 등 모든 센터 정보 (플레이스홀더)
├── api/               axios 인스턴스, 도메인별 API 함수, 더미 데이터
│   ├── client.ts        공통 axios 인스턴스 + USE_DUMMY 플래그
│   ├── dummyData.ts     Phase 1용 더미 콘텐츠 (Phase 2에서 API로 교체)
│   └── types.ts         백엔드 도메인과 대응하는 타입
├── components/
│   ├── common/        Header, Footer, FloatingButtons, ConsultBanner, Layout, Seo, KakaoMap 등
│   └── ui/            Button, Card, SectionTitle, Photo, Lightbox, Form 등 기본 UI
├── pages/             라우트별 페이지 (default export)
├── hooks/
├── utils/format.ts    전화번호 하이픈, 이름 마스킹, 날짜/금액 포맷
└── styles/index.css   Tailwind + 전역 스타일
```

## 규칙

- 컴포넌트는 함수형 + named export, 페이지 컴포넌트만 default export
- 모바일 우선 반응형 (`sm:640 / md:768 / lg:1024 / xl:1280`)
- 주 이용자가 40~60대 보호자 → 기본 폰트 17px, 터치 영역 44px 이상, 높은 대비
- 애니메이션은 `prefers-reduced-motion` 존중 (`FadeIn` 컴포넌트가 처리)
- 이미지는 `Photo` 컴포넌트 사용. `src`가 `/` 또는 `http`로 시작하면 실제 이미지, 그 외 문자열은 자리표시 라벨

## API 연동 (Phase 2)

`src/api/client.ts`의 `USE_DUMMY`를 `false`로 바꾸면 더미 대신 실제 API를 호출합니다.
개발 서버는 `/api` 요청을 `http://localhost:8080`으로 프록시합니다 (`vite.config.ts`).

## 배포 (Vercel)

Vercel 프로젝트의 **Root Directory를 `frontend`로** 지정한다. 나머지 설정은 `vercel.json`이 담당한다.

- `rewrites` — SPA 라우팅. 없으면 `/about` 같은 주소를 새로고침할 때 404가 난다
- `X-Robots-Tag: noindex, nofollow` — **검토용 미리보기 배포의 검색엔진 노출 차단**
- `/assets/*` 장기 캐시 — 파일명에 해시가 붙으므로 안전하다

> `vercel.json`은 순수 JSON이라 주석을 넣을 수 없고, 스키마에 없는 키(`comment` 등)를 쓰면
> 배포가 거부된다.

### 실제 오픈 시 해제할 것

1. `vercel.json`의 `X-Robots-Tag` 헤더 제거
2. `public/robots.txt`의 `Disallow: /` 제거 후 `sitemap.xml` 경로 추가 (Phase 5)
3. `src/config/site.ts`의 `domain`을 실제 도메인으로 교체 (OG 태그·canonical에 사용)
