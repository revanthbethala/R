import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";
import axios from "axios";
import { Edit } from "lucide-react";

// Mocked data
const mockLectureData = [
  { _id: "1", title: "Lecture 1" },
  { _id: "2", title: "Lecture 2" },
  { _id: "3", title: "Lecture 3" },
];

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectureId, setLectureId] = useState<string>("");
  // Mocked function for creating lecture
  const createLectureHandler = async () => {
    try {
      const res = await axios?.post(
        `http://localhost:8000/api/v1/courses/${courseId}/lecture`,
        JSON.stringify({ lectureTitle }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLectureId(res?.data?.lecture?._id);

      console.log(lectureId);
    } catch (err) {
      console.log("error", err);
    }
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
          <NavLink to={`/course/${courseId}/lecture/${lectureId}`}>
            <Edit />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
