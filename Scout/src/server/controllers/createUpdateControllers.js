import db from '../../database/db.js'

const createUpdateControllers = {
  addJob: async (req, res) => {
    const { jobDetails } = req.body
    const jobData = Object.values(jobDetails)
    const addJobQuery = `INSERT INTO partner_jobs (
      job_title,
      description,
      company,
      location,
      salary_range,
      is_admin,
      post_url,
      job_type,
      is_partner,
      competencies
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`

    try {
      const results = await db.query(addJobQuery,jobData)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error creating job ${error}`)
      res.status(500).send(`Error, could not create job`)
    }
  },

  addJobAddStatus: async (req, res) => {
    // Request Data
    const userID = req.params.id;
    const { jobStatus, jobDetails, noteContent } = req.body;
    const jobData = Object.values(jobDetails);
    let statusData = Object.values(jobStatus);


    // Queries Statements
    const addJobQuery = `INSERT INTO partner_jobs (
      job_title,
      description,
      company,
      location,
      salary_range,
      is_admin,
      post_url,
      job_type,
      is_partner,
      competencies
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING job_id;`;

    const addStatusQuery = `INSERT INTO job_status (
      cohort_id,
      column_id,
      row_num,
      note_id,
      interview_status,
      tags,
      job_id,user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING status_id;`;

    const addNoteQuery = `INSERT INTO user_notes (
      job_status_id,
      note_content
      ) VALUES ($1, $2)
      RETURNING note_id;`;

    const updateStatusQuery = `UPDATE job_status
      SET note_id= $2
      WHERE job_id =$1
      RETURNING *`

    try {
      const jobResults = await db.query(addJobQuery,jobData);
      const jobID = jobResults.rows[0].job_id;

      statusData = [...statusData, jobID, userID];

      const statusResults = await db.query(addStatusQuery,statusData);
      const statusID = statusResults.rows[0].status_id;

      // "This is my note that I wrote. I is = gud 4 jaubb"

      const noteResults = await db.query(addNoteQuery, [statusID, noteContent]);
      const noteID = noteResults.rows[0].note_id;

      const updateStatusResults = await db.query(updateStatusQuery,[jobID, noteID])
      res.status(200).send(updateStatusResults.rows)

    } catch(error) {
      console.error(`Error creating job posting and status ${error}`)
      res.status(500).send('Error, could not create job or status')
    }

  }
}

export default createUpdateControllers