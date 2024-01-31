import db from "../../database/db.js";

const deleteControllers = {

  deleteJob: async (req, res) => {
    const jobID = req.params.id
    const deleteQuery = `DELETE FROM partner_jobs WHERE job_id = $1 RETURNING *`

    try {
      const results = await db.query(deleteQuery, [jobID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleteing job ${error}`)
      res.status(500).send(`Error, could not delete selected job`)
    }
  },

  deleteUser: async (req, res) => {
    const userID = req.params.id
    const userQuery = `DELETE FROM users WHERE user_id = $1 RETURNING *`

    try {
      const results = await db.query(userQuery,[userID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleting user ${error}`)
      res.status(500).send(`Error, could not delete user`)
    }
  },

  deleteStatus: async (req, res) => {
    const statusID = req.params.id
    const statusQuery = `DELETE FROM job_status WHERE status_id = $1 RETURNING *`

    try {
      const results = await db.query(statusQuery, [statusID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleting job status ${error}`)
      res.status(500).send(`Error, could not delete job status`)
    }
  },

  deleteCohort: async (req, res) => {
    const cohortID = req.params.id
    const cohortQuery = `DELETE FROM cohorts WHERE cohort_id = $1 RETURNING *`

    try {
      const results = await db.query(cohortQuery, [cohortID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleting cohort ${error}`)
      res.status(500).send(`Error, could not delete cohort`)
    }
  },

  deleteNote: async (req, res) => {
    const noteID = req.params.id
    const noteQuery = `DELETE FROM user_notes WHERE note_id = $1 RETURNING *`

    try {
      const results = await db.query(noteQuery, [noteID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleting note ${error}`)
      res.status(500).send(`Error, could not delete note`)
    }
  },

  deleteAnnouncement: async (req, res) => {
    const announcementID = req.params.id
    const announcementQuery = `DELETE FROM announcements WHERE id = $1 RETURNING *`

    try {
      const results = await db.query(announcementQuery, [announcementID])
      res.status(200).send(results.rows)
    } catch(error) {
    console.error(`Error deleting announcement ${error}`)
    res.status(500).send(`Error, could not delete announcement`)
    }
  },

  deleteNotification: async (req, res) => {
    const notificationID = req.params.id
    const notificationQuery = `DELETE FROM notifications WHERE id = $1 RETURNING *`

    try {
      const results = await db.query(notificationQuery, [notificationID])
      res.status(200).send(results.rows)
    } catch(error) {
      console.error(`Error deleting notification ${error}`)
      res.status(500).send(`Error, could not delete notification`)
    }
  }
}

export default deleteControllers