import db from '../../database/db.js';

const fetchControllers = {

  fetchPartnerJobs: async (req, res) => {
    const partnerJobQuery = `SELECT * FROM partner_jobs WHERE is_admin = true;`
    try {
      const results = await db.query(partnerJobQuery)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching jobs ${error}`)
      res.status(500).send('Error, could not fetch jobs list')
    }
  },

  fetchUsers: async (req,res) => {
    const usersQuery = `SELECT * FROM users;`
    try {
      const results = await db.query(usersQuery)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching users ${error}`)
      res.status(500).send(`Error, could not fetch users`)
    }
  },

  fetchAnnouncements: async (req,res) => {
    const announcementQuery = `SELECT * FROM announcements;`
    try  {
      const results = await db.query(announcementQuery)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching announcements ${error}`)
      res.status(500).send(`Error, could not fetch announcements`)
    }
  },

  fetchNotifications: async (req,res) => {
    const userID = req.params.id
    const notificationQuery = `SELECT * FROM notifications WHERE created_for = $1 AND read = false;`
    try  {
      console.log(`Joo did shtuff`)
      const results = await db.query(notificationQuery,[userID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching notifications ${error}`)
      res.status(500).send(`Error, could not fetch notifications`)
    }
  },

  fetchStudentKanban: async (req,res) => {
    const userID = req.params.id
    const kanbanQuery = ` SELECT
     job_status.*,
     partner_jobs.*,
     user_notes.*,
     users.user_name
     FROM
     job_status
     JOIN users ON job_status.user_id = users.user_id
     JOIN partner_jobs ON job_status.job_id = partner_jobs.job_id
     JOIN user_notes ON job_status.note_id = user_notes.note_id
     WHERE users.user_id = $1;`
     try {
      const results = await db.query(kanbanQuery,[userID])
      res.status(200).send(results.rows)
     } catch(error) {
      console.error(`Error fetching kanban ${error}`)
      res.status(500).send(`Error, couldn't fetch student kanban`)
     }
  },

  fetchCohortKanban: async (req,res) => {
    const cohortID = req.params.id
    const cohortKanbanQuery =   `SELECT
    job_status.*,
    partner_jobs.*,
    user_notes.*,
    users.user_name
    FROM job_status
    JOIN cohorts ON job_status.cohort_id = cohorts.cohort_id
    JOIN partner_jobs ON job_status.job_id = partner_jobs.job_id
    JOIN user_notes ON job_status.note_id = user_notes.note_id
    JOIN users ON job_status.user_id = users.user_id
    WHERE cohorts.cohort_id = $1;`
    try {
      const results = await db.query(cohortKanbanQuery,[cohortID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching cohort kanban ${error}`)
      res.status(500).send(`Error, could not fetch cohort kanban`)
    }
  },

  fetchCohorts: async (req,res) => {
    const cohortQuery = `SELECT * FROM cohorts;`
    try {
      const results = await db.query(cohortQuery)
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching cohorts ${error}`)
      res.status(500).send(`Error, could not fetch cohorts`)
    }
  },

  fetchUserName: async (req, res) => {
    const userID = req.params.id
    const userQuery = `SELECT user_name, role FROM users WHERE user_id = $1`

    try {
      const results = await db.query(userQuery,[userID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error fetching user name ${error}`)
      res.status(500).send(`Error, could not fetch user name`)
    }
  },

};

export default fetchControllers