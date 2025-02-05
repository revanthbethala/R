import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useGet from "@/myComponents/useGet";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Types for Course Data and Lecture
interface Lecture {
  _id: string;
  lectureTitle: string;
  videoUrl: string;
}

interface CourseData {
  courseTitle: string;
  lectures: Lecture[];
}

const CourseProgress = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useGet(`courses/${courseId}/lectures`);

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setCourseData({ courseTitle: data.courseTitle, lectures: data.lectures });
      setCurrentLecture(data.lectures[0] || null);
    }
  }, [data]);

  const handleLectureProgress = (lectureId: string) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures((prev) => [...prev, lectureId]);
    }
  };

  const handleSelectLecture = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = () => {
    setCompleted(true);
    toast.success("Course marked as completed");
  };

  const handleInCompleteCourse = () => {
    setCompleted(false);
    toast.success("Course marked as incomplete");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course data</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseData?.courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          {currentLecture && (
            <>
              <video
                src={currentLecture.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() => handleLectureProgress(currentLecture._id)}
              />
              <div className="mt-2">
                <h3 className="font-medium text-lg">
                  {`Lecture ${
                    courseData?.lectures?.findIndex(
                      (lec) => lec._id === currentLecture._id
                    ) + 1
                  } : ${currentLecture.lectureTitle}`}
                </h3>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseData?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {completedLectures.includes(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {completedLectures.includes(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
