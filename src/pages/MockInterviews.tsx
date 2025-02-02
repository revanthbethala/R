import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import useGemini from "@/myComponents/useGemini";
import { useInterviewStore } from "@/store/useInterviewStore";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import Loading from "./Loading";

function GenerateQuestions() {
  const { formData } = useInterviewStore();
  const { role, interviewType, numberOfQuestions, experience } = formData;

  const prompt = `Generate a list of ${numberOfQuestions} ${interviewType} questions for a ${experience} applying for the role of ${role}. The questions should cover all the topics related to ${role}. Format the response as { "questions": ["Q1", "Q2", "Q3", "Q4"] }`;

  const { data, error, isLoading } = useGemini(prompt);
  const {
    error: speechError,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [localAnswers, setLocalAnswers] = useState([]); // Manage answers locally
  const [isCompleted, setIsCompleted] = useState(false); // Track if interview is completed

  const { appendAnswer } = useInterviewStore();

  useEffect(() => {
    if (results.length > 0) {
      const latestAnswer = results[results.length - 1]?.transcript;
      if (latestAnswer) {
        // Store the answer with the corresponding question
        setLocalAnswers((prevAnswers) => {
          const newAnswers = [...prevAnswers];
          newAnswers[currentQuestionIndex] = latestAnswer; // Update the answer for the current question
          return newAnswers;
        });
        appendAnswer(latestAnswer); // Append answer to the store if needed
      }
    }
  }, [results, currentQuestionIndex, appendAnswer]);

  if (isLoading) return <Loading />;
  if (error) return <p className="font-semibold text-red-600">{error}</p>;
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <p className="text-red-600 font-semibold">
        No questions generated. Please try again.
      </p>
    );
  }

  const { questions } = data;

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsCompleted(true); // Set completed when the last question is answered
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Update the current question index
    }
  };

  if (speechError)
    return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="h-[86vh] overflow-hidden">
      {!isCompleted ? (
        <div className="grid grid-cols-2 p-4 items-center ">
          <div className="flex flex-col gap-2 items-start bg-white bg-opacity-40 p-4 rounded-lg ">
            <progress
              max={questions.length}
              value={currentQuestionIndex + 1}
              className="w-full"
            ></progress>
            <span className="font-semibold">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
            <h2 className="font-medium leading-wide font-Inter text-lg">
              {questions[currentQuestionIndex]}
            </h2>

            {/* Display the current answer */}
            <div className="mt-4">
              <h3 className="font-semibold">Your Answer:</h3>
              <p className="text-lg">
                {localAnswers[currentQuestionIndex] ||
                  "No answer recorded yet."}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className={`rounded-lg px-3 py-2 mt-6 font-semibold text-white ${"bg-blue-700"}`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl">
            {/* Webcam and Recording Button */}
            <WebcamComponent />
            <RecordingButton
              isRecording={isRecording}
              startRecording={startSpeechToText}
              stopRecording={stopSpeechToText}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <ShowResults questions={questions} answers={localAnswers} />
        </div>
      )}
    </div>
  );
}

// Webcam Component
const WebcamComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <Webcam className="rounded-xl w-96 h-96" />
    </div>
  );
};

// Recording Button Component
const RecordingButton = ({ isRecording, startRecording, stopRecording }) => {
  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`rounded-lg px-3 py-2 font-semibold text-white w-fit outline-0 ${
        isRecording ? "bg-red-600" : "bg-blue-700"
      }`}
    >
      <div className="flex gap-2">
        <Mic />
        {isRecording ? "Stop Recording" : "Record Answer"}
      </div>
    </button>
  );
};

function ShowResults({ answers, questions }) {
  const exampleFormat = `{
    overallPerformance:"Satisfactory","Unsatisfactory",
    overallAssessment:"need to improve at specific field or everything is good"
    areaOfImprovement:"give improvement suggestions in 3-4lines"
  }`;

  let prompt = "";
  for (let i = 0; i < questions.length; i++) {
    prompt += `${questions[i]}: ${answers[i] || "Not Answered"}\n`;
  }
  prompt += `now evaluate all the questions and answers and give the output as ${exampleFormat} format that assesses the performance.  just give the output in JSON format no additional response is required`;

  const { data, isLoading, error } = useGemini(prompt);
  if (isLoading) return <Loading />;
  if (error) return <p className="font-semibold text-red-600">{error}</p>;
  let performance: string = data?.overallPerformance
  performance = performance.toLowerCase();
  console.log(performance);

  return (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-2xl shadow-lg  w-1/2">
      <h2 className="text-2xl font-semibold text-blue-700">
        Interview Summary
      </h2>
      {data ? (
        <div className="mt-4 space-y-2">
          <p className="text-lg ">
            <span className="font-medium">Your Performance:</span>{" "}
            <span
              className={`${
                performance == "unsatisfactory"
                  ? "text-red-700"
                  : "text-green-700"
              }`}
            >
              {" "}
              {data?.overallPerformance || "N/A"}
            </span>
          </p>
          <p className="text-lg ">
            <span className="font-medium">Your Assessment:</span>{" "}
            {data?.overallAssessment || "N/A"}
          </p>
          <p className="text-lg ">
            <span className="font-medium">Your Assessment:</span>{" "}
            {data?.areaOfImprovement || "N/A"}
          </p>

          <div className="flex gap-2 items-center justify-center p-3">
            <button className="my-btn text-center">Go To Home</button>
            <button className="my-btn text-center">Retake Test</button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-blue-600 italic">Loading interview data...</p>
      )}
    </div>
  );
}

export default GenerateQuestions;
