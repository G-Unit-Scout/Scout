import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const app = express();
const { Pool } = pg;
app.use(cors());


// Set up the Express app and PostgreSQL connection
const pool = new Pool({
  // Your database connection details
  connectionString: process.env.DATABASE_URL process.env.DATABASE_URL
});

// test route for users/auth
app.get('/api/test2', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users;');
    console.log(result);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error', error);
    res.status(400).send('Bad Request');
  }
})

// GET routes
app.get('/partnerJobs', async (req, res) => {
  try {
    const partnerJobQuery = 'SELECT * FROM partner_jobs;'
    const results = await pool.query(partnerJobQuery);
    res.status(200).send(results.rows);
  } catch (error) {
    console.error('Error fetching job postings', error);
    res.status(500).send('Server error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const usersQuery = 'SELECT * FROM users;'
    const results = await pool.query(usersQuery);
    res.status(200).send(results.rows)
  } catch(error) {
    console.error("Error fetching users", error);
    res.status(500).send('Server Error')
  }
});

app.get('/announcements', async (req, res) => {
  try {
    const announcementQuery = 'SELECT * FROM announcements;'
    const results = await pool.query(announcementQuery);
    res.status(200).send(results.rows)
  } catch(error) {
    console.error("Error fetching announcements", error);
    res.status(500).send('Server Error')
  }
});

app.get('/notifications', async (req, res) => {
  try {
    const notificationQuery = 'SELECT * FROM notifications;'
    const results = await pool.query(notificationQuery);
    res.status(200).send(results.rows)
  } catch(error) {
    console.error("Error fetching notifications", error);
    res.status(500).send('Server Error')
  }
});

// KanBan GET routes

app.get('/studentKanban/:id' , async (req,res) => {
  const ID = req.params.id
  const kanbanQuery =
  `SELECT job_status.*,partner_jobs.*, user_notes.*, users.user_name
  FROM job_status
  JOIN users ON job_status.user_id = users.user_id
  JOIN partner_jobs ON job_status.job_id = partner_jobs.job_id
  JOIN user_notes ON job_status.note_id = user_notes.note_id
  WHERE users.user_id = $1;`
  try {
    const results = await pool.query(kanbanQuery,[ID])
    res.status(200).send(results.rows)
  } catch(error) {
    console.error('Error fetching kanban' , error);
    res.status(500).send('Server Error')
  }
})

app.get('/adminKanban/:id', async (req,res) => {
  const cohortID = req.params.id
  const cohortKanbanQuery =
  `SELECT job_status.*, partner_jobs.*, user_notes.*, users.user_name
  FROM job_status
  JOIN cohorts ON job_status.cohort_id = cohorts.cohort_id
  JOIN partner_jobs ON job_status.job_id = partner_jobs.job_id
  JOIN user_notes ON job_status.note_id = user_notes.note_id
  JOIN users ON job_status.user_id = users.user_id
  WHERE cohorts.cohort_id = $1;`
  try {
    const results = await pool.query(cohortKanbanQuery,[cohortID])
    res.status(200).send(results.rows)
  } catch(error) {
    console.error('Error retrieving cohort kanban',error)
    res.status(500).send('Server Error')
  }
})


// Start the server
const SERVER = process.env.PORT || 3000;
app.listen(SERVER, () => {
  console.log(`Server running on port ${process.env.PORT || '3000'}`);
});
