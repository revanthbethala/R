import useGet from "@/myComponents/useGet";
import { useParams } from "react-router";

const InstructorInfo = () => {
  const { id: courseId } = useParams();
  const { data, isLoading, error } = useGet(`courses/${courseId}`);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">
        Error loading instructor info.
      </p>
    );

  const instructor = data?.course?.creator;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Instructor Information
      </h2>
      {instructor ? (
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {instructor.fullName}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {instructor.email}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Instructor details not available.</p>
      )}

      {/* Testimonials Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Student Testimonials
        </h3>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              "This course was amazing! The instructor explained everything so
              clearly."
            </p>
            <p className="text-sm text-gray-500 mt-2">- Alex Johnson</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              "Highly recommended! I learned a lot in a short time."
            </p>
            <p className="text-sm text-gray-500 mt-2">- Priya Sharma</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              "The instructor was very knowledgeable and made learning fun!"
            </p>
            <p className="text-sm text-gray-500 mt-2">- Michael Lee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
