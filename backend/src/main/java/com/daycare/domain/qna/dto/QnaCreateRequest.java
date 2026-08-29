package com.daycare.domain.qna.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record QnaCreateRequest(
        @NotBlank(message = "성함을 입력해 주세요.")
        @Size(min = 2, max = 30, message = "성함은 2자 이상 30자 이하로 입력해 주세요.")
        String name,

        @NotBlank(message = "연락처를 입력해 주세요.")
        String phone,

        @NotBlank(message = "비밀번호를 입력해 주세요.")
        @Pattern(regexp = "\\d{4}", message = "비밀번호는 숫자 4자리로 입력해 주세요.")
        String password,

        @NotBlank(message = "문의 내용을 입력해 주세요.")
        @Size(min = 10, max = 1000, message = "문의 내용은 10자 이상 1000자 이내로 입력해 주세요.")
        String question,

        boolean isSecret,

        @AssertTrue(message = "개인정보 수집·이용에 동의해 주세요.")
        boolean privacyAgreed
) {
}
