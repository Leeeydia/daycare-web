package com.daycare.domain.job.repository;

import com.daycare.domain.job.entity.JobApplication;
import com.daycare.domain.job.entity.JobApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    Page<JobApplication> findAllByOrderByIdDesc(Pageable pageable);

    long countByStatus(JobApplicationStatus status);
}
