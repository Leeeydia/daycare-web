package com.daycare.domain.notice.controller;

import com.daycare.domain.notice.dto.NoticeDetailResponse;
import com.daycare.domain.notice.dto.NoticeSummaryResponse;
import com.daycare.domain.notice.service.NoticeService;
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
@RequestMapping("/api/v1/notices")
@RequiredArgsConstructor
public class NoticeController {

    private static final int MAX_PAGE_SIZE = 50;

    private final NoticeService noticeService;

    @GetMapping
    public ApiResponse<PageResponse<NoticeSummaryResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.success(
                noticeService.findAll(PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), MAX_PAGE_SIZE))));
    }

    @GetMapping("/{id}")
    public ApiResponse<NoticeDetailResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(noticeService.findById(id));
    }
}
