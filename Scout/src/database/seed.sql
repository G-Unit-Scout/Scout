-- Users seed script

-- Example 1
INSERT INTO users VALUES (101, 'admin1@example.com', 'admin1', '{"hash": "hashed_password"}', 1, 'cohortA', '2024-01-15');

-- Example 2
INSERT INTO users VALUES (102, 'user2@example.com', 'user2', '{"hash": "hashed_password"}', 2, 'cohortB', '2024-01-14');

-- Example 3
INSERT INTO users VALUES (103, 'admin3@example.com', 'admin3', '{"hash": "hashed_password"}', 1, 'cohortA', '2024-01-12');

-- Example 4
INSERT INTO users VALUES (104, 'user4@example.com', 'user4', '{"hash": "hashed_password"}', 3, 'cohortC', '2024-01-10');

-- Example 5
INSERT INTO users VALUES (105, 'admin5@example.com', 'admin5', '{"hash": "hashed_password"}', 1, 'cohortA', '2024-01-08');

-- Example 6
INSERT INTO users VALUES (106, 'user6@example.com', 'user6', '{"hash": "hashed_password"}', 4, 'cohortD', '2024-01-06');

-- Example 7
INSERT INTO users VALUES (107, 'admin7@example.com', 'admin7', '{"hash": "hashed_password"}', 1, 'cohortA', '2024-01-04');

-- Example 8
INSERT INTO users VALUES (108, 'user8@example.com', 'user8', '{"hash": "hashed_password"}', 5, 'cohortE', '2024-01-02');

-- Example 9
INSERT INTO users VALUES (109, 'admin9@example.com', 'admin9', '{"hash": "hashed_password"}', 1, 'cohortA', '2013-12-31');

-- Example 10
INSERT INTO users VALUES (110, 'user10@example.com', 'user10', '{"hash": "hashed_password"}', 6, 'cohortF', '2013-12-29');

-- Notifications seed script

-- Example 1
INSERT INTO notifications VALUES (1, 'admin1', 101, '2024-01-15', 'You have a new message', 'New Message', false);

-- Example 2
INSERT INTO notifications VALUES (2, 'user2', 102, '2024-01-14', 'Interview scheduled for next week', 'Interview Update', false);

-- Example 3
INSERT INTO notifications VALUES (3, 'admin3', 103, '2024-01-12', 'Important system update released', 'System Update', false);

-- Example 4
INSERT INTO notifications VALUES (4, 'user4', 104, '2024-01-10', 'Feedback received for your interview', 'Interview Feedback', false);

-- Example 5
INSERT INTO notifications VALUES (5, 'admin5', 105, '2024-01-08', 'New job opportunity matching your skills', 'Job Opportunity', false);

-- Example 6
INSERT INTO notifications VALUES (6, 'user6', 106, '2024-01-06', 'Offer details for your consideration', 'Job Offer', false);

-- Example 7
INSERT INTO notifications VALUES (7, 'admin7', 107, '2024-01-04', 'Reminder: Team meeting tomorrow', 'Meeting Reminder', false);

-- Example 8
INSERT INTO notifications VALUES (8, 'user8', 108, '2024-01-02', 'Congratulations! Your application is accepted', 'Application Status', false);

-- Example 9
INSERT INTO notifications VALUES (9, 'admin9', 109, '2013-12-31', 'Year-end party details announced', 'Year-end Celebration', false);

-- Example 10
INSERT INTO notifications VALUES (10, 'user10', 110, '2013-12-29', 'New training session scheduled for next month', 'Training Update', false);

-- Announcements seed script

-- Example 1
INSERT INTO announcements VALUES (1, '2024-01-15', 101, 'Important company update', 'New Company Policies');

-- Example 2
INSERT INTO announcements VALUES (2, '2024-01-14', 102, 'Team meeting scheduled', 'Upcoming Team Huddle');

-- Example 3
INSERT INTO announcements VALUES (3, '2024-01-12', 103, 'Welcome new team members!', 'Introducing New Teammates');

-- Example 4
INSERT INTO announcements VALUES (4, '2024-01-10', 104, 'Holiday office closure', 'Seasons Greetings');

-- Example 5
INSERT INTO announcements VALUES (5, '2024-01-08', 105, 'Reminder: Quarterly reviews next week', 'Performance Review Notice');

-- Example 6
INSERT INTO announcements VALUES (6, '2024-01-06', 106, 'Congratulations on the successful project completion', 'Project Milestone Achieved');

-- Example 7
INSERT INTO announcements VALUES (7, '2024-01-04', 107, 'Upcoming training session on new tools', 'Training Opportunity');

-- Example 8
INSERT INTO announcements VALUES (8, '2024-01-02', 108, 'Employee of the Month announcement', 'Outstanding Performance Recognized');

-- Example 9
INSERT INTO announcements VALUES (9, '2023-12-31', 109, 'Year-end company party details', 'Celebrate the Year Together');

-- Example 10
INSERT INTO announcements VALUES (10, '2023-12-29', 110, 'Schedule update for next week', 'Revised Weekly Schedule');


-- user_notes seed script

-- Example 1
INSERT INTO user_notes VALUES (1, 1, 'Candidate performed well in the technical round.', '2024-01-15', '2024-01-16');

-- Example 2
INSERT INTO user_notes VALUES (2, 2, 'Offer details discussed with the candidate.', '2024-01-14', '2024-01-15');

-- Example 3
INSERT INTO user_notes VALUES (3, 3, 'Reviewed application, awaiting further assessments.', '2024-01-12', '2024-01-13');

-- Example 4
INSERT INTO user_notes VALUES (4, 4, 'Positive feedback received after the interview.', '2024-01-10', '2024-01-11');

-- Example 5
INSERT INTO user_notes VALUES (5, 5, 'Application materials received, pending review.', '2024-01-08', '2024-01-09');

-- Example 6
INSERT INTO user_notes VALUES (6, 6, 'Candidate declined the offer due to salary concerns.', '2024-01-06', '2024-01-07');

-- Example 7
INSERT INTO user_notes VALUES (7, 7, 'Scheduled upcoming interview rounds.', '2024-01-04', '2024-01-05');

-- Example 8
INSERT INTO user_notes VALUES (8, 8, 'Candidate accepted the job offer.', '2024-01-02', '2024-01-03');

-- Example 9
INSERT INTO user_notes VALUES (9, 9, 'Received application for the open position.', '2023-12-31', '2024-01-01');

-- Example 10
INSERT INTO user_notes VALUES (10, 10, 'Interview feedback provided by the interviewer.', '2023-12-29', '2023-12-30');

-- job_status seed script


-- Example 1
INSERT INTO job_status VALUES (1, 101, 1, 1, 1, NULL, 'Interview Scheduled', '{"technical_round": "pending", "hr_round": "pending"}');

-- Example 2
INSERT INTO job_status VALUES (2, 102, 2, 2, 2, 1, 'Offer Extended', '{"negotiation": "in-progress"}');

-- Example 3
INSERT INTO job_status VALUES (3, 103, 3, 3, 3, NULL, 'Application Received', NULL);

-- Example 4
INSERT INTO job_status VALUES (4, 104, 4, 4, 4, 2, 'Interview Completed', '{"feedback": "positive"}');

-- Example 5
INSERT INTO job_status VALUES (5, 105, 5, 5, 5, NULL, 'Application Submitted', NULL);

-- Example 6
INSERT INTO job_status VALUES (6, 106, 6, 6, 6, 3, 'Offer Declined', '{"reason": "salary not competitive"}');

-- Example 7
INSERT INTO job_status VALUES (7, 107, 7, 7, 7, NULL, 'Interview Scheduled', '{"technical_round": "pending", "hr_round": "pending"}');

-- Example 8
INSERT INTO job_status VALUES (8, 108, 8, 8, 8, 4, 'Offer Accepted', '{"start_date": "2024-02-01"}');

-- Example 9
INSERT INTO job_status VALUES (9, 109, 9, 9, 9, NULL, 'Application Received', NULL);

-- Example 10
INSERT INTO job_status VALUES (10, 110, 10, 10, 10, 5, 'Interview Completed', '{"feedback": "neutral"}');

-- partner_jobs seed script


-- Example 1
INSERT INTO partner_jobs VALUES (1, 'Software Engineer', 'Join our innovative team...', 'Tech Solutions Inc.', 'San Francisco, CA', '$80,000 - $100,000', false, 'https://example.com/job/1', 'Full-time', true);

-- Example 2
INSERT INTO partner_jobs VALUES (2, 'Data Scientist', 'Exciting opportunity for data enthusiasts...', 'Data Insights Co.', 'New York, NY', '$90,000 - $120,000', false, 'https://example.com/job/2', 'Remote', true);

-- Example 3
INSERT INTO partner_jobs VALUES (3, 'Product Manager', 'Lead the product development team...', 'Innovate Innovations Ltd.', 'Seattle, WA', '$100,000 - $130,000', false, 'https://example.com/job/3', 'Full-time', true);

-- Example 4
INSERT INTO partner_jobs VALUES (4, 'UX/UI Designer', 'Craft user-centric designs for our products...', 'Design Studios LLC', 'Los Angeles, CA', '$85,000 - $110,000', false, 'https://example.com/job/4', 'On-site', true);

-- Example 5
INSERT INTO partner_jobs VALUES (5, 'Marketing Specialist', 'Drive marketing campaigns and strategies...', 'Digital Marketing Co.', 'Chicago, IL', '$75,000 - $95,000', false, 'https://example.com/job/5', 'Remote', true);

-- Example 6
INSERT INTO partner_jobs VALUES (6, 'DevOps Engineer', 'Build and maintain scalable infrastructure...', 'Cloud Solutions Ltd.', 'Austin, TX', '$95,000 - $120,000', false, 'https://example.com/job/6', 'Full-time', true);

-- Example 7
INSERT INTO partner_jobs VALUES (7, 'Sales Representative', 'Drive sales growth and client relationships...', 'Sales Dynamics Inc.', 'Miami, FL', '$80,000 - $100,000', false, 'https://example.com/job/7', 'On-site', true);

-- Example 8
INSERT INTO partner_jobs VALUES (8, 'Cybersecurity Analyst', 'Protect our systems from cyber threats...', 'Secure Solutions Co.', 'Denver, CO', '$90,000 - $115,000', false, 'https://example.com/job/8', 'Remote', true);

-- Example 9
INSERT INTO partner_jobs VALUES (9, 'Customer Support Specialist', 'Provide exceptional support to our customers...', 'Customer Care Services Ltd.', 'Atlanta, GA', '$70,000 - $90,000', false, 'https://example.com/job/9', 'Full-time', true);

-- Example 10
INSERT INTO partner_jobs VALUES (10, 'Research Scientist', 'Conduct groundbreaking research in our labs...', 'Research Innovations Inc.', 'Boston, MA', '$100,000 - $130,000', false, 'https://example.com/job/10', 'On-site', true);