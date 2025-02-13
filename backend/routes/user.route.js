import express from "express";
import { changeRole, getUser } from "../controllers/user.controller.js";

const router= express.Router();

router.route('/getDetails').post(getUser)
router.route('/changeRole').put(changeRole)


export default router;