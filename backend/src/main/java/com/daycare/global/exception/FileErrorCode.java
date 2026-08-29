package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FileErrorCode implements ErrorCode {

    EMPTY_FILE("FILE_001", "업로드할 파일이 없습니다.", HttpStatus.BAD_REQUEST),
    UNSUPPORTED_EXTENSION("FILE_002", "이미지 파일(jpg, jpeg, png, webp, gif)만 업로드할 수 있습니다.", HttpStatus.BAD_REQUEST),
    FILE_TOO_LARGE("FILE_003", "파일 용량은 5MB를 넘을 수 없습니다.", HttpStatus.PAYLOAD_TOO_LARGE),
    STORE_FAILED("FILE_004", "파일 저장에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
