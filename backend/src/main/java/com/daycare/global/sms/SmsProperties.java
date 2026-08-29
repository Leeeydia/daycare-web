package com.daycare.global.sms;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 문자 발송 설정.
 * 운영 환경에서는 전부 환경변수로 주입한다. (SOLAPI_API_KEY, SOLAPI_API_SECRET, SMS_FROM, SMS_ADMIN_PHONE)
 */
@ConfigurationProperties(prefix = "app.sms")
public record SmsProperties(
        boolean enabled,
        String from,
        String adminPhone,
        String apiKey,
        String apiSecret,
        String baseUrl
) {
}
