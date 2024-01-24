CREATE TABLE IF NOT EXISTS "cohorts" (
    "cohort_id" SERIAL PRIMARY KEY,
    "cohort_name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
    "user_id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password_hash" JSON NOT NULL,
    "role" BIGINT NOT NULL,
    "cohort_id" BIGINT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("cohort_id")
);

CREATE TABLE IF NOT EXISTS "partner_jobs" (
    "job_id" SERIAL PRIMARY KEY,
    "job_title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "salary_range" VARCHAR(255) NULL,
    "is_admin" BOOLEAN NOT NULL,
    "post_url" TEXT NULL,
    "job_type" VARCHAR(255) NULL,
    "is_partner" BOOLEAN NOT NULL,
    "competencies" JSON NULL
);

CREATE TABLE IF NOT EXISTS "job_status" (
    "status_id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "cohort_id" BIGINT NOT NULL,
    "job_id" BIGINT NOT NULL,
    "column_id" BIGINT NOT NULL,
    "row_num" BIGINT NOT NULL,
    "note_id" BIGINT NULL,
    "interview_status" VARCHAR(50) NULL,
    "tags" JSON NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
    FOREIGN KEY ("job_id") REFERENCES "partner_jobs"("job_id"),
    FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("cohort_id")
);

CREATE TABLE IF NOT EXISTS "user_notes" (
    "note_id" SERIAL PRIMARY KEY,
    "job_status_id" BIGINT NOT NULL,
    "note_content" TEXT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("job_status_id") REFERENCES "job_status"("status_id")
);

ALTER TABLE "job_status"
ADD CONSTRAINT "job_status_note_id_foreign"
FOREIGN KEY ("note_id") REFERENCES "user_notes"("note_id");

CREATE TABLE IF NOT EXISTS "announcements" (
    "id" SERIAL PRIMARY KEY,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "creator_id" BIGINT NOT NULL,
    "message" TEXT NOT NULL,
    "header" VARCHAR(125) NOT NULL,
    FOREIGN KEY ("creator_id") REFERENCES "users"("user_id")
);

CREATE TABLE IF NOT EXISTS "notifications" (
    "id" SERIAL PRIMARY KEY,
    "created_by" VARCHAR(100) NULL,
    "created_for" BIGINT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "header" VARCHAR(125) NOT NULL,
    "read" BOOLEAN NOT NULL,
    FOREIGN KEY ("created_for") REFERENCES "users"("user_id")
);