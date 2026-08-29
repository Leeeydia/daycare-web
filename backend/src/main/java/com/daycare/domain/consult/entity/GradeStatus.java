package com.daycare.domain.consult.entity;

import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.CommonErrorCode;
import java.util.Arrays;

/** 장기요양등급 보유 여부 (상담 폼 선택 항목) */
public enum GradeStatus {
    HAS("있음"),
    NONE("없음"),
    UNKNOWN("모름");

    private final String label;

    GradeStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static GradeStatus fromLabel(String label) {
        if (label == null || label.isBlank()) {
            return UNKNOWN;
        }
        return Arrays.stream(values())
                .filter(value -> value.label.equals(label) || value.name().equalsIgnoreCase(label))
                .findFirst()
                .orElseThrow(() -> new BusinessException(CommonErrorCode.INVALID_INPUT, "등급 보유 여부 값이 올바르지 않습니다."));
    }
}
