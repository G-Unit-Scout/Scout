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

      const noteResults = await db.query(addNoteQuery, [statusID, noteContent]);
      const noteID = noteResults.rows[0].note_id;

      const updateStatusResults = await db.query(updateStatusQuery,[jobID, noteID])
      res.status(200).send(updateStatusResults.rows)

    } catch(error) {
      console.error(`Error creating job posting and status ${error}`)
      res.status(500).send('Error, could not create job or status')
    }

  },

  updateJobStatus: async (req, res) => {
    console.log('Made it')
    const { noteContent, noteID, jobStatus, statusID, jobDetails, jobID} = req.body;

    let jobQuery = `UPDATE partner_jobs SET`;
    const jobParams = [];

    Object.keys(jobDetails).forEach((key, index) => {
      jobQuery += ` ${key} = $${index + 1},`
      jobParams.push(jobDetails[key])
    });
    jobQuery = jobQuery.slice(0, -1);
    jobQuery += ` WHERE job_id = $${jobParams.length + 1} RETURNING *`;
    jobParams.push(jobID);

    let statusQuery = `UPDATE job_status SET`;
    const statusParams = [];

    Object.keys(jobStatus).forEach((key, index) => {
      statusQuery += ` ${key} = $${index + 1},`
      statusParams.push(jobStatus[key])
    });
    statusQuery = statusQuery.slice(0, -1);
    statusQuery += ` WHERE status_id = $${statusParams.length + 1} RETURNING *`;
    statusParams.push(statusID);

    const noteQuery = `UPDATE user_notes SET note_content = $1 WHERE note_id = $2 RETURNING *`
    const noteParams = [noteContent, noteID]

    try {
      const jobResults = await db.query(jobQuery, jobParams)
      const statusResults = await db.query(statusQuery, statusParams)
      const noteResults = await db.query(noteQuery, noteParams)
      res.status(200).send([jobResults.rows, statusResults.rows, noteResults.rows])
    } catch(error) {
      console.error(`Error updating job, status or notes ${error}`)
      res.status(500).send(`Error, there was a problem updating job, status or notes`)
    }
  },

  addNotification: async (req, res) => {
    const userID = req.params.id
    const { header, message, created_by } = req.body
    const read = false
    const notificationQuery = `INSERT INTO notifications (
      created_by,
      created_for,
      message,
      header,
      read
    ) VALUES ( $1, $2, $3, $4, $5) RETURNING *`;
    const notificationParams = [created_by, userID, message, header, read]

    try {
      const results = await db.query(notificationQuery, notificationParams)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error creating notification ${error}`)
      res.status(500).send(`Error, could not create notification`)
    }
  },

  updateNotification: async (req, res) => {
    const notificationID = req.params.id
    const { read } = req.body
    const notificationQuery = `UPDATE notifications SET read = $1 where id = $2 RETURNING *;`;
    const notificationParams = [read, notificationID]
    try {
      const results = await db.query(notificationQuery, notificationParams)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error updating notification ${error}`)
      res.status(500).send(`Error, could not update notification`)
    }
  },

  addAnnouncement: async (req, res) => {
    const userID = req.params.id
    const { header, message } = req.body
    const announcementQuery = `INSERT INTO announcements (
      creator_id,
      message,
      header
      ) VALUES ( $1, $2, $3) RETURNING *`
      const announcementParams = [ userID, message, header ]

      try {
        const results = await db.query(announcementQuery, announcementParams)
        res.status(200).send(results.rows)
      } catch(error) {
        console.error(`Error creating annoucnement ${error}`)
        res.status(500).send(`Error, could not create announcement`)
      }
  }
}

export default createUpdateControllers