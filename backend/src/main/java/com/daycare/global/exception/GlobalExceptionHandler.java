package com.daycare.global.exception;

import com.daycare.global.common.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

/** 전역 예외 처리 — 모든 에러 응답을 ApiResponse 포맷으로 통일한다. */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusiness(BusinessException e) {
        ErrorCode code = e.getErrorCode();
        log.info("business exception: {} - {}", code.getCode(), e.getMessage());
        return build(code.getStatus(), code.getCode(), e.getMessage());
    }

    /** @Valid 검증 실패 — 첫 번째 필드 메시지를 그대로 노출한다. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .orElse(CommonErrorCode.INVALID_INPUT.getMessage());
        return build(HttpStatus.BAD_REQUEST, CommonErrorCode.INVALID_INPUT.getCode(), message);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleConstraintViolation(ConstraintViolationException e) {
        String message = e.getConstraintViolations().stream()
                .findFirst()
                .map(v -> v.getMessage())
                .orElse(CommonErrorCode.INVALID_INPUT.getMessage());
        return build(HttpStatus.BAD_REQUEST, CommonErrorCode.INVALID_INPUT.getCode(), message);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MissingServletRequestParameterException.class})
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(Exception e) {
        log.info("bad request: {}", e.getClass().getSimpleName());
        return build(HttpStatus.BAD_REQUEST, CommonErrorCode.INVALID_INPUT.getCode(),
                CommonErrorCode.INVALID_INPUT.getMessage());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodNotSupported(HttpRequestMethodNotSupportedException e) {
        return build(HttpStatus.METHOD_NOT_ALLOWED, CommonErrorCode.METHOD_NOT_ALLOWED.getCode(),
                CommonErrorCode.METHOD_NOT_ALLOWED.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNoResource(NoResourceFoundException e) {
        return build(HttpStatus.NOT_FOUND, CommonErrorCode.RESOURCE_NOT_FOUND.getCode(),
                CommonErrorCode.RESOURCE_NOT_FOUND.getMessage());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleMaxUpload(MaxUploadSizeExceededException e) {
        return build(FileErrorCode.FILE_TOO_LARGE.getStatus(), FileErrorCode.FILE_TOO_LARGE.getCode(),
                FileErrorCode.FILE_TOO_LARGE.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleUnexpected(Exception e) {
        log.error("unexpected exception", e);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, CommonErrorCode.INTERNAL_ERROR.getCode(),
                CommonErrorCode.INTERNAL_ERROR.getMessage());
    }

    private ResponseEntity<ApiResponse<Void>> build(HttpStatus status, String code, String message) {
        return ResponseEntity.status(status).body(ApiResponse.error(code, message));
    }
}
