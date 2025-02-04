import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  // Hardcoded course data
  const data = {
    course: {
      courseTitle: "Learn React from Scratch",
      subTitle: "The ultimate React course for beginners and beyond",
      description: "<p>This is a detailed description of the React course.</p>",
      creator: {
        name: "John Doe",
      },
      createdAt: "2025-01-01T12:00:00Z",
      enrolledStudents: [1, 2, 3],
      lectures: [
        {
          lectureTitle: "Introduction to React",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          isAccessible: true,
        },
        {
          lectureTitle: "Advanced React Concepts",
          videoUrl: "",
          isAccessible: false,
        },
      ],
    },
    purchased: true,
  };

  const { course, purchased } = data || {};
  const lectures = course?.lectures || [];

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Course Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name || "Unknown"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Course Description */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description || "" }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {lecture.isAccessible ? (
                      <PlayCircle size={14} />
                    ) : (
                      <Lock size={14} />
                    )}
                  </span>
                  <p>{lecture.lectureTitle || `Lecture ${idx + 1}`}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video Preview and Purchase Section */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {lectures.length > 0 && lectures[0]?.videoUrl ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={lectures[0].videoUrl}
                    controls={true}
                  />
                ) : (
                  <p>No preview available</p>
                )}
              </div>
              <h1>{lectures[0]?.lectureTitle || "Lecture title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <button>Buy Course</button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
