package com.daycare.domain.notice.dto;

import com.daycare.domain.notice.entity.Notice;
import java.time.LocalDateTime;
import java.util.List;

/** 공지 상세 */
public record NoticeDetailResponse(
        Long id,
        String title,
        String content,
        boolean pinned,
        long viewCount,
        List<Attachment> attachments,
        LocalDateTime createdAt
) {
    public record Attachment(String fileName, String fileUrl, long fileSize) {}

    public static NoticeDetailResponse from(Notice notice) {
        List<Attachment> attachments = notice.getAttachments().stream()
                .map(a -> new Attachment(a.getFileName(), a.getFileUrl(), a.getFileSize()))
                .toList();
        return new NoticeDetailResponse(
                notice.getId(), notice.getTitle(), notice.getContent(), notice.isPinned(),
                notice.getViewCount(), attachments, notice.getCreatedAt());
    }
}
