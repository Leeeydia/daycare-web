package com.daycare.global.ratelimit;

import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.CommonErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

/** 공개 POST 엔드포인트에 IP당 분당 5회 제한을 적용한다. */
@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimiter rateLimiter;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!HttpMethod.POST.matches(request.getMethod())) {
            return true;
        }
        String key = clientIp(request) + ":" + request.getRequestURI();
        if (!rateLimiter.tryConsume(key)) {
            throw new BusinessException(CommonErrorCode.TOO_MANY_REQUESTS);
        }
        return true;
    }

    /** nginx 리버스 프록시 뒤에서도 실제 클라이언트 IP를 얻는다. */
    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (StringUtils.hasText(forwarded)) {
            return forwarded.split(",")[0].trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        return StringUtils.hasText(realIp) ? realIp : request.getRemoteAddr();
    }
}
