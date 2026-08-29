package com.daycare.domain.job.repository;

import com.daycare.domain.job.entity.JobPosting;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

    /** 모집중인 공고를 먼저, 그다음 최신순 */
    List<JobPosting> findAllByOrderByOpenDescIdDesc();
}
