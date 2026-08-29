package com.daycare.domain.notice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 공지 첨부파일 */
@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeAttachment {

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "file_size", nullable = false)
    private long fileSize;

    private NoticeAttachment(String fileName, String fileUrl, long fileSize) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileSize = fileSize;
    }

    public static NoticeAttachment of(String fileName, String fileUrl, long fileSize) {
        return new NoticeAttachment(fileName, fileUrl, fileSize);
    }
}
