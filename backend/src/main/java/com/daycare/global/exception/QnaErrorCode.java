package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum QnaErrorCode implements ErrorCode {

    QNA_NOT_FOUND("QNA_001", "요청하신 문의를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    PASSWORD_MISMATCH("QNA_002", "비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    SECRET_POST("QNA_003", "비밀글입니다. 비밀번호를 확인해 주세요.", HttpStatus.FORBIDDEN),
    PRIVACY_NOT_AGREED("QNA_004", "개인정보 수집·이용에 동의해 주세요.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
