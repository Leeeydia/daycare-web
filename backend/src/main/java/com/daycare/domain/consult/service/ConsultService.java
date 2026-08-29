package com.daycare.domain.consult.service;

import com.daycare.domain.consult.dto.ConsultCreateRequest;
import com.daycare.domain.consult.dto.ConsultCreateResponse;
import com.daycare.domain.consult.entity.Consult;
import com.daycare.domain.consult.entity.GradeStatus;
import com.daycare.domain.consult.repository.ConsultRepository;
import com.daycare.global.common.PhoneNumber;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.ConsultErrorCode;
import com.daycare.global.sms.NewConsultEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultService {

    private final ConsultRepository consultRepository;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * 상담 신청을 저장한다.
     * 관리자 알림 문자는 트랜잭션 커밋 이후 비동기로 발송되므로, 발송 실패가 저장을 되돌리지 않는다.
     */
    @Transactional
    public ConsultCreateResponse create(ConsultCreateRequest request) {
        if (!request.privacyAgreed()) {
            throw new BusinessException(ConsultErrorCode.PRIVACY_NOT_AGREED);
        }

        String phone = PhoneNumber.normalize(request.phone());
        if (phone == null) {
            throw new BusinessException(ConsultErrorCode.INVALID_PHONE);
        }

        Consult consult = Consult.create(
                request.name().trim(),
                phone,
                GradeStatus.fromLabel(request.hasGrade()),
                blankToNull(request.memo()),
                true
        );
        Consult saved = consultRepository.save(consult);

        // 로그에는 전화번호를 남기지 않는다.
        log.info("상담 신청 접수 id={} 이름={}", saved.getId(), PhoneNumber.maskName(saved.getName()));
        eventPublisher.publishEvent(new NewConsultEvent(saved.getId(), saved.getName(), saved.getPhone()));

        return new ConsultCreateResponse(saved.getId());
    }

    /** 알림 문자 발송 결과 기록 — 본 트랜잭션과 분리된 별도 트랜잭션에서 수행한다. */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordNotifyResult(Long consultId, boolean success, String detail) {
        consultRepository.findById(consultId).ifPresent(consult -> {
            if (success) {
                consult.markNotified(detail);
            } else {
                consult.markNotifyFailed(detail);
            }
        });
    }

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
