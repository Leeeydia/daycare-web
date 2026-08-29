package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConsultErrorCode implements ErrorCode {

    PRIVACY_NOT_AGREED("CONSULT_001", "개인정보 수집·이용에 동의해 주세요.", HttpStatus.BAD_REQUEST),
    INVALID_PHONE("CONSULT_002", "휴대폰 번호를 정확히 입력해 주세요.", HttpStatus.BAD_REQUEST),
    CONSULT_NOT_FOUND("CONSULT_003", "상담 신청 내역을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
