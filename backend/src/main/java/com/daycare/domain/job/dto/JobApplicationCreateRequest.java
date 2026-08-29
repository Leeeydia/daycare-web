package com.daycare.domain.job.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JobApplicationCreateRequest(
        @NotBlank(message = "성함을 입력해 주세요.")
        @Size(min = 2, max = 30, message = "성함은 2자 이상 30자 이하로 입력해 주세요.")
        String name,

        @NotBlank(message = "연락처를 입력해 주세요.")
        String phone,

        boolean hasCertificate,

        @NotBlank(message = "희망 근무 형태를 선택해 주세요.")
        String preferredWorkType,

        @Size(max = 1000, message = "경력·희망사항은 1000자 이내로 입력해 주세요.")
        String memo,

        @AssertTrue(message = "개인정보 수집·이용에 동의해 주세요.")
        boolean privacyAgreed
) {
}
