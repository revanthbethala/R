import Test from "../models/tests.model.js";
import User from "../models/user.model.js";

export const storetestDetails = async (req, res) => {
  try {
    const { userId,category, difficultyLevel, testDuration, noOfQuestions } = req.body;
    console.log(userId)
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTest = new Test({
      userId: user._id,
      category,
      difficultyLevel,
      testDuration,
      noOfQuestions,
    });

    await newTest.save();
    user.tests.push(newTest._id);
    await user.save();

    res.status(201).json({ message: "Test Details stored successfully", test: newTest });
  } catch (error) {
    res.status(500).json({ message: "Error storing test result", error: error.message });
  }
};

export const storeMarks = async (req, res) => {
  try {
    const { userId, marksObtained } = req.body;
    const  {testId} = req.params

    // Find user
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find test
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Ensure the test belongs to the user
    if (!user.tests.includes(test._id)) {
      return res.status(403).json({ message: "Test does not belong to this user" });
    }

    // Update marks in the Test model
    test.marksObtained = marksObtained;
    await test.save();

    // Update marks in the User model
    user.marksObtained = marksObtained; 
    await user.save();

    res.status(200).json({ message: "Marks updated successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Error updating marks", error: error.message });
  }
};

export const getUserTests = async (req, res) => {
  try {
    const {userId} = req.params; 
    console.log(userId);
    const user = await User.findOne({ userId }).populate("tests");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ tests: user.tests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching test results", error: error.message });
  }
};
