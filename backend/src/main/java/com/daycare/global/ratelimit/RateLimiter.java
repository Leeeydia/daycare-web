package com.daycare.global.ratelimit;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Component;

/**
 * IP 단위 인메모리 요청 카운터 (고정 윈도우).
 * 단일 인스턴스 운영 기준이며, 다중 인스턴스로 확장하면 Redis 기반으로 교체한다.
 */
@Component
public class RateLimiter {

    private static final Duration WINDOW = Duration.ofMinutes(1);
    private static final int MAX_REQUESTS = 5;
    private static final int CLEANUP_THRESHOLD = 10_000;

    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    /** 허용되면 true, 한도를 초과하면 false */
    public boolean tryConsume(String key) {
        Instant now = Instant.now();
        cleanupIfNeeded(now);

        Window window = windows.compute(key, (k, existing) -> {
            if (existing == null || existing.isExpired(now)) {
                return new Window(now);
            }
            return existing;
        });
        return window.count.incrementAndGet() <= MAX_REQUESTS;
    }

    private void cleanupIfNeeded(Instant now) {
        if (windows.size() < CLEANUP_THRESHOLD) {
            return;
        }
        windows.entrySet().removeIf(entry -> entry.getValue().isExpired(now));
    }

    private static final class Window {
        private final Instant startedAt;
        private final AtomicInteger count = new AtomicInteger();

        private Window(Instant startedAt) {
            this.startedAt = startedAt;
        }

        private boolean isExpired(Instant now) {
            return startedAt.plus(WINDOW).isBefore(now);
        }
    }
}
