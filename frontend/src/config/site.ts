/**
 * 센터 정보 단일 관리 파일.
 * 상호명·연락처·주소 등 확정되지 않은 값은 아래 플레이스홀더만 교체하면 사이트 전체에 반영된다.
 * TODO(운영 전 교체): CENTER_NAME, TEL, ADDRESS, BUSINESS, KAKAO_*, DOMAIN
 */

export const CENTER_NAME = '{{CENTER_NAME}}' // 예: 햇살주간보호센터
export const CENTER_NAME_SHORT = '{{CENTER_NAME}}'

export const site = {
  name: CENTER_NAME,
  shortName: CENTER_NAME_SHORT,
  slogan: '내 부모님처럼, 하루를 정성으로',
  description:
    `${CENTER_NAME}는 장기요양등급 어르신을 위한 주간보호(데이케어) 서비스를 제공합니다. ` +
    '인지활동·신체활동 프로그램, 안전한 송영 차량, 전문 요양보호사가 함께합니다.',

  /** 대표 연락처 — tel: 링크에는 telHref를 사용한다 */
  tel: '{{TEL}}', // 예: 031-000-0000
  telHref: 'tel:{{TEL_RAW}}', // 예: tel:0310000000
  fax: '{{FAX}}',
  email: '{{EMAIL}}',

  address: {
    full: '{{ADDRESS}}', // 예: 경기도 ○○시 ○○구 ○○로 123, 2층
    postalCode: '{{POSTAL_CODE}}',
    /** 카카오맵 표시용 좌표 — 실제 주소 확정 후 교체 */
    lat: 37.5665,
    lng: 126.978,
    parking: '건물 부설주차장 이용 가능 (상담 시 안내)',
    transport: [
      { type: '버스', desc: '{{BUS_INFO}}' },
      { type: '지하철', desc: '{{SUBWAY_INFO}}' },
    ],
  },

  hours: {
    weekday: '평일 08:00 ~ 20:00',
    saturday: '토요일 08:00 ~ 15:00',
    holiday: '일요일 · 법정공휴일 휴무',
    note: '이용 시간은 어르신 상황에 맞춰 조정 가능합니다.',
  },

  /** 외부 채널 */
  kakaoChannelUrl: '{{KAKAO_CHANNEL_URL}}', // 예: http://pf.kakao.com/_xxxxxx
  kakaoMapKey: '{{KAKAO_MAP_JS_KEY}}', // 카카오 개발자 콘솔 JavaScript 키
  naverPlaceUrl: '{{NAVER_PLACE_URL}}',
  blogUrl: '',

  /** 사업자/기관 정보 — 푸터 표기용 */
  business: {
    ceoName: '{{CEO_NAME}}',
    companyName: '{{BUSINESS_NAME}}',
    registrationNumber: '{{BUSINESS_NO}}', // 사업자등록번호
    institutionNumber: '{{INSTITUTION_NO}}', // 장기요양기관 기호
  },

  /** 배포 도메인 — OG 태그 절대 URL 생성에 사용 */
  domain: 'https://{{DOMAIN}}',

  /** 개인정보 보유 기간 — 폼 동의 문구와 처리방침에서 함께 참조 */
  privacyRetentionMonths: 12,
} as const

export const NAV_ITEMS = [
  {
    label: '센터소개',
    path: '/about',
    children: [
      { label: '인사말·비전', path: '/about#greeting' },
      { label: '시설안내', path: '/about#facility' },
      { label: '오시는 길', path: '/about#location' },
    ],
  },
  {
    label: '이용안내',
    path: '/guide',
    children: [
      { label: '이용 절차·하루 일과', path: '/guide#flow' },
      { label: '이용요금 안내', path: '/guide#fee' },
      { label: '장기요양등급 가이드', path: '/guide/grade' },
    ],
  },
  { label: '프로그램', path: '/programs' },
  { label: '활동앨범', path: '/gallery' },
  {
    label: '알림마당',
    path: '/notices',
    children: [
      { label: '공지사항', path: '/notices' },
      { label: '주간 식단표', path: '/meals' },
      { label: '온라인 문의', path: '/qna' },
    ],
  },
  { label: '채용·구직', path: '/jobs' },
] as const
