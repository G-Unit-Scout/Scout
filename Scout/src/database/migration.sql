CREATE TABLE "job_status"(
    "status_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "job_id" BIGINT NOT NULL,
    "column_id" BIGINT NOT NULL,
    "row_num" BIGINT NOT NULL,
    "note_id" BIGINT NULL
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
    "cohort_id" VARCHAR(255) NULL
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
    "competencies" JSONB NULL -- Added competencies column
);
ALTER TABLE
    "partner_jobs" ADD PRIMARY KEY("job_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_note_id_foreign" FOREIGN KEY("note_id") REFERENCES "user_notes"("note_id");
ALTER TABLE
    "user_notes" ADD CONSTRAINT "user_notes_job_status_id_foreign" FOREIGN KEY("job_status_id") REFERENCES "job_status"("status_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_job_id_foreign" FOREIGN KEY("job_id") REFERENCES "partner_jobs"("job_id");
ALTER TABLE
    "job_status" ADD CONSTRAINT "job_status_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");