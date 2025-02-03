import { useInterviewStore } from "@/store/useInterviewStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const interviewType = ["Aptitude & Reasoning", "Technical", "HR"];
const experience = ["Fresher", "Entry", "Senior"];
const questionCounts = [10, 20, 30];

export default function MockInterviewForm() {
  const navigate = useNavigate();
  const { formData, errors, setFormData, setError, resetErrors } =
    useInterviewStore((state) => state);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(name as keyof FormData, value);
  };

  // Handle button click (for radio-style buttons)
  const handleButtonClick = (name: keyof FormData, value: string) => {
    setFormData(name, value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Errors = {};
    if (!formData.role) validationErrors.role = "Role is required!";
    if (!formData.interviewType)
      validationErrors.interviewType = "Interview Type is required!";
    if (!formData.experience)
      validationErrors.experience = "Experience level is required!";
    if (!formData.numberOfQuestions)
      validationErrors.numberOfQuestions = "Number of Questions is required!";

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((field) =>
        setError(field as keyof Errors, validationErrors[field as keyof Errors])
      );
      return;
      console.log("Form Data Submitted:", formData);
    }

    navigate("/mockinterview/instructions");
    resetErrors(); // Reset errors on successful submission
  };

  return (
    <div className="">
    <div className="flex items-center justify-center p-2 md:p-0 h-full">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-lg w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-gray-700/10 dark:via-gray-600/10 dark:to-gray-700/10 rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Mock Interview Setup
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role */}
            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-40 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 transition"
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Interview Type */}
            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Interview Type
              </label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 transition"
              >
                <option value="">Select Interview Type</option>
                {interviewType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.interviewType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interviewType}
                </p>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Experience
              </label>
              <div className="flex space-x-3">
                {experience.map((level, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => handleButtonClick("experience", level)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 rounded-lg text-lg transition ${
                      formData.experience === level
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 hover:bg-opacity-30"
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Number of Questions
              </label>
              <select
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 transition"
              >
                {questionCounts.map((count, index) => (
                  <option key={index} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              {errors.numberOfQuestions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numberOfQuestions}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
