import validInfo from "../middleware/validInfo.js"
import express from 'express';

const router = express.Router();

import testControllers from '../controllers/testControllers.js'

router.get("/jobs", testControllers.fetchPartnerJobs);
router.get("/users", testControllers.fetchUsers);
router.get('/announcements', testControllers.fetchAnnouncements);
router.get('/notifications/:id', testControllers.fetchNotifications);
router.get('/studentkanban/:id', testControllers.fetchStudentKanban);
router.get('/cohortkanban/:id', testControllers.fetchCohortKanban);

export default router;