import { CourseCard } from "./Course";
// import { useLoadUserQuery } from "@/features/api/authApi";
const myLearning = [
  {
    id: 2,
    courseTitle: "Advanced JavaScript",
    courseThumbnail: "https://via.placeholder.com/150",
    coursePrice: 299,
    courseLevel: "Advanced",
    instructor: "Jane Smith",
  },
  {
    id: 3,
    courseTitle: "Mastering Python",
    courseThumbnail: "https://via.placeholder.com/150",
    coursePrice: 249,
    courseLevel: "Intermediate",
    instructor: "Sam Brown",
  },
];
const MyLearning = () => {
  // const { data, isLoading } = useLoadUserQuery();
  // const isLoading = false;
  // const myLearning = data?.user.enrolledCourses || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// // Skeleton component for loading state
// const MyLearningSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//     {[...Array(3)].map((_, index) => (
//       <div
//         key={index}
//         className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
//       ></div>
//     ))}
//   </div>
// );
