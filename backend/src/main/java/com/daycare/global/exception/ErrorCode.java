package com.daycare.global.exception;

import org.springframework.http.HttpStatus;

/** 도메인별 에러코드 enum이 구현하는 공통 인터페이스 */
public interface ErrorCode {

    String getCode();

    String getMessage();

    HttpStatus getStatus();
}
