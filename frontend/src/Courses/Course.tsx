import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    courseThumbnail: "https://example.com/course-thumbnail-1.jpg",
    courseTitle: "Learn React from Scratch",
    coursePrice: "999",
    courseLevel: "Intermediate",
    creator: {
      name: "John Doe",
      photoUrl: "https://example.com/creator-photo-1.jpg",
    },
    courseDescription:
      "A comprehensive course on React.js, covering everything from basics to advanced topics.",
    enrolledStudents: 1200,
    courseDuration: "15 hours",
    courseRating: 4.5,
    publishedDate: "2024-01-15",
  },
  {
    id: 2,
    courseThumbnail: "https://example.com/course-thumbnail-2.jpg",
    courseTitle: "Mastering JavaScript",
    coursePrice: "799",
    courseLevel: "Advanced",
    creator: {
      name: "Jane Smith",
      photoUrl: "https://example.com/creator-photo-2.jpg",
    },
    courseDescription:
      "Deep dive into JavaScript with advanced concepts and practical projects.",
    enrolledStudents: 900,
    courseDuration: "20 hours",
    courseRating: 4.7,
    publishedDate: "2024-02-01",
  },
  // Add more courses as needed
];

export const CourseCard = ({ course }) => {
  return (
    <Link to={`/course-detail/${course.id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">{course.creator?.name}</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {course.courseLevel}
            </Badge>
          </div>

          <p className="text-sm text-gray-600">{course.courseDescription}</p>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>{course.enrolledStudents} students enrolled</p>
            <p>{course.courseDuration}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-yellow-500">
            {/* Display course rating with stars */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <span
                key={idx}
                className={`text-xl ${
                  idx < course.courseRating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span>({course.courseRating})</span>
          </div>

          <div className="text-lg font-bold">
            <span>₹{course.coursePrice}</span>
          </div>

          <div className="text-xs text-gray-400">
            Published on: {new Date(course.publishedDate).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const CourseList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
