import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useGet from "@/myComponents/useGet";
import { CheckCircle2, CirclePlay } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (
      data &&
      data.lectures &&
      Array.isArray(data.lectures) &&
      data.lectures.length > 0
    ) {
      setCourseData({ courseTitle: data.courseTitle, lectures: data.lectures });
      setCurrentLecture(data.lectures[0]);
    }
  }, [data]);

  const handleLectureProgress = (lectureId: string) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures((prev) => [...prev, lectureId]);
      toast.success("Lecture completed!");
    }
  };

  const handleSelectLecture = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    if (!completedLectures.includes(lecture._id)) {
      handleLectureProgress(lecture._id);
    }
  };

  if (isLoading) return <p className="text-center p-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">Error loading course data</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 sm:mb-0">
          {courseData?.courseTitle || "Course"}
        </h1>
        <Badge variant="outline" className="text-sm">
          {completedLectures.length} / {courseData?.lectures?.length || 0}{" "}
          Completed
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {currentLecture && currentLecture.videoUrl && (
            <>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <video
                  src={currentLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  onPlay={() => handleLectureProgress(currentLecture._id)}
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-xl mb-2">
                  {`Lecture ${
                    (courseData?.lectures?.findIndex(
                      (lec) => lec._id === currentLecture._id
                    ) ?? -1) + 1
                  } : ${currentLecture.lectureTitle}`}
                </h3>
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl mb-4">Course Lectures</h2>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {courseData?.lectures?.map((lecture, index) => (
              <Card
                key={lecture._id}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  lecture._id === currentLecture?._id ? "border-primary" : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center p-4">
                  <div className="mr-3">
                    {completedLectures.includes(lecture._id) ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <CirclePlay className="text-gray-400 h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="text-sm font-medium">
                      {`${index + 1}. ${lecture.lectureTitle}`}
                    </CardTitle>
                  </div>
                  {completedLectures.includes(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-green-100 text-green-800"
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
