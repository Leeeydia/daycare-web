package com.daycare.global.file;

import com.daycare.global.config.AppProperties;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.FileErrorCode;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 이미지 로컬 디스크 저장.
 * 저장 경로: {app.upload.dir}/yyyy/MM/{uuid}.{ext}
 * 서빙 경로: {app.upload.url-prefix}/yyyy/MM/{uuid}.{ext} — 운영에서는 nginx가 같은 경로를 직접 서빙한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final List<String> ALLOWED_EXTENSIONS = List.of("jpg", "jpeg", "png", "webp", "gif");
    private static final DateTimeFormatter DIR_FORMAT = DateTimeFormatter.ofPattern("yyyy/MM");

    private final AppProperties appProperties;

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(FileErrorCode.EMPTY_FILE);
        }
        if (file.getSize() > appProperties.upload().maxBytes()) {
            throw new BusinessException(FileErrorCode.FILE_TOO_LARGE);
        }

        String extension = extractExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BusinessException(FileErrorCode.UNSUPPORTED_EXTENSION);
        }

        String datePath = LocalDate.now().format(DIR_FORMAT);
        String fileName = UUID.randomUUID().toString().replace("-", "") + "." + extension;

        Path baseDir = Paths.get(appProperties.upload().dir()).toAbsolutePath().normalize();
        Path targetDir = baseDir.resolve(datePath).normalize();
        if (!targetDir.startsWith(baseDir)) {
            throw new BusinessException(FileErrorCode.STORE_FAILED);
        }

        try {
            Files.createDirectories(targetDir);
            try (InputStream in = file.getInputStream()) {
                Files.copy(in, targetDir.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            log.error("파일 저장 실패", e);
            throw new BusinessException(FileErrorCode.STORE_FAILED);
        }

        return "%s/%s/%s".formatted(appProperties.upload().urlPrefix(), datePath, fileName);
    }

    private String extractExtension(String originalFilename) {
        String extension = StringUtils.getFilenameExtension(originalFilename);
        return extension == null ? "" : extension.toLowerCase(Locale.ROOT);
    }
}
