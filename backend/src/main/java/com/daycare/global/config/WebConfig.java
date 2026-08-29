package com.daycare.global.config;

import com.daycare.global.ratelimit.RateLimitInterceptor;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AppProperties appProperties;
    private final RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(appProperties.cors().allowedOrigins())
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    /** 업로드된 이미지 서빙 — 운영에서는 nginx가 같은 경로를 직접 서빙한다. */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get(appProperties.upload().dir()).toAbsolutePath().normalize();
        registry.addResourceHandler(appProperties.upload().urlPrefix() + "/**")
                .addResourceLocations(uploadDir.toUri().toString());
    }

    /** 공개 POST 엔드포인트에 IP 기준 rate limit 적용 (스팸 방지) */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/api/v1/consults", "/api/v1/qna", "/api/v1/qna/*/verify",
                        "/api/v1/job-applications");
    }
}
