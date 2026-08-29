package com.daycare.domain.admin.entity;

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

/** 관리자 계정. 인증 로직은 Phase 4(JWT)에서 확장한다. */
@Entity
@Getter
@Table(name = "admin")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Admin extends BaseTimeEntity {

    private static final int MAX_LOGIN_FAILURES = 5;
    private static final int LOCK_MINUTES = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    /** BCrypt 해시 */
    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private boolean mustChangePassword;

    @Column(nullable = false)
    private int failedLoginCount;

    private LocalDateTime lockedUntil;

    private Admin(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.mustChangePassword = true;
        this.failedLoginCount = 0;
    }

    public static Admin create(String username, String encodedPassword, String name) {
        return new Admin(username, encodedPassword, name);
    }

    public boolean isLocked() {
        return lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now());
    }

    public void recordLoginFailure() {
        this.failedLoginCount += 1;
        if (this.failedLoginCount >= MAX_LOGIN_FAILURES) {
            this.lockedUntil = LocalDateTime.now().plusMinutes(LOCK_MINUTES);
            this.failedLoginCount = 0;
        }
    }

    public void recordLoginSuccess() {
        this.failedLoginCount = 0;
        this.lockedUntil = null;
    }

    public void changePassword(String encodedPassword) {
        this.password = encodedPassword;
        this.mustChangePassword = false;
    }
}
