import validInfo from "../middleware/validInfo.js"
import express from 'express';

const router = express.Router();

import createUpdateControllers from '../controllers/createUpdateControllers.js'


router.put('/addjob', createUpdateControllers.addJob);
router.put('/addjobaddstatus/:id', createUpdateControllers.addJobAddStatus);
router.put('/updatestatus/:id', createUpdateControllers.updateJobStatus);
router.put('/notifications/:id', createUpdateControllers.addNotification);
router.put('/updatenotifications/:id', createUpdateControllers.updateNotification)
export default router;