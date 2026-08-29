package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {

    INVALID_INPUT("COMMON_001", "입력값이 올바르지 않습니다.", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_FOUND("COMMON_002", "요청하신 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    METHOD_NOT_ALLOWED("COMMON_003", "지원하지 않는 요청 방식입니다.", HttpStatus.METHOD_NOT_ALLOWED),
    TOO_MANY_REQUESTS("COMMON_004", "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.", HttpStatus.TOO_MANY_REQUESTS),
    UNAUTHORIZED("COMMON_005", "인증이 필요합니다.", HttpStatus.UNAUTHORIZED),
    FORBIDDEN("COMMON_006", "접근 권한이 없습니다.", HttpStatus.FORBIDDEN),
    INTERNAL_ERROR("COMMON_999", "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
