package com.daycare.domain.job.controller;

import com.daycare.domain.job.dto.JobPostingResponse;
import com.daycare.domain.job.service.JobService;
import com.daycare.global.common.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ApiResponse<List<JobPostingResponse>> list() {
        return ApiResponse.success(jobService.findAllPostings());
    }

    @GetMapping("/{id}")
    public ApiResponse<JobPostingResponse> detail(@PathVariable Long id) {
        return ApiResponse.success(jobService.findPosting(id));
    }
}
