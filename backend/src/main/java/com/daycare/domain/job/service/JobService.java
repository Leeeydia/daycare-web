package com.daycare.domain.job.service;

import com.daycare.domain.job.dto.JobApplicationCreateRequest;
import com.daycare.domain.job.dto.JobPostingResponse;
import com.daycare.domain.job.entity.JobApplication;
import com.daycare.domain.job.entity.WorkType;
import com.daycare.domain.job.repository.JobApplicationRepository;
import com.daycare.domain.job.repository.JobPostingRepository;
import com.daycare.global.common.PhoneNumber;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.JobErrorCode;
import com.daycare.global.sms.NewJobApplicationEvent;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobPostingRepository jobPostingRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<JobPostingResponse> findAllPostings() {
        return jobPostingRepository.findAllByOrderByOpenDescIdDesc().stream()
                .map(JobPostingResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobPostingResponse findPosting(Long id) {
        return jobPostingRepository.findById(id)
                .map(JobPostingResponse::from)
                .orElseThrow(() -> new BusinessException(JobErrorCode.JOB_NOT_FOUND));
    }

    /** 구직 신청 저장. 관리자 알림은 커밋 이후 비동기로 발송한다. */
    @Transactional
    public Long apply(JobApplicationCreateRequest request) {
        if (!request.privacyAgreed()) {
            throw new BusinessException(JobErrorCode.PRIVACY_NOT_AGREED);
        }
        String phone = PhoneNumber.normalize(request.phone());
        if (phone == null) {
            throw new BusinessException(JobErrorCode.INVALID_PHONE);
        }

        JobApplication application = JobApplication.create(
                request.name().trim(),
                phone,
                request.hasCertificate(),
                WorkType.fromLabel(request.preferredWorkType()),
                blankToNull(request.memo()),
                true
        );
        JobApplication saved = jobApplicationRepository.save(application);

        log.info("구직 신청 접수 id={} 이름={}", saved.getId(), PhoneNumber.maskName(saved.getName()));
        eventPublisher.publishEvent(new NewJobApplicationEvent(saved.getId(), saved.getName(), saved.getPhone()));

        return saved.getId();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordNotifyResult(Long applicationId, boolean success, String detail) {
        jobApplicationRepository.findById(applicationId).ifPresent(application -> {
            if (success) {
                application.markNotified(detail);
            } else {
                application.markNotifyFailed(detail);
            }
        });
    }

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
