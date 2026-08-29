package com.daycare.domain.consult.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * 상담 신청 요청.
 * 간편상담은 name/phone/privacyAgreed만, 상세 상담은 hasGrade/memo까지 함께 보낸다.
 */
public record ConsultCreateRequest(
        @NotBlank(message = "성함을 입력해 주세요.")
        @Size(min = 2, max = 30, message = "성함은 2자 이상 30자 이하로 입력해 주세요.")
        String name,

        @NotBlank(message = "연락처를 입력해 주세요.")
        String phone,

        String hasGrade,

        @Size(max = 1000, message = "문의 내용은 1000자 이내로 입력해 주세요.")
        String memo,

        @AssertTrue(message = "개인정보 수집·이용에 동의해 주세요.")
        boolean privacyAgreed
) {
}
