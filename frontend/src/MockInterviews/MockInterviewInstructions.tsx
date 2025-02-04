import { useInterviewStore } from "@/store/useInterviewStore";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Webcam from "react-webcam";

function MockInterviewInstructions() {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { formData } = useInterviewStore();
  const {
    interviewType,
    role: jobRole,
    experience,
    numberOfQuestions: noOfQuestions,
  } = formData;
  const { user } = useUser();
  const userId = user?.id;
  const sendData = {
    userId,
    jobRole,
    interviewType,
    experience,
    noOfQuestions,
  };

  const navigate = useNavigate();
  let id;
  async function PostMockDetails() {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/mock/mock-tests",
        JSON.stringify(sendData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("THis is response",res);

      id = res?.data?.mock?._id;
      console.log("Form Submitted:", res?.data);
      navigate(`/mockinterview/start/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className=" h-screen grid md:grid-cols-2 grid-cols-1  w-full items-center justify-center p-6">
      <div className="font-semibold font-Inter text-lg space-y-5 bg-white p-5 rounded-xl bg-opacity-70">
        <h2 className="font-extrabold text-center text-2xl pb-5 tracking-wide font-Inter">
          Interview Instructions
        </h2>
        <h3>
          <span className="font-bold text-stone-800 ">Interview Type: </span>
          {interviewType}
        </h3>
        <h3>
          <span className="font-bold text-stone-800 ">Job Role: </span>
          {jobRole}
        </h3>
        <h3>
          <span className="font-bold text-stone-800 ">Experience Level: </span>
          {experience}
        </h3>
        <h3>
          <span className="font-bold text-stone-800 ">
            Number of Questions:{" "}
          </span>
          {noOfQuestions}
        </h3>
        <p>Please ensure you have the camera and microphone enabled.</p>
        <div>
          {isAllowed && (
            <button
              onClick={PostMockDetails}
              className={`bg-blue-600 rounded-lg px-3 py-2 font-semibold text-white w-fit`}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        {isAllowed ? (
          <Webcam
            onUserMedia={() => setIsAllowed(true)}
            onUserMediaError={() => setIsAllowed(false)}
            mirrored={true}
            className="w-1/2 h-1/2 rounded-xl"
          />
        ) : (
          <WebcamIcon size={150} />
        )}
        <button
          onClick={() => setIsAllowed(true)}
          className={`bg-blue-600 ${
            isAllowed ? "hidden" : ""
          } rounded-lg px-3 py-2 font-semibold text-white`}
        >
          Enable WebCam
        </button>
      </div>
    </div>
  );
}

export default MockInterviewInstructions;
