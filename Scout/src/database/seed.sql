-- Cohort Seed data
INSERT INTO cohorts (
  "cohort_name"
)
VALUES (
  'MCSPA-2310'
),
(
  'MSCPB-2310'
);

-- User seed data

INSERT INTO users (
    "email",
    "user_name",
    "password_hash",
    "role",
    "cohort_id"
  )
  VALUES
-- Example 1
('admin1@example.com', 'JeffAdmin', '{"hash": "password123"}', 1, 1),
-- Example 2
('user1@example.com', 'CarlStudent', '{"hash": "pass456"}', 0, 2);

-- partner_jobs data

INSERT INTO partner_jobs (
  "job_title",
  "description",
  "company",
  "location",
  "salary_range",
  "is_admin",
  "post_url",
  "job_type",
  "is_partner",
  "competencies"
)
   VALUES
-- Example 1
('Software Developer', 'Exciting role in software development', 'Tech Company', 'LocationA', 'Competitive', false, 'joburl1', 'Full-time', true, '{"skill1": true, "skill2": false}'),
-- Example 2

('Marketing Specialist', 'Join our marketing team', 'Marketing Agency', 'LocationB', 'Negotiable', true, 'joburl2', 'Part-time', false, '{"skill3": true, "skill4": true}'),
-- Example 3

('Data Scientist', 'Explore data science opportunities', 'Data Analytics Co.', 'LocationC', 'Highly Competitive', false, 'joburl3', 'Full-time', true, '{"skill5": true, "skill6": true}'),
-- Example 4

('UX/UI Designer', 'Create stunning user experiences', 'Design Studio', 'LocationD', 'Salary DOE', true, 'joburl4', 'Full-time', false, '{"skill7": true, "skill8": false}'),
-- Example 5

('Sales Representative', 'Join our dynamic sales team', 'Sales Solutions Ltd.', 'LocationE', 'Commission-based', false, 'joburl5', 'Full-time', true, '{"skill9": true, "skill10": false}'),
-- Example 6

('Project Manager', 'Lead exciting projects', 'Project Management Co.', 'LocationF', 'Competitive', false, 'joburl6', 'Full-time', true, '{"skill11": true, "skill12": true}'),
-- Example 7

('Content Writer', 'Create compelling content', 'Content Creations Inc.', 'LocationG', 'Negotiable', true, 'joburl7', 'Part-time', false, '{"skill13": true, "skill14": false}'),
-- Example 8

('Customer Support Specialist', 'Provide excellent customer service', 'Support Solutions', 'LocationH', 'Salary DOE', false, 'joburl8', 'Full-time', true, '{"skill15": true, "skill16": true}'),
-- Example 9

('Financial Analyst', 'Analyze financial data', 'Finance Corp.', 'LocationI', 'Competitive', false, 'joburl9', 'Full-time', true, '{"skill17": true, "skill18": false}'),
-- Example 10

('Human Resources Manager', 'Manage HR functions', 'HR Services Ltd.', 'LocationJ', 'Negotiable', true, 'joburl10', 'Full-time', false, '{"skill19": true, "skill20": true}');

-- job_status seed data

INSERT INTO job_status (
    "user_id",
    "cohort_id",
    "job_id",
    "column_id",
    "row_num",
    "note_id",
    "interview_status",
    "tags"
  )
VALUES
-- Example 1
(2, 2, 1, 1, 1, 1, 'Interview Scheduled', '{"technical_round": "pending", "hr_round": "pending"}'),

-- Example 2
 (2, 2, 2, 2, 2, 2, 'Offer Extended', '{"negotiation": "in-progress"}'),

-- Example 3
 (2, 2, 3, 3, 3, 3, 'Application Received', NULL),

-- Example 4
 (2, 2, 4, 4, 4, 4, 'Interview Completed', '{"feedback": "positive"}'),

-- Example 5
 (2, 2, 5, 5, 5, 5, 'Application Submitted', NULL),

-- Example 6
 (2, 2, 6, 6, 6, 6, 'Offer Declined', '{"reason": "salary not competitive"}'),

-- Example 7
 (2, 2, 7, 7, 7, 7, 'Interview Scheduled', '{"technical_round": "pending", "hr_round": "pending"}'),

-- Example 8
 (2, 2, 8, 8, 8, 8, 'Offer Accepted', '{"start_date": "2024-02-01"}'),

-- Example 9
 (2, 2, 9, 9, 9, 9, 'Application Received', NULL),

-- Example 10
(2, 2, 10, 10, 10, 10, 'Interview Completed', '{"feedback": "neutral"}');

-- user_notes seed data

INSERT INTO "user_notes" (
  "job_status_id",
  "note_content"
) VALUES
-- Example 1
( 1, `I was fired before I was even hired`),

-- Example 2
( 2, `Bro didn't even shake my hand in the interview`),

-- Example 3
( 3, `I feel like I killed it on this one`),

-- Example 4
(4, `When I showed up for the interview the assistant kept mouthing the word 'run' to me, idk.`),

-- Example 5
(5, `They told me my name had to be Adam to be a part of Adam's Coders`),

-- Example 6
(6, `I accidentally introduced myself with 'Hi, welcome to chili's!'`),

-- Example 7
(7, `I really think this is the one`),

-- Example 8
(8, `Noted.`),

-- Example 9
(9, `Looking really promising, I have a follow-up interview next week`),

-- Example 10
(10, `G-Unit products ltd.`)