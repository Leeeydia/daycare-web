package com.daycare.domain.program.controller;

import com.daycare.domain.program.dto.ProgramResponse;
import com.daycare.domain.program.service.ProgramService;
import com.daycare.global.common.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @GetMapping
    public ApiResponse<List<ProgramResponse>> list() {
        return ApiResponse.success(programService.findAll());
    }
}
