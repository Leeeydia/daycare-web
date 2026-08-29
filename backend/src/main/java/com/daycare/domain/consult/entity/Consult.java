package com.daycare.domain.consult.entity;

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

/** 상담 신청 (메인 간편상담 / 상세 상담 폼 공용) */
@Entity
@Getter
@Table(name = "consult")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Consult extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GradeStatus hasGrade;

    @Column(columnDefinition = "TEXT")
    private String memo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ConsultStatus status;

    @Column(nullable = false)
    private boolean privacyAgreed;

    /** 관리자 내부 메모 (Phase 4 관리자 화면에서 사용) */
    @Column(columnDefinition = "TEXT")
    private String adminMemo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotifyStatus notifyStatus;

    private LocalDateTime notifiedAt;

    @Column(length = 255)
    private String notifyFailureReason;

    private Consult(String name, String phone, GradeStatus hasGrade, String memo, boolean privacyAgreed) {
        this.name = name;
        this.phone = phone;
        this.hasGrade = hasGrade;
        this.memo = memo;
        this.privacyAgreed = privacyAgreed;
        this.status = ConsultStatus.NEW;
        this.notifyStatus = NotifyStatus.PENDING;
    }

    public static Consult create(String name, String phone, GradeStatus hasGrade, String memo, boolean privacyAgreed) {
        return new Consult(name, phone, hasGrade, memo, privacyAgreed);
    }

    public void changeStatus(ConsultStatus status) {
        this.status = status;
    }

    public void writeAdminMemo(String adminMemo) {
        this.adminMemo = adminMemo;
    }

    public void markNotified(String messageId) {
        this.notifyStatus = NotifyStatus.SENT;
        this.notifiedAt = LocalDateTime.now();
        this.notifyFailureReason = null;
    }

    public void markNotifyFailed(String reason) {
        this.notifyStatus = NotifyStatus.FAILED;
        this.notifyFailureReason = truncate(reason);
    }

    private String truncate(String value) {
        if (value == null) {
            return null;
        }
        return value.length() <= 255 ? value : value.substring(0, 255);
    }
}
