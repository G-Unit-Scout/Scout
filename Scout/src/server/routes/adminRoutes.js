// import validInfo from '../middleware/validInfo.js';
import authorization from "../middleware/authorization.js";
import express from "express";
const router = express.Router();

import adminControllers from "../controllers/adminControllers.js";

router.get("/admin", authorization, adminControllers.testRoute);

export default router;
