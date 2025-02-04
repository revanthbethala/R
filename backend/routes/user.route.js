import express from "express";
import { getUser } from "../controllers/user.controller.js";
import verifyAuthToken from "../middlewares/auth.middleware.js";

const router= express.Router();

router.route('/getDetails').post(verifyAuthToken,getUser)

export default router;