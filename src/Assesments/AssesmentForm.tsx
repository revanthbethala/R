import { categories } from "@/data";
import { useAssessmentStore } from "@/store/useAssesmentStore";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const options = categories.map((category) => category.name);
const difficultyLevels = ["Easy", "Medium", "Hard"];
const timeLimits = [10, 20];
const questionCounts = [10, 20];

interface FormData {
  category: string;
  difficulty: string;
  timeLimit: number;
  numberOfQuestions: number;
}

interface Errors {
  category?: string;
  difficulty?: string;
  timeLimit?: string;
  numberOfQuestions?: string;
}

function AssessmentForm() {
  //const userId= user.id
  const navigate = useNavigate();
  const { formData, errors, setFormData, setError, resetErrors } =
    useAssessmentStore<FormData, Errors>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const handleDifficultyChange = (level: string) => {
    setFormData("difficulty", level);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Errors = {};
    if (!formData.category) validationErrors.category = "Category is required!";
    if (!formData.difficulty)
      validationErrors.difficulty = "Difficulty level is required!";
    if (!formData.timeLimit)
      validationErrors.timeLimit = "Time limit is required!";
    if (!formData.numberOfQuestions)
      validationErrors.numberOfQuestions = "Number of questions is required!";

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((field) =>
        setError(field as keyof Errors, validationErrors[field as keyof Errors])
      );
      return;
    }

    resetErrors();
    navigate("/tests/instructions");
  };

  return (
    <div className="flex items-center justify-center p-2 ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-xl rounded-2xl p-8 shadow-xl max-w-lg w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-gray-700/10 dark:via-gray-600/10 dark:to-gray-700/10 rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Test Your Knowledge
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 transition"
                >
                  <option value="">Select Category</option>
                  {options.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Difficulty Level
              </label>
              <div className="flex space-x-3">
                {difficultyLevels.map((level, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => handleDifficultyChange(level)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 rounded-lg text-lg transition ${
                      formData.difficulty === level
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 hover:bg-opacity-30"
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
              {errors.difficulty && (
                <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 dark:text-white text-lg mb-2 font-medium">
                Time Limit
              </label>
              <select
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 dark:bg-gray-700 dark:text-white border border-white/30 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 transition"
              >
                {timeLimits.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit} minutes
                  </option>
                ))}
              </select>
              {errors.timeLimit && (
                <p className="text-red-500 text-sm mt-1">{errors.timeLimit}</p>
              )}
            </div>

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
                {questionCounts.map((count) => (
                  <option key={count} value={count}>
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
  );
}

export default AssessmentForm;
