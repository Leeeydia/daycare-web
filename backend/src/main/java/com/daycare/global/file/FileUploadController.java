package com.daycare.global.file;

import com.daycare.global.common.ApiResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** 관리자 이미지 업로드 (공지 에디터, 활동앨범, 식단표 등에서 사용) */
@RestController
@RequestMapping("/api/v1/admin/files")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/images")
    public ApiResponse<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        return ApiResponse.success(Map.of("url", fileStorageService.store(file)));
    }
}
