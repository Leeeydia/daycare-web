package com.daycare.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MealErrorCode implements ErrorCode {

    MEAL_NOT_FOUND("MEAL_001", "등록된 식단표가 없습니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
