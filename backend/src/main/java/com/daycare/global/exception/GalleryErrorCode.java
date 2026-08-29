package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum GalleryErrorCode implements ErrorCode {

    GALLERY_NOT_FOUND("GALLERY_001", "요청하신 게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    INVALID_CATEGORY("GALLERY_002", "존재하지 않는 카테고리입니다.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
