import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import RichTextEditor from "@/myComponents/RichTextEditor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Define types for the course input state
interface CourseInput {
  courseTitle: string;
  subTitle: string;
  description: string;
  category: string;
  courseLevel: string;
  coursePrice: string;
  courseThumbnail: File | string;
}

// Define mock functions with appropriate types
const mockEditCourse = async (
  courseId: string,
  input: CourseInput
): Promise<{ message: string }> => {
  // Simulate a successful course update response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Course updated successfully!" });
    }, 1000);
  });
};

const mockPublishCourse = async (
  courseId: string,
  action: "true" | "false"
): Promise<{ data: { message: string } }> => {
  // Simulate a publish/unpublish action
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message:
            action === "true" ? "Course published!" : "Course unpublished!",
        },
      });
    }, 1000);
  });
};

const CourseTab = () => {
  const [input, setInput] = useState<CourseInput>({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId as string; // Explicit type for courseId

  // Mocked response for course data fetching
  const courseByIdData = {
    course: {
      courseTitle: "Fullstack Developer",
      subTitle: "Learn Fullstack Development",
      description: "Comprehensive course on Fullstack Development.",
      category: "Fullstack Development",
      courseLevel: "Beginner",
      coursePrice: "1999",
      courseThumbnail: "",
      isPublished: false,
      lectures: [], // Empty lectures for demo
    },
  };

  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value: string) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value: string) => {
    setInput({ ...input, courseLevel: value });
  };

  // Handle file selection (thumbnail)
  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () =>
        setPreviewThumbnail(fileReader.result as string);
      fileReader.readAsDataURL(file);
    }
  };

  // Mocked function for course update
  const updateCourseHandler = async () => {
    const response = await mockEditCourse(courseId, input);
    toast.success(response.message);
  };

  // Mocked function for course publish/unpublish
  const publishStatusHandler = async (action: "true" | "false") => {
    try {
      const response = await mockPublishCourse(courseId, action);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  if (!courseByIdData?.course) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
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
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={false} onClick={updateCourseHandler}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
