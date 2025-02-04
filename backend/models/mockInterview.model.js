import mongoose from "mongoose";

const mockSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["HR", "Technical"],
      required: true,
    },
    experience: {
      type: String, // Duration in minutes
      enum:["Fresher","Senior"],
      required: true,
    },
    noOfQuestions: {
      type: Number,
      enum:[10,20],
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mock", mockSchema);
