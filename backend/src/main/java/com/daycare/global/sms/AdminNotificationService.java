package com.daycare.global.sms;

import com.daycare.domain.consult.service.ConsultService;
import com.daycare.domain.job.service.JobService;
import com.daycare.global.common.PhoneNumber;
import com.daycare.global.config.AppProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * 신규 상담/구직 신청을 관리자에게 문자로 알린다.
 *
 * 신청 저장 트랜잭션이 커밋된 뒤(AFTER_COMMIT) 비동기로 실행되므로,
 * 문자 발송이 실패해도 신청 데이터는 그대로 남는다. 실패는 로그와 DB(notify_status)에 기록한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminNotificationService {

    private final SmsSender smsSender;
    private final SmsProperties smsProperties;
    private final AppProperties appProperties;
    private final ConsultService consultService;
    private final JobService jobService;

    @Async("notificationExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onNewConsult(NewConsultEvent event) {
        String text = "[%s] 새 상담신청%n%s %s".formatted(
                appProperties.center().name(), PhoneNumber.maskName(event.name()), event.phone());
        SmsResult result = dispatch(text, "상담", event.consultId());
        consultService.recordNotifyResult(event.consultId(), result.success(),
                result.success() ? result.messageId() : result.failureReason());
    }

    @Async("notificationExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onNewJobApplication(NewJobApplicationEvent event) {
        String text = "[%s] 새 구직신청%n%s %s".formatted(
                appProperties.center().name(), PhoneNumber.maskName(event.name()), event.phone());
        SmsResult result = dispatch(text, "구직", event.applicationId());
        jobService.recordNotifyResult(event.applicationId(), result.success(),
                result.success() ? result.messageId() : result.failureReason());
    }

    private SmsResult dispatch(String text, String kind, Long id) {
        if (!smsProperties.enabled()) {
            log.info("문자 발송 비활성화 상태 — {} 알림 생략 id={}", kind, id);
            return SmsResult.failed("발송 비활성화(app.sms.enabled=false)");
        }
        if (smsProperties.adminPhone() == null || smsProperties.adminPhone().isBlank()) {
            log.warn("관리자 수신번호(SMS_ADMIN_PHONE)가 설정되지 않아 {} 알림을 보내지 못했습니다. id={}", kind, id);
            return SmsResult.failed("관리자 수신번호 미설정");
        }
        try {
            return smsSender.send(smsProperties.adminPhone(), text);
        } catch (Exception e) {
            log.error("{} 알림 발송 중 예외 id={} 사유={}", kind, id, e.getMessage());
            return SmsResult.failed(e.getMessage());
        }
    }
}
