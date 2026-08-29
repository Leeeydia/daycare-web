package com.daycare.domain.consult.entity;

/** 상담 처리 상태 */
public enum ConsultStatus {
    NEW("신규"),
    CONTACTED("연락완료"),
    DONE("종결");

    private final String label;

    ConsultStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
