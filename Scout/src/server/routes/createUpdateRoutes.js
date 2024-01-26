import validInfo from "../middleware/validInfo.js"
import express from 'express';

const router = express.Router();

import createUpdateControllers from '../controllers/createUpdateControllers.js'


router.put('/addjob', createUpdateControllers.addJob);
router.put('/addjobaddstatus/:id', createUpdateControllers.addJobAddStatus);
export default router;