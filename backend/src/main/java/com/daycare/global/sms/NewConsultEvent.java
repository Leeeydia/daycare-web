package com.daycare.global.sms;

/** 상담 신청 저장 커밋 이후 관리자 알림을 트리거하는 이벤트 */
public record NewConsultEvent(Long consultId, String name, String phone) {
}
