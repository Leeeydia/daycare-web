package com.daycare.domain.gallery.service;

import com.daycare.domain.gallery.dto.GalleryPostResponse;
import com.daycare.domain.gallery.repository.GalleryPostRepository;
import com.daycare.domain.program.entity.ProgramCategory;
import com.daycare.global.common.PageResponse;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.GalleryErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryPostRepository galleryPostRepository;

    /** category가 비어 있으면 전체 조회 */
    @Transactional(readOnly = true)
    public PageResponse<GalleryPostResponse> findAll(String category, Pageable pageable) {
        Page<GalleryPostResponse> page = StringUtils.hasText(category)
                ? galleryPostRepository
                        .findByProgramCategoryOrderByIdDesc(ProgramCategory.fromLabel(category), pageable)
                        .map(GalleryPostResponse::from)
                : galleryPostRepository.findAllByOrderByIdDesc(pageable).map(GalleryPostResponse::from);
        return PageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public GalleryPostResponse findById(Long id) {
        return galleryPostRepository.findById(id)
                .map(GalleryPostResponse::from)
                .orElseThrow(() -> new BusinessException(GalleryErrorCode.GALLERY_NOT_FOUND));
    }
}
