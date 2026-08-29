package com.daycare.domain.qna.dto;

import jakarta.validation.constraints.NotBlank;

/** 비밀글 열람용 비밀번호 확인 요청 */
public record QnaVerifyRequest(
        @NotBlank(message = "비밀번호를 입력해 주세요.")
        String password
) {
}
