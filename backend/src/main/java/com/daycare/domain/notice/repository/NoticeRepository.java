package com.daycare.domain.notice.repository;

import com.daycare.domain.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    /** 상단 고정 공지를 먼저, 그다음 최신순으로 정렬 */
    Page<Notice> findAllByOrderByPinnedDescIdDesc(Pageable pageable);

    /** 동시 조회 시 조회수가 유실되지 않도록 UPDATE 쿼리로 증가시킨다. */
    @Modifying(clearAutomatically = true)
    @Query("update Notice n set n.viewCount = n.viewCount + 1 where n.id = :id")
    int increaseViewCount(@Param("id") Long id);
}
