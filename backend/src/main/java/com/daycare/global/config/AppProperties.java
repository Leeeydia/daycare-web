package com.daycare.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 센터/업로드/CORS 관련 애플리케이션 설정.
 * 값은 application.yml 및 환경변수에서 주입한다.
 */
@ConfigurationProperties(prefix = "app")
public record AppProperties(Center center, Upload upload, Cors cors, Admin admin) {

    public record Admin(String initialUsername, String initialPassword, String initialName) {}

    public record Center(String name) {}

    public record Upload(String dir, String urlPrefix, long maxBytes) {}

    public record Cors(String[] allowedOrigins) {}
}
