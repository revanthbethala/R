import { useState } from "react";
import axios from "axios";

// Define the Job type
interface Job {
  id: string;
  title: string;
  company?: {
    name: string;
  };
  location?: string;
  url: string;
}

const JobScraper = () => {
  const [jobTitle, setJobTitle] = useState<string>(""); // Define state type as string
  const [jobs, setJobs] = useState<Job[]>([]); // Define state type as Job[]
  const [loading, setLoading] = useState<boolean>(false); // Define state type as boolean
  const [error, setError] = useState<string>(""); // Define state type as string

  const fetchJobs = async () => {
    if (!jobTitle.trim()) return;
    setLoading(true);
    setError("");
    setJobs([]);
    try {
      const response = await axios.get(
        "https://linkedin-data-api.p.rapidapi.com/search-jobs",
        {
          headers: {
            "x-rapidapi-key":
              "b227f7b21dmshe5456f4842e2431p157710jsn6d20221d25cc", // Store API key in .env
            "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
          },
          params: {
            keywords: jobTitle,
            datePosted: "anyTime",
            sort: "mostRelevant",
          },
        }
      );
      if (!response.data?.data || response.data.data.length === 0) {
        setError("No jobs found");
        setJobs([]);
      } else {
        setJobs(response.data.data);
      }
    } catch (error) {
      setError("Failed to fetch job data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Job Search
      </h2>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          className="p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter job role..."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          onClick={fetchJobs}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {loading && (
        <p className="text-center text-gray-600 mt-4">Fetching jobs...</p>
      )}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {job.title || "N/A"}
            </h3>
            <p className="text-gray-600">
              Company: {job.company?.name || "N/A"}
            </p>
            <p className="text-gray-600">Location: {job.location || "N/A"}</p>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Job Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobScraper;
