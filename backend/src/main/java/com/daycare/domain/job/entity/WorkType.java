package com.daycare.domain.job.entity;

import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.CommonErrorCode;
import java.util.Arrays;

/** 고용 형태. API는 한글 라벨로 주고받는다. */
public enum WorkType {

    FULL_TIME("정규직"),
    CONTRACT("계약직"),
    PART_TIME("시간제"),
    SUBSTITUTE("대체인력");

    private final String label;

    WorkType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static WorkType fromLabel(String label) {
        return Arrays.stream(values())
                .filter(value -> value.label.equals(label) || value.name().equalsIgnoreCase(label))
                .findFirst()
                .orElseThrow(() -> new BusinessException(CommonErrorCode.INVALID_INPUT, "근무 형태 값이 올바르지 않습니다."));
    }
}
