package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum JobErrorCode implements ErrorCode {

    JOB_NOT_FOUND("JOB_001", "요청하신 채용 공고를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    PRIVACY_NOT_AGREED("JOB_002", "개인정보 수집·이용에 동의해 주세요.", HttpStatus.BAD_REQUEST),
    INVALID_PHONE("JOB_003", "휴대폰 번호를 정확히 입력해 주세요.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
