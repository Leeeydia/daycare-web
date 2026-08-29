package com.daycare.domain.consult.repository;

import com.daycare.domain.consult.entity.Consult;
import com.daycare.domain.consult.entity.ConsultStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultRepository extends JpaRepository<Consult, Long> {

    Page<Consult> findByStatusOrderByIdDesc(ConsultStatus status, Pageable pageable);

    Page<Consult> findAllByOrderByIdDesc(Pageable pageable);

    long countByStatus(ConsultStatus status);
}
