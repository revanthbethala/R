import useGet from "@/myComponents/useGet";
import { div } from "@tensorflow/tfjs";
import { useParams } from "react-router";

const InstructorInfo = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGet(`user/getUserById/${id}`);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">
        Error loading instructor info.
      </p>
    );

  const user = data?.user;

  // Function to handle email button click
  const handleMessageClick = () => {
    window.location.href = `mailto:${user?.email}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-16 ">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Instructor Information
      </h2>

      {/* Profile Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full shadow-lg border-2 border-indigo-500"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {user?.fullName}
            </p>
            <p className="text-md text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 shadow-sm rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Courses</h3>
          <p className="text-lg text-indigo-600">{user?.courses.length}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleMessageClick}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Message Instructor
        </button>
      </div>
    </div>
  );
};

export default InstructorInfo;
