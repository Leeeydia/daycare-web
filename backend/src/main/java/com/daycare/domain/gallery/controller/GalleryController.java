package com.daycare.domain.gallery.controller;

import com.daycare.domain.gallery.dto.GalleryPostResponse;
import com.daycare.domain.gallery.service.GalleryService;
import com.daycare.global.common.ApiResponse;
import com.daycare.global.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private static final int MAX_PAGE_SIZE = 50;

    private final GalleryService galleryService;

    @GetMapping
    public ApiResponse<PageResponse<GalleryPostResponse>> list(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ApiResponse.success(galleryService.findAll(category,
                PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), MAX_PAGE_SIZE))));
    }

    @GetMapping("/{id}")
    public ApiResponse<GalleryPostResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(galleryService.findById(id));
    }
}
