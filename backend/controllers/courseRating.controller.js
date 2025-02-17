import CourseRating from "../models/courseRating.model.js";

export const addRating = async (req, res) => {
  try {
    const { course_id, user_id, rating, review } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const existingRating = await CourseRating.findOne({ course_id, user_id });
    if (existingRating) {
      return res.status(400).json({ message: "You have already rated this course" });
    }

    const newRating = new CourseRating({ course_id, user_id, rating, review });
    await newRating.save();

    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error in addRating:", error); 
    res.status(500).json({ message: "Server error", error: error.message }); 
  }
};

export const getCourseRating = async (req, res) => {
  try {
    const { course_id } = req.params;

    const ratings = await CourseRating.find({ course_id });

    if (ratings.length === 0) {
      return res.json({ averageRating: 0, totalRatings: 0 });
    }

    const totalRatings = ratings.length;
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    res.json({ averageRating: averageRating.toFixed(1), totalRatings });
  } catch (error) {
    console.error("Error in getCourseRating:", error); 
    res.status(500).json({ message: "Server error", error: error.message }); 
  }
};
