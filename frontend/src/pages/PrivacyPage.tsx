import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Container } from '@/components/ui/Container'
import { site } from '@/config/site'

/**
 * 개인정보처리방침.
 * TODO(운영 전): 실제 수집 항목·보유 기간·수탁사(SOLAPI 등)를 확인해 내용을 확정하고 시행일자를 기입할 것.
 */
const sections = [
  {
    title: '1. 개인정보의 수집 항목 및 수집 방법',
    body: [
      `${site.name}(이하 "센터")는 상담 신청, 온라인 문의, 구직 신청 시 아래와 같은 최소한의 개인정보를 수집합니다.`,
      '· 상담 신청: 이름, 연락처, 문의 내용(선택), 장기요양등급 보유 여부(선택)',
      '· 온라인 문의: 이름, 연락처, 문의 내용, 게시글 확인용 비밀번호',
      '· 구직 신청: 이름, 연락처, 자격증 보유 여부, 희망 근무 형태, 경력 사항(선택)',
      '수집 방법: 홈페이지 내 신청 폼을 통한 이용자의 직접 입력',
    ],
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    body: [
      '· 상담 신청 확인 및 회신, 이용 상담 진행',
      '· 온라인 문의에 대한 답변 안내',
      '· 구직 신청 확인 및 채용 절차 안내',
      '센터는 위 목적 이외의 용도로 개인정보를 이용하지 않으며, 목적이 변경될 경우 사전에 동의를 받습니다.',
    ],
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    body: [
      `수집한 개인정보는 수집일로부터 ${site.privacyRetentionMonths}개월 보관 후 지체 없이 파기합니다.`,
      '단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.',
      '파기 방법: 전자적 파일은 복구가 불가능한 방법으로 영구 삭제하며, 출력물은 분쇄하거나 소각합니다.',
    ],
  },
  {
    title: '4. 개인정보의 제3자 제공',
    body: [
      '센터는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.',
      '다만 법령에 따라 요구되는 경우, 수사기관의 적법한 절차에 따른 요청이 있는 경우에 한해 제공할 수 있습니다.',
    ],
  },
  {
    title: '5. 개인정보 처리의 위탁',
    body: [
      '센터는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁할 수 있습니다.',
      '· 수탁자: {{SMS_VENDOR}} / 위탁 업무: 상담·구직 신청 접수 알림 문자 발송',
      '위탁 계약 시 개인정보 보호 관련 의무를 명시하고, 위탁 내용이 변경되면 본 방침을 통해 공개합니다.',
    ],
  },
  {
    title: '6. 정보주체의 권리와 행사 방법',
    body: [
      '이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요구할 수 있습니다.',
      `요청은 대표전화(${site.tel}) 또는 이메일(${site.email})로 접수하실 수 있으며, 센터는 지체 없이 조치합니다.`,
      '이용자는 개인정보 수집·이용 동의를 거부할 수 있으나, 이 경우 상담 회신 등 서비스 이용이 제한될 수 있습니다.',
    ],
  },
  {
    title: '7. 개인정보의 안전성 확보 조치',
    body: [
      '· 관리적 조치: 내부관리계획 수립·시행, 담당자 교육',
      '· 기술적 조치: 개인정보 접근 권한 제한, 비밀번호 암호화 저장, 통신 구간 암호화(HTTPS)',
      '· 물리적 조치: 자료 보관 장소의 접근 통제',
    ],
  },
  {
    title: '8. 개인정보 보호책임자',
    body: [
      `· 책임자: ${site.business.ceoName} (센터장)`,
      `· 연락처: ${site.tel} / ${site.email}`,
      '개인정보 침해에 대한 신고·상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다.',
      '· 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)',
      '· 개인정보 분쟁조정위원회 (www.kopico.go.kr / 1833-6972)',
    ],
  },
  {
    title: '9. 개인정보처리방침의 변경',
    body: [
      '본 방침의 내용이 추가·삭제·수정될 경우 시행 7일 전부터 홈페이지 공지사항을 통해 안내합니다.',
      '· 시행일자: {{PRIVACY_EFFECTIVE_DATE}}',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Seo title="개인정보처리방침" description={`${site.name}의 개인정보처리방침입니다.`} path="/privacy" />
      <PageHero title="개인정보처리방침" breadcrumbs={[{ label: '개인정보처리방침' }]} />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="rounded-2xl bg-ink-50 p-6 leading-8 text-ink-700">
              {site.name}는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같이
              개인정보처리방침을 수립·공개합니다.
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl sm:text-2xl">{section.title}</h2>
                  <div className="mt-4 space-y-2.5 leading-8 text-ink-700">
                    {section.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
