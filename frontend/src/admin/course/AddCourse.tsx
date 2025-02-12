import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetUserId from "@/helperFunctions/GetUserId";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const getSelectedCategory = (value: string) => {
    setCategory(value);
  };

  const userId = GetUserId();
  const courseData = {
    userId,
    courseTitle,
    category,
  };
  console.log(courseData);
  const createCourseHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/courses/create",
        JSON.stringify(courseData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const id = res?.data?.course?._id;
      console.log(id);
      navigate(`/course/${id}`);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add a course, provide some basic details for your new course
        </h1>
        <p className="text-sm">Add your courses</p>
      </div>
      <div className="space-y-4 w-1/2 bg-blue-300 bg-opacity-15 ">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button onClick={createCourseHandler}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
