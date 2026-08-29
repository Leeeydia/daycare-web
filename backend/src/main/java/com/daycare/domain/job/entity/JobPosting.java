package com.daycare.domain.job.entity;

import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 채용 공고 (관리자 작성) */
@Entity
@Getter
@Table(name = "job_posting")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobPosting extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "job_position", nullable = false, length = 50)
    private String position;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkType workType;

    @Column(nullable = false, length = 200)
    private String payInfo;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "is_open", nullable = false)
    private boolean open;

    private JobPosting(String title, String position, WorkType workType, String payInfo, String content, boolean open) {
        this.title = title;
        this.position = position;
        this.workType = workType;
        this.payInfo = payInfo;
        this.content = content;
        this.open = open;
    }

    public static JobPosting create(String title, String position, WorkType workType, String payInfo, String content,
                                    boolean open) {
        return new JobPosting(title, position, workType, payInfo, content, open);
    }

    public void update(String title, String position, WorkType workType, String payInfo, String content) {
        this.title = title;
        this.position = position;
        this.workType = workType;
        this.payInfo = payInfo;
        this.content = content;
    }

    public void toggleOpen() {
        this.open = !this.open;
    }
}
