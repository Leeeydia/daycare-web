package com.daycare.domain.job.controller;

import com.daycare.domain.job.dto.JobApplicationCreateRequest;
import com.daycare.domain.job.service.JobService;
import com.daycare.global.common.ApiResponse;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/job-applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobService jobService;

    /** 구직 신청. IP당 분당 5회 제한. */
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Long>>> apply(
            @Valid @RequestBody JobApplicationCreateRequest request) {
        Long id = jobService.apply(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(Map.of("id", id)));
    }
}
