package com.daycare.global.sms;

import com.daycare.global.common.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * 로컬/테스트용 문자 발송기 — 실제로 보내지 않고 콘솔에 로그만 남긴다.
 * 로그에는 전화번호를 마스킹해 기록한다.
 */
@Slf4j
@Component
@Profile("!prod")
public class FakeSmsSender implements SmsSender {

    @Override
    public SmsResult send(String to, String text) {
        log.info("[FakeSms] 수신번호={} 내용=\n{}", PhoneNumber.maskPhone(to), text);
        return SmsResult.sent("fake-" + System.currentTimeMillis());
    }
}
