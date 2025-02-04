import express from "express";
import { getUser } from "../controllers/user.controller.js";

const router= express.Router();

router.route('/getDetails').post(getUser)


export default router;