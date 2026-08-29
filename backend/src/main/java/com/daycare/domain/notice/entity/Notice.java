package com.daycare.domain.notice.entity;

import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 공지사항 */
@Entity
@Getter
@Table(name = "notice")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    /** 관리자 에디터로 작성한 HTML */
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(nullable = false)
    private boolean pinned;

    @Column(nullable = false)
    private long viewCount;

    @ElementCollection
    @CollectionTable(name = "notice_attachment", joinColumns = @JoinColumn(name = "notice_id"))
    private List<NoticeAttachment> attachments = new ArrayList<>();

    private Notice(String title, String content, boolean pinned) {
        this.title = title;
        this.content = content;
        this.pinned = pinned;
        this.viewCount = 0L;
    }

    public static Notice create(String title, String content, boolean pinned) {
        return new Notice(title, content, pinned);
    }

    public void update(String title, String content, boolean pinned) {
        this.title = title;
        this.content = content;
        this.pinned = pinned;
    }

    public void addAttachment(NoticeAttachment attachment) {
        this.attachments.add(attachment);
    }
}
