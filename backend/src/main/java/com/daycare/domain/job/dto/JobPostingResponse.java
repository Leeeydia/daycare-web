package com.daycare.domain.job.dto;

import com.daycare.domain.job.entity.JobPosting;
import java.time.LocalDateTime;

public record JobPostingResponse(
        Long id,
        String title,
        String position,
        String workType,
        String payInfo,
        String content,
        boolean isOpen,
        LocalDateTime createdAt
) {
    public static JobPostingResponse from(JobPosting posting) {
        return new JobPostingResponse(
                posting.getId(),
                posting.getTitle(),
                posting.getPosition(),
                posting.getWorkType().getLabel(),
                posting.getPayInfo(),
                posting.getContent(),
                posting.isOpen(),
                posting.getCreatedAt()
        );
    }
}
