package com.daycare.domain.notice.dto;

import com.daycare.domain.notice.entity.Notice;
import java.time.LocalDateTime;

/** 공지 목록 항목 (본문 제외) */
public record NoticeSummaryResponse(
        Long id,
        String title,
        boolean pinned,
        long viewCount,
        LocalDateTime createdAt
) {
    public static NoticeSummaryResponse from(Notice notice) {
        return new NoticeSummaryResponse(
                notice.getId(), notice.getTitle(), notice.isPinned(), notice.getViewCount(), notice.getCreatedAt());
    }
}
