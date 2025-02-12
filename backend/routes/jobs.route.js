import express from "express"
import { getAdminJobs, getJobById, postJob } from "../controllers/jobs.controller.js"

const router = express.Router()

router.route('/post').post(postJob)
router.route('/getAdminJobs').post(getAdminJobs)
router.route('/get/:id').get(getJobById)

export default router