import express from "express";
import { changeRole, getUser, getUserById } from "../controllers/user.controller.js";

const router= express.Router();

router.route('/getDetails').post(getUser)
router.route('/changeRole').put(changeRole)
router.route('/getUserById/:userId').get(getUserById)


export default router;