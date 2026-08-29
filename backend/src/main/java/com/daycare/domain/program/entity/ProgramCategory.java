package com.daycare.domain.program.entity;

import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.GalleryErrorCode;
import java.util.Arrays;

/** 프로그램/활동앨범 공통 카테고리. API는 한글 라벨로 주고받는다. */
public enum ProgramCategory {

    COGNITIVE("인지활동"),
    PHYSICAL("신체활동"),
    LEISURE("여가활동"),
    EMOTIONAL("정서지원"),
    DAILY_LIVING("일상생활");

    private final String label;

    ProgramCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static ProgramCategory fromLabel(String label) {
        return Arrays.stream(values())
                .filter(value -> value.label.equals(label) || value.name().equalsIgnoreCase(label))
                .findFirst()
                .orElseThrow(() -> new BusinessException(GalleryErrorCode.INVALID_CATEGORY));
    }
}
