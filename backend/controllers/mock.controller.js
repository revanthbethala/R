import Mock from "../models/mockInterview.model.js";
import User from "../models/user.model.js";

export const storeMockDetails = async (req, res) => {
  try {
    const { userId, jobRole, interviewType, experience, noOfQuestions } = req.body;
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

export const storeMockMarks = async(req,res)=>{
  try {
    const { userId, marksObtained, testId } = req.body;
    const mock = await Mock.findByIdAndUpdate(testId, { marksObtained }, { new: true });
    if (!mock) {
      return res.status(404).json({ message: "Mock test not found" });
    }
    res.status(200).json({ message: "Mock test marks updated successfully", mock });
    const user = await User.findByIdAndUpdate(userId, { $push: { marksObtained: marksObtained } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User's marks updated successfully", user });
  }
  catch (error) {
    res.status(500).json({ message: "Error updating mock test marks", error: error.message });
  }
}
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
