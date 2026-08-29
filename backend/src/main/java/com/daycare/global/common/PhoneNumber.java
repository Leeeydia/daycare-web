package com.daycare.global.common;

import java.util.regex.Pattern;

/** 휴대폰 번호 정규화·검증·마스킹 유틸 */
public final class PhoneNumber {

    private static final Pattern NORMALIZED = Pattern.compile("^01[016789]-\\d{3,4}-\\d{4}$");

    private PhoneNumber() {
    }

    /** 입력값에서 숫자만 남긴 뒤 010-1234-5678 형태로 변환한다. 형식이 아니면 null을 반환한다. */
    public static String normalize(String raw) {
        if (raw == null) {
            return null;
        }
        String digits = raw.replaceAll("\\D", "");
        String formatted;
        if (digits.length() == 11) {
            formatted = digits.substring(0, 3) + "-" + digits.substring(3, 7) + "-" + digits.substring(7);
        } else if (digits.length() == 10) {
            formatted = digits.substring(0, 3) + "-" + digits.substring(3, 6) + "-" + digits.substring(6);
        } else {
            return null;
        }
        return NORMALIZED.matcher(formatted).matches() ? formatted : null;
    }

    /** 홍길동 → 홍*동 (이름 가운데 마스킹) */
    public static String maskName(String name) {
        if (name == null || name.length() <= 1) {
            return name;
        }
        if (name.length() == 2) {
            return name.charAt(0) + "*";
        }
        return name.charAt(0) + "*".repeat(name.length() - 2) + name.charAt(name.length() - 1);
    }

    /** 로그 출력용 마스킹 — 로그에는 절대 원본 번호를 남기지 않는다. */
    public static String maskPhone(String phone) {
        if (phone == null) {
            return null;
        }
        String digits = phone.replaceAll("\\D", "");
        if (digits.length() < 8) {
            return "***";
        }
        return digits.substring(0, 3) + "-****-" + digits.substring(digits.length() - 4);
    }
}
