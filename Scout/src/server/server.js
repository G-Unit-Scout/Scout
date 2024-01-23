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
  user: 'postgres',
  host: 'localhost',
  database: 'blueoceantest',
  password: 'Hebrews1211',
  port: 9934,
});

app.get('/api/test', async (req,res) => {
  try {
    const result = await pool.query(`SELECT * FROM partner_jobs;`)
    res.status(200).json(result.rows)
  } catch(err) {
    console.error('Error ',err)
    res.status(400).send('Bad Request')
  }
})

// Route to get job postings created by admins
app.get('/admin-job-postings', async (req, res) => {
  try {
    const adminJobQuery = 'SELECT * FROM partner_jobs WHERE is_admin = true;';
    const { adminJobs } = await pool.query(adminJobQuery);
    res.json(adminJobs);
  } catch (error) {
    console.error('Error fetching admin job postings', error);
    res.status(500).send('Server error');
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
