package com.daycare.domain.consult.controller;

import com.daycare.domain.consult.dto.ConsultCreateRequest;
import com.daycare.domain.consult.dto.ConsultCreateResponse;
import com.daycare.domain.consult.service.ConsultService;
import com.daycare.global.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/consults")
@RequiredArgsConstructor
public class ConsultController {

    private final ConsultService consultService;

    /** 상담 신청 (간편/상세 공용). IP당 분당 5회 제한. */
    @PostMapping
    public ResponseEntity<ApiResponse<ConsultCreateResponse>> create(@Valid @RequestBody ConsultCreateRequest request) {
        ConsultCreateResponse response = consultService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }
}
