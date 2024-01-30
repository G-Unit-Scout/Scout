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
  }
}

export default deleteControllers