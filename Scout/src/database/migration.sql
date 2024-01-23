CREATE TABLE "notifications"(
    "id" BIGINT NOT NULL,
    "created_by" VARCHAR(255) NOT NULL,
    "created_for" BIGINT NOT NULL,
    "created_at" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "header" VARCHAR(125) NOT NULL,
    "read" BOOLEAN NOT NULL
);
ALTER TABLE
    "notifications" ADD PRIMARY KEY("id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_created_by_unique" UNIQUE("created_by");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_created_for_unique" UNIQUE("created_for");
CREATE TABLE "job_status"(
    "status_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "job_id" BIGINT NOT NULL,
    "column_id" BIGINT NOT NULL,
    "row_num" BIGINT NOT NULL,
    "note_id" BIGINT NULL,
    "interview_status" VARCHAR(50) NULL,
    "tags" JSON NULL
);
ALTER TABLE
    "job_status" ADD PRIMARY KEY("status_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_user_id_unique" UNIQUE("user_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_job_id_unique" UNIQUE("job_id");
CREATE TABLE "users"(
    "user_id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password_hash" JSON NOT NULL,
    "role" BIGINT NULL,
    "cohort_id" VARCHAR(255) NULL,
    "created_at" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("user_id");
CREATE TABLE "user_notes"(
    "note_id" BIGINT NOT NULL,
    "job_status_id" BIGINT NOT NULL,
    "note_content" TEXT NULL,
    "created_at" VARCHAR(255) NOT NULL,
    "updated_at" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user_notes" ADD PRIMARY KEY("note_id");
ALTER TABLE
    "user_notes" ADD CONSTRAINT "user_notes_job_status_id_unique" UNIQUE("job_status_id");
CREATE TABLE "announcements"(
    "id" BIGINT NOT NULL,
    "created_at" VARCHAR(255) NOT NULL,
    "creator_id" BIGINT NOT NULL,
    "message" TEXT NOT NULL,
    "header" VARCHAR(125) NOT NULL
);
ALTER TABLE
    "announcements" ADD PRIMARY KEY("id");
ALTER TABLE
    "announcements" ADD CONSTRAINT "announcements_creator_id_unique" UNIQUE("creator_id");
CREATE TABLE "partner_jobs"(
    "job_id" BIGINT NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NULL,
    "salary_range" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "post_url" TEXT NOT NULL,
    "job_type" VARCHAR(255) NULL,
    "is_partner" BOOLEAN NOT NULL,
    "competencies" JSON NULL
);
ALTER TABLE
    "partner_jobs" ADD PRIMARY KEY("job_id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("user_name");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_note_id_foreign" FOREIGN KEY("note_id") REFERENCES "user_notes"("note_id");
ALTER TABLE
    "user_notes" ADD CONSTRAINT "user_notes_job_status_id_foreign" FOREIGN KEY("job_status_id") REFERENCES "job_status"("status_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_job_id_foreign" FOREIGN KEY("job_id") REFERENCES "partner_jobs"("job_id");
ALTER TABLE
    "announcements" ADD CONSTRAINT "announcements_creator_id_foreign" FOREIGN KEY("creator_id") REFERENCES "job_status"("user_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");
ALTER TABLE
    "notifications" ADD CONSTRAINT "notifications_created_for_foreign" FOREIGN KEY("created_for") REFERENCES "users"("user_id");