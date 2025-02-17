import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGet from "@/myComponents/useGet";
import Loading from "@/pages/Loading";
import {
  BadgeInfo,
  Lock,
  PlayCircle,
  Users,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import ReactPlayer from "react-player";
import { useState } from "react";
import Rating from "react-rating";
import axios from "axios";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();
  const { data: res, isLoading, error } = useGet(`courses/${courseId}`);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error loading course.</p>
    );

  const { course } = res || {};
  const lectures = course?.lectures || [];
  const reviews = course?.reviews || [];
  const averageRating = course?.averageRating || 0;
  const totalRatings = course?.totalRatings || 0;

  const handleContinueCourse = () => {
    navigate(`../course-progress/${courseId}`);
  };

  // Function to post rating and review to the backend
  const handleSubmitRating = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/courseRating/rate-course",
        {
          courseId: courseId,
          rating: userRating,
          review: userReview,
        }
      );
      if (response.data.success) {
        alert("Thank you for your review!");
        setUserRating(0);
        setUserReview("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{course?.courseTitle}</h1>
          <p className="text-xl mb-4">{course?.subTitle}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <p className="flex items-center">
              <BadgeInfo className="mr-2 h-4 w-4" />
              Last updated {course?.updatedAt?.split("T")[0] || "N/A"}
            </p>
            <p className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              {course?.enrolledStudents?.length || 0} students enrolled
            </p>
            <NavLink to={`/courses/${course?.creator._id}/instructorInfo`} className="flex items-center">
              Created by {course?.creator?.fullName || "Unknown"}
            </NavLink>
            <p className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              {averageRating.toFixed(1)} ({totalRatings} ratings)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: course?.description || "",
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{lectures.length} lectures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lectures.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600">
                        {lecture.isAccessible ? (
                          <PlayCircle className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </span>
                      <p className="font-medium">
                        {lecture.lectureTitle || `Lecture ${idx + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  {reviews.length} reviews (Average Rating:{" "}
                  {averageRating.toFixed(1)})
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">{review.rating}</span>
                      <span className="text-sm text-gray-500">
                        by {review.user?.fullName || "Anonymous"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 lg:mt-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  {lectures.length > 0 && lectures[0]?.videoUrl ? (
                    <ReactPlayer
                      url={lectures[0].videoUrl}
                      width="100%"
                      height="100%"
                      controls
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                      <p className="text-gray-500">No preview available</p>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  ₹{course?.coursePrice}
                </h2>

                {/* Star Rating Field */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Rate this course:</p>
                  <Rating
                    initialRating={userRating}
                    onChange={(value) => setUserRating(value)}
                    emptySymbol={<Star className="h-5 w-5 text-gray-300" />}
                    fullSymbol={<Star className="h-5 w-5 text-yellow-400" />}
                  />
                </div>

                {/* Review Textarea */}
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    placeholder="Write a review..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleSubmitRating}
                  variant="default"
                >
                  Submit Rating
                </Button>

                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleContinueCourse}
                  variant="default"
                >
                  Continue Course
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  30-Day Money-Back Guarantee
                </p>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <div className="w-full">
                  <h3 className="font-semibold mb-2">This course includes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <PlayCircle className="mr-2 h-4 w-4 text-gray-400" />
                      {lectures.length} on-demand video lectures
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      Full lifetime access
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      Access on mobile and TV
                    </li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
