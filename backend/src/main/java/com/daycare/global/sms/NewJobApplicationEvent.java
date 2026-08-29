package com.daycare.global.sms;

/** 구직 신청 저장 커밋 이후 관리자 알림을 트리거하는 이벤트 */
public record NewJobApplicationEvent(Long applicationId, String name, String phone) {
}
