import Mock from "../models/mockInterview.model.js";
import User from "../models/user.model.js";

export const storeMockResult = async (req, res) => {
  try {
    const { userId, jobRole, interviewType, experience, noOfQuestions, marksObtained } = req.body;
    console.log(userId, jobRole)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMock = new Mock({
      userId: user._id,
      jobRole,
      interviewType,
      experience,
      noOfQuestions,
      marksObtained,
    });

    await newMock.save();
    user.mockInterviews.push(newMock._id);
    await user.save();
    res.status(201).json({ message: "Mock test result stored successfully", mock: newMock });
  } catch (error) {
    res.status(500).json({ message: "Error storing mock test result", error: error.message });
  }
};

export const getUserMockTests = async (req, res) => {
  try {
    const { userId } = req.params;
    const mocks = await Mock.find({ userId }).populate("userId", "name email");
    if (!mocks.length) {
      return res.status(404).json({ message: "No mock tests found for this user" });
    }

    res.status(200).json({ mocks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching mock test results", error: error.message });
  }
};
