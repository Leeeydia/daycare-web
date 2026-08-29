-- 주간노인복지센터 초기 스키마
-- 스키마 변경은 반드시 새 마이그레이션 파일(V{n}__desc.sql)로 추가한다.

CREATE TABLE admin (
    id                   BIGINT       NOT NULL AUTO_INCREMENT,
    username             VARCHAR(50)  NOT NULL,
    password             VARCHAR(100) NOT NULL,
    name                 VARCHAR(50)  NOT NULL,
    must_change_password TINYINT(1)   NOT NULL DEFAULT 1,
    failed_login_count   INT          NOT NULL DEFAULT 0,
    locked_until         DATETIME(6)  NULL,
    created_at           DATETIME(6)  NOT NULL,
    updated_at           DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_admin_username (username)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 상담 신청 (간편/상세 공용)
CREATE TABLE consult (
    id                    BIGINT      NOT NULL AUTO_INCREMENT,
    name                  VARCHAR(30) NOT NULL,
    phone                 VARCHAR(20) NOT NULL,
    has_grade             VARCHAR(20) NOT NULL,
    memo                  TEXT        NULL,
    status                VARCHAR(20) NOT NULL,
    privacy_agreed        TINYINT(1)  NOT NULL,
    admin_memo            TEXT        NULL,
    notify_status         VARCHAR(20) NOT NULL,
    notified_at           DATETIME(6) NULL,
    notify_failure_reason VARCHAR(255) NULL,
    created_at            DATETIME(6) NOT NULL,
    updated_at            DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_consult_status_id (status, id DESC),
    KEY idx_consult_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE notice (
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    title      VARCHAR(200) NOT NULL,
    content    LONGTEXT     NOT NULL,
    pinned     TINYINT(1)   NOT NULL DEFAULT 0,
    view_count BIGINT       NOT NULL DEFAULT 0,
    created_at DATETIME(6)  NOT NULL,
    updated_at DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_notice_pinned_id (pinned DESC, id DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE notice_attachment (
    notice_id BIGINT       NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url  VARCHAR(500) NOT NULL,
    file_size BIGINT       NOT NULL,
    KEY idx_notice_attachment_notice (notice_id),
    CONSTRAINT fk_notice_attachment_notice FOREIGN KEY (notice_id) REFERENCES notice (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE program (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    image_url   VARCHAR(500) NULL,
    category    VARCHAR(30)  NOT NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    created_at  DATETIME(6)  NOT NULL,
    updated_at  DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_program_sort (sort_order, id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE program_effect (
    program_id BIGINT      NOT NULL,
    effect     VARCHAR(50) NOT NULL,
    KEY idx_program_effect_program (program_id),
    CONSTRAINT fk_program_effect_program FOREIGN KEY (program_id) REFERENCES program (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE gallery_post (
    id               BIGINT        NOT NULL AUTO_INCREMENT,
    title            VARCHAR(200)  NOT NULL,
    description      VARCHAR(1000) NULL,
    program_category VARCHAR(30)   NOT NULL,
    created_at       DATETIME(6)   NOT NULL,
    updated_at       DATETIME(6)   NOT NULL,
    PRIMARY KEY (id),
    KEY idx_gallery_category_id (program_category, id DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE gallery_post_image (
    gallery_post_id BIGINT       NOT NULL,
    sort_order      INT          NOT NULL,
    image_url       VARCHAR(500) NOT NULL,
    PRIMARY KEY (gallery_post_id, sort_order),
    CONSTRAINT fk_gallery_image_post FOREIGN KEY (gallery_post_id) REFERENCES gallery_post (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE qna (
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    name           VARCHAR(30)  NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    password       VARCHAR(100) NOT NULL,
    question       TEXT         NOT NULL,
    answer         TEXT         NULL,
    answered_at    DATETIME(6)  NULL,
    is_secret      TINYINT(1)   NOT NULL DEFAULT 1,
    privacy_agreed TINYINT(1)   NOT NULL,
    created_at     DATETIME(6)  NOT NULL,
    updated_at     DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_qna_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE job_posting (
    id           BIGINT       NOT NULL AUTO_INCREMENT,
    title        VARCHAR(200) NOT NULL,
    job_position VARCHAR(50)  NOT NULL,
    work_type    VARCHAR(20)  NOT NULL,
    pay_info     VARCHAR(200) NOT NULL,
    content      LONGTEXT     NOT NULL,
    is_open      TINYINT(1)   NOT NULL DEFAULT 1,
    created_at   DATETIME(6)  NOT NULL,
    updated_at   DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_job_posting_open_id (is_open DESC, id DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE job_application (
    id                    BIGINT      NOT NULL AUTO_INCREMENT,
    name                  VARCHAR(30) NOT NULL,
    phone                 VARCHAR(20) NOT NULL,
    has_certificate       TINYINT(1)  NOT NULL,
    preferred_work_type   VARCHAR(20) NOT NULL,
    memo                  TEXT        NULL,
    status                VARCHAR(20) NOT NULL,
    privacy_agreed        TINYINT(1)  NOT NULL,
    notify_status         VARCHAR(20) NOT NULL,
    notified_at           DATETIME(6) NULL,
    notify_failure_reason VARCHAR(255) NULL,
    created_at            DATETIME(6) NOT NULL,
    updated_at            DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_job_application_status_id (status, id DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE meal_plan (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    week_start_date DATE         NOT NULL,
    week_end_date   DATE         NOT NULL,
    image_url       VARCHAR(500) NULL,
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_meal_plan_week_start (week_start_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE meal_plan_day (
    id           BIGINT      NOT NULL AUTO_INCREMENT,
    meal_plan_id BIGINT      NOT NULL,
    day_label    VARCHAR(5)  NOT NULL,
    date         DATE        NOT NULL,
    snack        VARCHAR(200) NULL,
    PRIMARY KEY (id),
    KEY idx_meal_plan_day_plan (meal_plan_id),
    CONSTRAINT fk_meal_plan_day_plan FOREIGN KEY (meal_plan_id) REFERENCES meal_plan (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE meal_plan_lunch (
    meal_plan_day_id BIGINT       NOT NULL,
    sort_order       INT          NOT NULL,
    menu             VARCHAR(100) NOT NULL,
    PRIMARY KEY (meal_plan_day_id, sort_order),
    CONSTRAINT fk_meal_plan_lunch_day FOREIGN KEY (meal_plan_day_id) REFERENCES meal_plan_day (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
