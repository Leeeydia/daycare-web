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
