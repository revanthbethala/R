import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useGet from "@/myComponents/useGet";

interface Course {
  _id: string;
  category: string;
  courseLevel: string;
  coursePrice: number;
  courseThumbnail: string;
  courseTitle: string;
  createdAt: string;
  creator: { name?: string; photoUrl?: string };
  description: string;
  enrolledStudents: any[];
  isPublished: boolean;
  lectures: string[];
  subTitle: string;
  updatedAt: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div>
      <Link to={`course-detail/${course._id}`}>
        <Card className="bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="relative">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-36 object-cover rounded-t-lg"
            />
          </div>
          <CardContent className="px-5 py-4 space-y-3">
            <h1 className="hover:underline font-bold text-lg truncate">
              {course.courseTitle}
            </h1>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-800">
                {course.courseLevel}
              </Badge>
            </div>

            <p className="text-sm text-gray-600">{course.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <p>{course.enrolledStudents?.length} students enrolled</p>
            </div>

            <div className="text-lg font-bold">
              <span>₹{course.coursePrice}</span>
            </div>
            <div className="text-xs text-gray-400">
              Published on: {new Date(course.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

const Course = () => {
  const { data, isLoading, error } = useGet("courses/published");
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.courses?.map((course: Course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};
export default Course;
