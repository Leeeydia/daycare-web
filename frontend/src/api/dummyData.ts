/**
 * Phase 1 화면 완성을 위한 더미 데이터.
 * Phase 2에서 실제 API 응답으로 교체한다. 여기 있는 문구/수치는 모두 예시이며 운영 전 실제 값으로 바꿔야 한다.
 *
 * 이미지 필드 규칙: '/' 또는 'http'로 시작하면 실제 이미지 URL, 그 외 문자열은 자리표시 이미지의 라벨로 취급한다.
 */
import type { GalleryPost, JobPosting, MealPlan, Notice, Program, Qna } from './types'

export const strengths = [
  {
    icon: 'heart',
    title: '1:1 맞춤 케어플랜',
    desc: '어르신 한 분 한 분의 건강 상태와 성향에 맞춰 담당 요양보호사가 하루 일과를 설계합니다.',
  },
  {
    icon: 'brain',
    title: '치매 예방 인지 프로그램',
    desc: '작업치료사와 함께하는 회상요법·인지자극 활동으로 남아 있는 기능을 지켜드립니다.',
  },
  {
    icon: 'bus',
    title: '안전한 송영 차량 운행',
    desc: '리프트 차량으로 집 앞까지 모시고, 승하차 시 보호자께 알림을 드립니다.',
  },
  {
    icon: 'shield',
    title: '보호자와 함께 보는 하루',
    desc: '활동 사진과 식사·복약 기록을 정기적으로 공유해 마음 놓이는 하루를 만듭니다.',
  },
] as const

export const processSteps = [
  { step: 1, title: '장기요양등급 확인', desc: '등급이 없으셔도 괜찮습니다. 신청 절차부터 함께 안내해 드립니다.' },
  { step: 2, title: '무료 전화·방문 상담', desc: '어르신 상태와 보호자님의 상황을 듣고 이용 방법을 설명드립니다.' },
  { step: 3, title: '센터 방문 · 체험', desc: '직접 오셔서 시설과 프로그램을 보시고 하루 체험도 가능합니다.' },
  { step: 4, title: '계약 후 이용 시작', desc: '표준 계약서 작성 후 송영 일정과 케어플랜을 확정합니다.' },
] as const

export const dailySchedule = [
  { time: '08:00 ~ 09:30', title: '등원 · 송영', desc: '차량으로 모시고 건강 상태(체온·혈압)를 확인합니다.' },
  { time: '09:30 ~ 10:00', title: '아침 체조 · 인사 나누기', desc: '가벼운 스트레칭으로 하루를 시작합니다.' },
  { time: '10:00 ~ 11:30', title: '오전 인지활동 프로그램', desc: '회상요법, 미술·음악 활동 등 요일별 프로그램을 진행합니다.' },
  { time: '11:30 ~ 13:00', title: '점심 식사 · 구강 관리', desc: '영양사 식단에 따라 식사하고 복약을 도와드립니다.' },
  { time: '13:00 ~ 14:00', title: '휴식 · 낮잠', desc: '개인 매트에서 편안하게 휴식합니다.' },
  { time: '14:00 ~ 15:30', title: '오후 신체활동 프로그램', desc: '기능 회복 운동, 원예·놀이 활동을 진행합니다.' },
  { time: '15:30 ~ 16:30', title: '간식 · 자유 활동', desc: '오후 간식 후 담소를 나누거나 개별 활동을 합니다.' },
  { time: '16:30 ~ 18:00', title: '귀가 준비 · 송영', desc: '하루 활동을 정리하고 안전하게 댁까지 모셔다 드립니다.' },
] as const

/** 2026년 기준 예시 수가 — 실제 고시 금액으로 교체 필요 */
export const feeTable = {
  noticeYear: 2026,
  rows: [
    { grade: '1등급', daily: 78_970, normal: 11_845, reduced40: 7_107, reduced60: 4_738 },
    { grade: '2등급', daily: 73_150, normal: 10_972, reduced40: 6_583, reduced60: 4_389 },
    { grade: '3등급', daily: 67_500, normal: 10_125, reduced40: 6_075, reduced60: 4_050 },
    { grade: '4등급', daily: 64_420, normal: 9_663, reduced40: 5_797, reduced60: 3_865 },
    { grade: '5등급', daily: 61_330, normal: 9_199, reduced40: 5_519, reduced60: 3_679 },
    { grade: '인지지원등급', daily: 55_130, normal: 8_269, reduced40: 4_961, reduced60: 3_307 },
  ],
  notes: [
    '위 금액은 8시간 이상 10시간 미만 이용 기준의 1일 예시 금액입니다.',
    '본인부담금은 일반 15%, 감경 대상자 9%(40% 경감) · 6%(60% 경감), 기초생활수급자 0%입니다.',
    '식사 재료비, 간식비 등 비급여 항목은 별도이며 상담 시 안내해 드립니다.',
  ],
} as const

export const gradeGuide = [
  { grade: '1등급', score: '95점 이상', desc: '일상생활에서 전적으로 다른 사람의 도움이 필요한 상태' },
  { grade: '2등급', score: '75점 이상 95점 미만', desc: '일상생활에서 상당 부분 다른 사람의 도움이 필요한 상태' },
  { grade: '3등급', score: '60점 이상 75점 미만', desc: '일상생활에서 부분적으로 다른 사람의 도움이 필요한 상태' },
  { grade: '4등급', score: '51점 이상 60점 미만', desc: '일상생활에서 일정 부분 다른 사람의 도움이 필요한 상태' },
  { grade: '5등급', score: '45점 이상 51점 미만', desc: '치매 환자(노인성 질병으로 한정)' },
  { grade: '인지지원등급', score: '45점 미만', desc: '치매 환자로서 신체 기능과 무관하게 인지 지원이 필요한 상태' },
] as const

export const facilities = [
  { name: '프로그램실', desc: '단체 활동과 인지 프로그램이 진행되는 넓은 공간' },
  { name: '물리치료실', desc: '기능 회복 운동 기구를 갖춘 공간' },
  { name: '식당', desc: '영양사 식단으로 식사를 준비하는 위생 공간' },
  { name: '휴게실', desc: '개인 매트와 침구를 갖춘 휴식 공간' },
  { name: '안전 화장실', desc: '미끄럼 방지 바닥과 손잡이를 설치한 화장실' },
  { name: '옥상 정원', desc: '원예활동과 산책이 가능한 야외 공간' },
] as const

export const programs: Program[] = [
  { id: 1, name: '회상요법', description: '옛 사진과 물건으로 지난 기억을 떠올리며 자연스럽게 대화를 나눕니다.', imageUrl: '회상요법', category: '인지활동', effects: ['기억력 자극', '정서 안정'], sortOrder: 1 },
  { id: 2, name: '인지 학습지', description: '숫자·글자·도형 활동지로 집중력과 판단력을 훈련합니다.', imageUrl: '인지 학습지', category: '인지활동', effects: ['집중력', '문제해결력'], sortOrder: 2 },
  { id: 3, name: '실버 체조', description: '앉아서도 할 수 있는 동작으로 관절 가동 범위를 넓힙니다.', imageUrl: '실버 체조', category: '신체활동', effects: ['근력 유지', '낙상 예방'], sortOrder: 3 },
  { id: 4, name: '기능 회복 운동', description: '개인별 상태에 맞춘 보행·균형 훈련을 진행합니다.', imageUrl: '기능 회복 운동', category: '신체활동', effects: ['보행 능력', '균형 감각'], sortOrder: 4 },
  { id: 5, name: '원예활동', description: '작은 화분을 직접 가꾸며 계절의 변화를 느낍니다.', imageUrl: '원예활동', category: '여가활동', effects: ['소근육 활동', '성취감'], sortOrder: 5 },
  { id: 6, name: '음악·노래교실', description: '익숙한 노래를 함께 부르며 호흡과 발성을 훈련합니다.', imageUrl: '음악·노래교실', category: '여가활동', effects: ['정서 표현', '호흡 훈련'], sortOrder: 6 },
  { id: 7, name: '미술치료', description: '색칠하고 만드는 활동으로 감정을 편안하게 표현합니다.', imageUrl: '미술치료', category: '정서지원', effects: ['우울감 완화', '자기표현'], sortOrder: 7 },
  { id: 8, name: '집단 상담·나들이', description: '또래 어르신과 어울리며 사회적 관계를 이어갑니다.', imageUrl: '집단 상담·나들이', category: '정서지원', effects: ['사회성 유지', '고립감 해소'], sortOrder: 8 },
  { id: 9, name: '일상생활 훈련', description: '식사·옷 입기 등 스스로 할 수 있는 일을 지켜드립니다.', imageUrl: '일상생활 훈련', category: '일상생활', effects: ['자립 생활', '자존감'], sortOrder: 9 },
  { id: 10, name: '건강 체크·복약 관리', description: '매일 혈압·체온을 확인하고 복약 시간을 관리합니다.', imageUrl: '건강 체크·복약 관리', category: '일상생활', effects: ['건강 관리', '복약 순응도'], sortOrder: 10 },
]

export const notices: Notice[] = [
  {
    id: 5,
    title: '2026년 설 연휴 센터 운영 안내',
    pinned: true,
    viewCount: 214,
    createdAt: '2026-02-10T09:00:00',
    content: `<p>안녕하세요. 어르신과 보호자 여러분께 설 연휴 운영 일정을 안내드립니다.</p>
<h3>휴무 기간</h3><ul><li>2026년 2월 16일(월) ~ 2월 18일(수)</li><li>2월 19일(목)부터 정상 운영합니다.</li></ul>
<p>연휴 기간 중 급한 문의는 대표 전화로 연락 주시면 순차적으로 답변드리겠습니다.</p>`,
  },
  {
    id: 4,
    title: '겨울철 감염병 예방을 위한 방문 안내',
    pinned: true,
    viewCount: 176,
    createdAt: '2026-01-08T10:30:00',
    content: `<p>독감·호흡기 감염병 유행에 따라 아래와 같이 예방 수칙을 운영합니다.</p>
<ul><li>등원 시 체온 측정 및 건강 상태 확인</li><li>프로그램실 하루 2회 소독</li><li>발열·기침 증상이 있는 경우 가정에서 휴식 권장</li></ul>`,
  },
  { id: 3, title: '3월 프로그램 일정표 안내', pinned: false, viewCount: 132, createdAt: '2026-02-26T14:00:00', content: '<p>3월 프로그램 일정표를 안내드립니다. 원예활동이 옥상 정원에서 재개됩니다.</p>' },
  { id: 2, title: '보호자 간담회 개최 안내 (3월 14일)', pinned: false, viewCount: 98, createdAt: '2026-02-20T11:00:00', content: '<p>어르신의 센터 생활을 공유하는 보호자 간담회를 개최합니다. 참석 여부를 사전에 알려주세요.</p>' },
  { id: 1, title: '주간보호 이용 어르신 안전 교육 실시', pinned: false, viewCount: 87, createdAt: '2026-02-05T09:30:00', content: '<p>화재 대피 훈련과 낙상 예방 교육을 실시했습니다.</p>' },
]

export const galleryPosts: GalleryPost[] = [
  { id: 8, title: '봄맞이 원예활동', description: '옥상 정원에서 봄꽃 화분을 심었습니다.', images: ['원예활동 1', '원예활동 2', '원예활동 3'], programCategory: '여가활동', createdAt: '2026-03-12' },
  { id: 7, title: '3월 생신 잔치', description: '3월에 생신을 맞은 어르신들을 축하했습니다.', images: ['생신 잔치 1', '생신 잔치 2'], programCategory: '정서지원', createdAt: '2026-03-05' },
  { id: 6, title: '실버 체조 시간', description: '앉아서 하는 체조로 하루를 시작합니다.', images: ['실버 체조 1', '실버 체조 2'], programCategory: '신체활동', createdAt: '2026-02-27' },
  { id: 5, title: '회상요법 - 옛날 사진관', description: '지난 사진을 보며 이야기를 나눴습니다.', images: ['회상요법 1', '회상요법 2', '회상요법 3'], programCategory: '인지활동', createdAt: '2026-02-19' },
  { id: 4, title: '정월대보름 부럼 깨기', description: '전통 명절 행사를 함께 즐겼습니다.', images: ['정월대보름 1', '정월대보름 2'], programCategory: '여가활동', createdAt: '2026-02-12' },
  { id: 3, title: '미술치료 - 나의 봄', description: '색연필로 봄 풍경을 그렸습니다.', images: ['미술치료 1'], programCategory: '정서지원', createdAt: '2026-02-06' },
  { id: 2, title: '인지 학습지 활동', description: '숫자 잇기와 낱말 찾기를 했습니다.', images: ['인지 학습지 1', '인지 학습지 2'], programCategory: '인지활동', createdAt: '2026-01-29' },
  { id: 1, title: '새해 떡국 나눔', description: '2026년 첫 식사로 떡국을 준비했습니다.', images: ['새해 떡국 1', '새해 떡국 2'], programCategory: '일상생활', createdAt: '2026-01-02' },
]

export const qnaList: Qna[] = [
  {
    id: 6, name: '김○○', isSecret: false, createdAt: '2026-03-10T13:20:00',
    question: '장기요양등급이 아직 없는데 상담을 받아볼 수 있을까요?',
    answer: '네, 가능합니다. 등급이 없으셔도 신청 절차와 필요한 서류를 처음부터 안내해 드리고 있습니다. 편하신 시간에 전화 주시면 자세히 설명드리겠습니다.',
    answeredAt: '2026-03-10T16:40:00',
  },
  {
    id: 5, name: '이○○', isSecret: false, createdAt: '2026-03-06T09:10:00',
    question: '송영 차량이 저희 동네까지 오나요? 아파트 단지 안까지 들어올 수 있는지 궁금합니다.',
    answer: '센터 반경 약 5km 내에서 운행하고 있으며, 단지 내 진입 가능 여부는 차량 크기와 단지 규정에 따라 다릅니다. 주소를 알려주시면 확인 후 안내드리겠습니다.',
    answeredAt: '2026-03-06T15:00:00',
  },
  {
    id: 4, name: '박○○', isSecret: true, createdAt: '2026-03-02T18:45:00',
    question: '아버지가 야간에 배회 증상이 있으신데, 주간에 이용하면 도움이 될까요?',
    answer: '낮 시간에 활동량을 늘리고 생활 리듬을 잡아드리면 야간 증상 완화에 도움이 되는 경우가 많습니다. 상태를 좀 더 여쭙고 안내드리겠습니다.',
    answeredAt: '2026-03-03T10:15:00',
  },
  {
    id: 3, name: '최○○', isSecret: false, createdAt: '2026-02-24T11:00:00',
    question: '어머니가 당뇨가 있으신데 식사 관리가 가능한가요?',
    answer: '영양사가 작성한 식단을 기본으로 하되, 질환에 따라 개별 조정이 가능합니다. 복약 시간도 함께 관리해 드립니다.',
    answeredAt: '2026-02-24T14:20:00',
  },
  { id: 2, name: '정○○', isSecret: false, createdAt: '2026-02-18T20:05:00', question: '하루만 체험해 볼 수 있을까요? 어머니가 낯을 많이 가리셔서요.', answer: null, answeredAt: null },
  {
    id: 1, name: '한○○', isSecret: true, createdAt: '2026-02-11T08:30:00',
    question: '이용료 감경 대상인지 확인하고 싶습니다.',
    answer: null, answeredAt: null,
  },
]

export const jobPostings: JobPosting[] = [
  {
    id: 3, title: '요양보호사 모집 (주간 근무)', position: '요양보호사', workType: '정규직', isOpen: true, createdAt: '2026-03-08T09:00:00',
    payInfo: '월 250만원 ~ (경력·자격에 따라 협의)',
    content: `<h3>모집 내용</h3><ul><li>담당 업무: 어르신 일상생활 지원, 프로그램 보조, 활동 기록</li><li>근무 시간: 평일 08:30 ~ 17:30 (주 5일)</li><li>자격 요건: 요양보호사 자격증 소지자</li><li>우대 사항: 주간보호센터 근무 경력자, 인근 거주자</li></ul>
<h3>근무 조건</h3><ul><li>4대 보험, 퇴직금, 연차</li><li>중식 제공, 명절 상여</li></ul>`,
  },
  {
    id: 2, title: '사회복지사 모집', position: '사회복지사', workType: '정규직', isOpen: true, createdAt: '2026-02-25T09:00:00',
    payInfo: '월 260만원 ~ (경력에 따라 협의)',
    content: `<h3>모집 내용</h3><ul><li>담당 업무: 케어플랜 수립, 프로그램 기획·진행, 보호자 상담</li><li>자격 요건: 사회복지사 2급 이상</li><li>우대 사항: 노인복지 분야 경력 2년 이상</li></ul>`,
  },
  {
    id: 1, title: '송영 운전원 (시간제) 모집', position: '운전원', workType: '시간제', isOpen: false, createdAt: '2026-01-15T09:00:00',
    payInfo: '시급 협의 (일 4시간)',
    content: `<h3>모집 내용</h3><ul><li>담당 업무: 어르신 등·하원 송영, 차량 관리</li><li>근무 시간: 08:00 ~ 10:00 / 16:00 ~ 18:00</li><li>자격 요건: 1종 보통 면허 이상, 무사고 경력자</li></ul>`,
  },
]

export const currentMealPlan: MealPlan = {
  weekStartDate: '2026-03-16',
  weekEndDate: '2026-03-20',
  imageUrl: null,
  days: [
    { day: '월', date: '03-16', lunch: ['쌀밥', '된장국', '고등어구이', '시금치나물', '배추김치'], snack: '단호박죽' },
    { day: '화', date: '03-17', lunch: ['잡곡밥', '미역국', '불고기', '콩나물무침', '깍두기'], snack: '요구르트 · 바나나' },
    { day: '수', date: '03-18', lunch: ['쌀밥', '순두부찌개', '닭갈비', '오이무침', '배추김치'], snack: '찐 고구마' },
    { day: '목', date: '03-19', lunch: ['보리밥', '콩나물국', '동태전', '애호박볶음', '나박김치'], snack: '식혜 · 약과' },
    { day: '금', date: '03-20', lunch: ['쌀밥', '소고기무국', '제육볶음', '숙주나물', '배추김치'], snack: '과일 모둠' },
  ],
}
