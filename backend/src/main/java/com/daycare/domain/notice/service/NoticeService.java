package com.daycare.domain.notice.service;

import com.daycare.domain.notice.dto.NoticeDetailResponse;
import com.daycare.domain.notice.dto.NoticeSummaryResponse;
import com.daycare.domain.notice.entity.Notice;
import com.daycare.domain.notice.repository.NoticeRepository;
import com.daycare.global.common.PageResponse;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.NoticeErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    @Transactional(readOnly = true)
    public PageResponse<NoticeSummaryResponse> findAll(Pageable pageable) {
        return PageResponse.from(
                noticeRepository.findAllByOrderByPinnedDescIdDesc(pageable).map(NoticeSummaryResponse::from));
    }

    /** 상세 조회 시 조회수를 1 증가시킨다. */
    @Transactional
    public NoticeDetailResponse findById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new BusinessException(NoticeErrorCode.NOTICE_NOT_FOUND));
        noticeRepository.increaseViewCount(id);
        return noticeRepository.findById(id)
                .map(NoticeDetailResponse::from)
                .orElse(NoticeDetailResponse.from(notice));
    }
}
