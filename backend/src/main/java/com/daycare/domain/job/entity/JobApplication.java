package com.daycare.domain.job.entity;

import com.daycare.global.common.BaseTimeEntity;
import com.daycare.global.sms.NotifyStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 구직 신청 */
@Entity
@Getter
@Table(name = "job_application")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobApplication extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false)
    private boolean hasCertificate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkType preferredWorkType;

    @Column(columnDefinition = "TEXT")
    private String memo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobApplicationStatus status;

    @Column(nullable = false)
    private boolean privacyAgreed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotifyStatus notifyStatus;

    private LocalDateTime notifiedAt;

    @Column(length = 255)
    private String notifyFailureReason;

    private JobApplication(String name, String phone, boolean hasCertificate, WorkType preferredWorkType, String memo,
                           boolean privacyAgreed) {
        this.name = name;
        this.phone = phone;
        this.hasCertificate = hasCertificate;
        this.preferredWorkType = preferredWorkType;
        this.memo = memo;
        this.privacyAgreed = privacyAgreed;
        this.status = JobApplicationStatus.NEW;
        this.notifyStatus = NotifyStatus.PENDING;
    }

    public static JobApplication create(String name, String phone, boolean hasCertificate, WorkType preferredWorkType,
                                        String memo, boolean privacyAgreed) {
        return new JobApplication(name, phone, hasCertificate, preferredWorkType, memo, privacyAgreed);
    }

    public void changeStatus(JobApplicationStatus status) {
        this.status = status;
    }

    public void markNotified(String messageId) {
        this.notifyStatus = NotifyStatus.SENT;
        this.notifiedAt = LocalDateTime.now();
        this.notifyFailureReason = null;
    }

    public void markNotifyFailed(String reason) {
        this.notifyStatus = NotifyStatus.FAILED;
        this.notifyFailureReason = reason == null || reason.length() <= 255 ? reason : reason.substring(0, 255);
    }
}
