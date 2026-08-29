package com.daycare.domain.gallery.repository;

import com.daycare.domain.gallery.entity.GalleryPost;
import com.daycare.domain.program.entity.ProgramCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryPostRepository extends JpaRepository<GalleryPost, Long> {

    Page<GalleryPost> findAllByOrderByIdDesc(Pageable pageable);

    Page<GalleryPost> findByProgramCategoryOrderByIdDesc(ProgramCategory category, Pageable pageable);
}
