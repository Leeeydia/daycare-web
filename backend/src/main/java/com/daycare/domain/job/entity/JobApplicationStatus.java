package com.daycare.domain.job.entity;

/** 구직 신청 처리 상태 */
public enum JobApplicationStatus {
    NEW("신규"),
    CONTACTED("연락완료"),
    DONE("종결");

    private final String label;

    JobApplicationStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
