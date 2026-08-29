package com.daycare.domain.qna.repository;

import com.daycare.domain.qna.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna, Long> {

    Page<Qna> findAllByOrderByIdDesc(Pageable pageable);

    long countByAnswerIsNull();
}
