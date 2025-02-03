import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

// Mocked data
const mockLectureData = [
  { _id: "1", title: "Lecture 1" },
  { _id: "2", title: "Lecture 2" },
  { _id: "3", title: "Lecture 3" },
];

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  // Mocked function for creating lecture
  const createLectureHandler = () => {
    toast.success("Lecture created successfully");
    // Add mock lecture to the list
    mockLectureData.push({ _id: new Date().toString(), title: lectureTitle });
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button onClick={createLectureHandler}>Create lecture</Button>
        </div>
        <div className="mt-10">
          {mockLectureData.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            mockLectureData.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
