//import all the dependencies you need ( modules and files )
import validInfo from "../middleware/validInfo.js";
import authorization from "../middleware/authorization.js";

//create a router instance ( simliar to the app instance in server.js )
import express from "express";
const router = express.Router();

//import the controller functions these functions will be invoked when the route is hit
//the controller functions are in the controllers folder in the file userControllers.js
import userControllers from "../controllers/userControllers.js";

//define the routes and the controller functions that will be invoked when the route is hit
//when the route is hit, the middleware will run, then the controller function will run
//example http://localhost:3000/api/register
router.post("/register", validInfo, userControllers.registerUser);
router.post("/login", validInfo, userControllers.loginUser);
router.post("/verify", authorization, userControllers.verifyUser);

export default router;
