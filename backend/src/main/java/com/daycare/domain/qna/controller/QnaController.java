package com.daycare.domain.qna.controller;

import com.daycare.domain.qna.dto.QnaCreateRequest;
import com.daycare.domain.qna.dto.QnaResponse;
import com.daycare.domain.qna.dto.QnaVerifyRequest;
import com.daycare.domain.qna.service.QnaService;
import com.daycare.global.common.ApiResponse;
import com.daycare.global.common.PageResponse;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/qna")
@RequiredArgsConstructor
public class QnaController {

    private static final int MAX_PAGE_SIZE = 50;

    private final QnaService qnaService;

    @GetMapping
    public ApiResponse<PageResponse<QnaResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.success(
                qnaService.findAll(PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), MAX_PAGE_SIZE))));
    }

    @GetMapping("/{id}")
    public ApiResponse<QnaResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(qnaService.findById(id));
    }

    /** 비밀글 비밀번호 확인 (별도 API) */
    @PostMapping("/{id}/verify")
    public ApiResponse<QnaResponse> verify(@PathVariable Long id, @Valid @RequestBody QnaVerifyRequest request) {
        return ApiResponse.success(qnaService.verifyAndFind(id, request.password()));
    }

    /** 문의 등록. IP당 분당 5회 제한. */
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Long>>> create(@Valid @RequestBody QnaCreateRequest request) {
        Long id = qnaService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(Map.of("id", id)));
    }
}
