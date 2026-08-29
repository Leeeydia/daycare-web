package com.daycare.global.common;

import java.util.List;
import org.springframework.data.domain.Page;

/** 목록 API 공통 페이지 응답 (프론트 Page<T> 타입과 동일한 형태) */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
    public static <T> PageResponse<T> from(Page<T> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                Math.max(page.getTotalPages(), 1)
        );
    }
}
