package com.daycare.domain.gallery.dto;

import com.daycare.domain.gallery.entity.GalleryPost;
import java.time.LocalDateTime;
import java.util.List;

public record GalleryPostResponse(
        Long id,
        String title,
        String description,
        List<String> images,
        String programCategory,
        LocalDateTime createdAt
) {
    public static GalleryPostResponse from(GalleryPost post) {
        return new GalleryPostResponse(
                post.getId(),
                post.getTitle(),
                post.getDescription(),
                List.copyOf(post.getImages()),
                post.getProgramCategory().getLabel(),
                post.getCreatedAt()
        );
    }
}
