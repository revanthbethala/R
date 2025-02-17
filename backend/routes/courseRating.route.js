import express from "express"
import { addRating, getCourseRating } from "../controllers/courseRating.controller.js";


const router = express.Router();

router.post("/rate-course", addRating);
router.get("/course-rating/:course_id", getCourseRating);

export default router;