package com.daycare.domain.qna.dto;

import com.daycare.domain.qna.entity.Qna;
import com.daycare.global.common.PhoneNumber;
import java.time.LocalDateTime;

/**
 * 문의 응답.
 * 비밀글은 본문·답변을 감춘 형태(masked)로만 목록에 노출한다. 연락처는 어떤 경우에도 응답에 포함하지 않는다.
 */
public record QnaResponse(
        Long id,
        String name,
        String question,
        String answer,
        LocalDateTime answeredAt,
        boolean isSecret,
        boolean answered,
        LocalDateTime createdAt
) {
    /** 목록/비인증 조회용 — 비밀글이면 내용을 비운다. */
    public static QnaResponse masked(Qna qna) {
        boolean hide = qna.isSecret();
        return new QnaResponse(
                qna.getId(),
                PhoneNumber.maskName(qna.getName()),
                hide ? null : qna.getQuestion(),
                hide ? null : qna.getAnswer(),
                hide ? null : qna.getAnsweredAt(),
                qna.isSecret(),
                qna.isAnswered(),
                qna.getCreatedAt()
        );
    }

    /** 비밀번호 확인을 통과했거나 공개글인 경우 — 전체 내용을 노출한다. */
    public static QnaResponse full(Qna qna) {
        return new QnaResponse(
                qna.getId(),
                PhoneNumber.maskName(qna.getName()),
                qna.getQuestion(),
                qna.getAnswer(),
                qna.getAnsweredAt(),
                qna.isSecret(),
                qna.isAnswered(),
                qna.getCreatedAt()
        );
    }
}
