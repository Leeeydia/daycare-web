package com.daycare.global.sms;

/**
 * 문자 발송 추상화.
 * 구현체만 갈아끼우면 SOLAPI → 알리고 등으로 전환할 수 있다.
 */
public interface SmsSender {

    SmsResult send(String to, String text);
}
