package com.daycare.global.sms;

import com.daycare.global.common.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * SOLAPI 공식 Java SDK 기반 발송기 (운영 프로필).
 * 발신번호(SMS_FROM)는 SOLAPI 콘솔에 사전 등록되어 있어야 한다.
 */
@Slf4j
@Component
@Profile("prod")
public class SolapiSmsSender implements SmsSender {

    private final DefaultMessageService messageService;
    private final SmsProperties properties;

    public SolapiSmsSender(SmsProperties properties) {
        this.properties = properties;
        this.messageService = NurigoApp.INSTANCE.initializeDefaultMessageService(
                properties.apiKey(), properties.apiSecret(), properties.baseUrl());
    }

    @Override
    public SmsResult send(String to, String text) {
        Message message = new Message();
        message.setFrom(properties.from());
        message.setTo(to);
        message.setText(text);

        try {
            SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
            if (response == null) {
                return SmsResult.failed("SOLAPI 응답이 비어 있습니다.");
            }
            log.info("문자 발송 성공 수신번호={} messageId={}", PhoneNumber.maskPhone(to), response.getMessageId());
            return SmsResult.sent(response.getMessageId());
        } catch (Exception e) {
            log.error("문자 발송 실패 수신번호={} 사유={}", PhoneNumber.maskPhone(to), e.getMessage());
            return SmsResult.failed(e.getMessage());
        }
    }
}
