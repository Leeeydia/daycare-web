package com.daycare.domain.qna.entity;

import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 온라인 문의 (비회원 작성, 비밀글 지원) */
@Entity
@Getter
@Table(name = "qna")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Qna extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    /** 비회원이 자신의 글을 확인할 때 사용하는 BCrypt 해시 */
    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private LocalDateTime answeredAt;

    @Column(name = "is_secret", nullable = false)
    private boolean secret;

    @Column(nullable = false)
    private boolean privacyAgreed;

    private Qna(String name, String phone, String encodedPassword, String question, boolean secret,
                boolean privacyAgreed) {
        this.name = name;
        this.phone = phone;
        this.password = encodedPassword;
        this.question = question;
        this.secret = secret;
        this.privacyAgreed = privacyAgreed;
    }

    public static Qna create(String name, String phone, String encodedPassword, String question, boolean secret,
                             boolean privacyAgreed) {
        return new Qna(name, phone, encodedPassword, question, secret, privacyAgreed);
    }

    public void writeAnswer(String answer) {
        this.answer = answer;
        this.answeredAt = LocalDateTime.now();
    }

    public boolean isAnswered() {
        return answer != null && !answer.isBlank();
    }
}
