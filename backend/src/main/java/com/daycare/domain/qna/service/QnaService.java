package com.daycare.domain.qna.service;

import com.daycare.domain.qna.dto.QnaCreateRequest;
import com.daycare.domain.qna.dto.QnaResponse;
import com.daycare.domain.qna.entity.Qna;
import com.daycare.domain.qna.repository.QnaRepository;
import com.daycare.global.common.PageResponse;
import com.daycare.global.common.PhoneNumber;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.QnaErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class QnaService {

    private final QnaRepository qnaRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public PageResponse<QnaResponse> findAll(Pageable pageable) {
        return PageResponse.from(qnaRepository.findAllByOrderByIdDesc(pageable).map(QnaResponse::masked));
    }

    /** 공개글은 전체 내용, 비밀글은 잠금 표시만 반환한다. */
    @Transactional(readOnly = true)
    public QnaResponse findById(Long id) {
        Qna qna = getOrThrow(id);
        return qna.isSecret() ? QnaResponse.masked(qna) : QnaResponse.full(qna);
    }

    /** 비밀글 비밀번호 확인 — 일치하면 전체 내용을 반환한다. */
    @Transactional(readOnly = true)
    public QnaResponse verifyAndFind(Long id, String rawPassword) {
        Qna qna = getOrThrow(id);
        if (!qna.isSecret()) {
            return QnaResponse.full(qna);
        }
        if (!passwordEncoder.matches(rawPassword, qna.getPassword())) {
            throw new BusinessException(QnaErrorCode.PASSWORD_MISMATCH);
        }
        return QnaResponse.full(qna);
    }

    @Transactional
    public Long create(QnaCreateRequest request) {
        if (!request.privacyAgreed()) {
            throw new BusinessException(QnaErrorCode.PRIVACY_NOT_AGREED);
        }
        String phone = PhoneNumber.normalize(request.phone());
        if (phone == null) {
            throw new BusinessException(QnaErrorCode.PASSWORD_MISMATCH, "휴대폰 번호를 정확히 입력해 주세요.");
        }

        Qna qna = Qna.create(
                request.name().trim(),
                phone,
                passwordEncoder.encode(request.password()),
                request.question().trim(),
                request.isSecret(),
                true
        );
        Qna saved = qnaRepository.save(qna);
        log.info("문의 등록 id={} 이름={} 비밀글={}", saved.getId(), PhoneNumber.maskName(saved.getName()), saved.isSecret());
        return saved.getId();
    }

    private Qna getOrThrow(Long id) {
        return qnaRepository.findById(id)
                .orElseThrow(() -> new BusinessException(QnaErrorCode.QNA_NOT_FOUND));
    }
}
