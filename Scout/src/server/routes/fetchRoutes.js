import validInfo from "../middleware/validInfo.js"
import express from 'express';

const router = express.Router();

import fetchControllers from '../controllers/fetchControllers.js'

router.get("/jobs", fetchControllers.fetchPartnerJobs);
router.get("/users", fetchControllers.fetchUsers);
router.get('/announcements', fetchControllers.fetchAnnouncements);
router.get('/notifications/:id', fetchControllers.fetchNotifications);
router.get('/studentkanban/:id', fetchControllers.fetchStudentKanban);
router.get('/cohortkanban/:id', fetchControllers.fetchCohortKanban);
router.get('/cohorts', fetchControllers.fetchCohorts);

export default router;