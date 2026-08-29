package com.daycare.global.sms;

/** 문자 발송 결과. 실패해도 신청 저장은 유지되므로 예외 대신 결과 객체로 다룬다. */
public record SmsResult(boolean success, String messageId, String failureReason) {

    public static SmsResult sent(String messageId) {
        return new SmsResult(true, messageId, null);
    }

    public static SmsResult failed(String reason) {
        return new SmsResult(false, null, reason);
    }
}
