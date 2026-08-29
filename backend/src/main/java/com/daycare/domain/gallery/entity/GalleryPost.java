package com.daycare.domain.gallery.entity;

import com.daycare.domain.program.entity.ProgramCategory;
import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 활동앨범 게시글 (사진 여러 장) */
@Entity
@Getter
@Table(name = "gallery_post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GalleryPost extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProgramCategory programCategory;

    @ElementCollection
    @CollectionTable(name = "gallery_post_image", joinColumns = @JoinColumn(name = "gallery_post_id"))
    @OrderColumn(name = "sort_order")
    @Column(name = "image_url", nullable = false, length = 500)
    private List<String> images = new ArrayList<>();

    private GalleryPost(String title, String description, ProgramCategory programCategory, List<String> images) {
        this.title = title;
        this.description = description;
        this.programCategory = programCategory;
        this.images = new ArrayList<>(images);
    }

    public static GalleryPost create(String title, String description, ProgramCategory programCategory,
                                     List<String> images) {
        return new GalleryPost(title, description, programCategory, images);
    }

    public void update(String title, String description, ProgramCategory programCategory, List<String> images) {
        this.title = title;
        this.description = description;
        this.programCategory = programCategory;
        this.images.clear();
        this.images.addAll(images);
    }
}
