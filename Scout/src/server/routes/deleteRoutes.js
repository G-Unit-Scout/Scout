import validInfo from "../middleware/validInfo.js";
import express from 'express';

const router = express.Router();

import deleteControllers from '../controllers/deleteControllers.js'

router.delete('/job/:id', deleteControllers.deleteJob )
router.delete('/user/:id', deleteControllers.deleteUser)
router.delete('/announcements/:id', deleteControllers.deleteAnnouncement)
router.delete('/notifications/:id', deleteControllers.deleteNotification)
router.delete('/jobstatus/:id', deleteControllers.deleteStatus)
router.delete('/usernotes/:id', deleteControllers.deleteNote)
router.delete('/cohorts/:id', deleteControllers.deleteCohort)

export default router