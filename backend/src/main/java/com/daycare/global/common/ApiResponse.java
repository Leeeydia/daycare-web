package com.daycare.global.common;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * 모든 API의 공통 응답 포맷.
 * 성공: { "success": true, "data": {...}, "error": null }
 * 실패: { "success": false, "data": null, "error": { "code": "...", "message": "..." } }
 */
@JsonInclude(JsonInclude.Include.ALWAYS)
public record ApiResponse<T>(boolean success, T data, ErrorBody error) {

    public record ErrorBody(String code, String message) {}

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static ApiResponse<Void> success() {
        return new ApiResponse<>(true, null, null);
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(false, null, new ErrorBody(code, message));
    }
}
