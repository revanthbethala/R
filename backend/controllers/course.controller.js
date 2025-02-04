import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import  Lecture  from "../models/lecture.model.js";

export const createCourse = async (req, res) => {
  try {
    const { userId, courseTitle, category } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newCourse = new Course({ courseTitle, category, creator: user._id });
    await newCourse.save();

    user.courses.push(newCourse._id);
    await user.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { courseTitle, subTitle, description, courseLevel, coursePrice, isPublished } = req.body;
    const courseThumbnail = {
              originalname: 'test-image.jpg',  // Name of the file
              buffer: fs.readFileSync('../backend/assets/test-image.jpg') // Read the file as a buffer
            };
    //console.log(courseId);
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { courseTitle, subTitle, description, courseLevel, coursePrice, courseThumbnail, isPublished },
    );

    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching published courses", error: error.message });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id:id });
    console.log(user)
    if (!user) return res.status(404).json({ message: "User not found" });

    const courses = await Course.find({ creator: user._id });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("creator", "fullName email");
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};


//Lectures controllers

export const createLecture = async (req, res) => {
    try {
      const { courseId } = req.params;
      const { lectureTitle } = req.body;
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      const newLecture = new Lecture({ lectureTitle });
      await newLecture.save();
  
      course.lectures.push(newLecture._id);
      await course.save();
  
      res.status(201).json({ message: "Lecture created successfully", lecture: newLecture });
    } catch (error) {
      res.status(500).json({ message: "Error creating lecture", error: error.message });
    }
  };
  
  // Get all lectures of a specific course
  export const getCourseLectures = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const course = await Course.findById(courseId).populate("lectures");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json({ lectures: course.lectures });
    } catch (error) {
      res.status(500).json({ message: "Error fetching lectures", error: error.message });
    }
  };
  

  export const editLecture = async (req, res) => {
    try {
      const { courseId, lectureId } = req.params;
      const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;
  
      const course = await Course.findById(courseId);
      if (!course || !course.lectures.includes(lectureId)) {
        return res.status(404).json({ message: "Lecture not found in this course" });
      }
  
      const updatedLecture = await Lecture.findByIdAndUpdate(
        lectureId,
        { lectureTitle, videoUrl, publicId, isPreviewFree },
      );
  
      res.status(200).json({ message: "Lecture updated successfully", lecture: updatedLecture });
    } catch (error) {
      res.status(500).json({ message: "Error updating lecture", error: error.message });
    }
  };
  
  // Remove a lecture (from Cloudinary & DB)
  export const removeLecture = async (req, res) => {
    try {
      const { courseId, lectureId } = req.params;
  
      const course = await Course.findById(courseId);
      if (!course || !course.lectures.includes(lectureId)) {
        return res.status(404).json({ message: "Lecture not found in this course" });
      }
  
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
  
      // Remove from Cloudinary if video exists
      if (lecture.publicId) {
        await cloudinary.uploader.destroy(lecture.publicId);
      }
  
      // Remove from course lectures array
      course.lectures = course.lectures.filter(id => id.toString() !== lectureId);
      await course.save();
  
      // Delete lecture from DB
      await Lecture.findByIdAndDelete(lectureId);
  
      res.status(200).json({ message: "Lecture removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting lecture", error: error.message });
    }
  };
  

  export const getLectureById = async (req, res) => {
    try {
      const { lectureId } = req.params;
  
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
  
      res.status(200).json({ lecture });
    } catch (error) {
      res.status(500).json({ message: "Error fetching lecture", error: error.message });
    }
  };