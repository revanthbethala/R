import express from "express";
import {
  createCourse,
  editCourse,
  getPublishedCourses,
  getCreatorCourses,
  getCourseById,
  createLecture,
  getCourseLectures,
  editLecture,
  removeLecture,
  getLectureById,
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(createCourse);
router.route("/edit/:courseId").put(editCourse);
router.route("/published").get(getPublishedCourses);
router.route("/creator/:id").get(getCreatorCourses);
router.route("/:courseId").get(getCourseById);

router.route("/:courseId/lecture").post(createLecture); 
router.route("/:courseId/lectures").get(getCourseLectures); 
router.route("/:courseId/lecture/:lectureId").put(editLecture);
router.route("/:courseId/lecture/:lectureId").delete(removeLecture); 
router.route("/lecture/:lectureId").get(getLectureById); 


export default router;
