import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_city?: string;
  job_country?: string;
  job_apply_link: string;
  job_posted_at_datetime_utc: string;
}

const API_URL = "https://linkedin-data-api.p.rapidapi.com/search-jobs";
const API_KEY = import.meta.env.VITE_LINKEDIN_KEY; // Replace with your API key

const JobScraper = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchJobs = async () => {
    if (!jobTitle.trim()) return;

    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const response = await axios.get(API_URL, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
        },
        params: { query: jobTitle, num_pages: 1 },
      });
      console.log(response);
      const jobData = response.data?.data || [];
      if (jobData.length === 0) {
        setError("No jobs found for the given role.");
      } else {
        // Map the response to match the Job interface
        const formattedJobs = jobData.map((job: any) => ({
          job_id: job.id,
          job_title: job.title,
          employer_name: job.company.name,
          employer_logo: job.company.logo,
          job_city: job.location.split(",")[0] || "Unknown", // Assuming location is in "City, Country" format
          job_country: job.location.split(",")[1] || "",
          job_apply_link: job.url,
          job_posted_at_datetime_utc: job.postAt,
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch job data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 sm:px-10 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Job Search
      </h2>

      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-3/4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter job role..."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          onClick={fetchJobs}
          disabled={loading || !jobTitle.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {loading && <p className="text-center text-gray-600 mt-4">Fetching jobs...</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="p-5 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition transform hover:scale-105 duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">{job.job_title || "N/A"}</h3>
            <p className="text-gray-600">Company: {job.employer_name || "N/A"}</p>
            <p className="text-gray-600">
              Location: {job.job_city || "Unknown"}, {job.job_country || ""}
            </p>
            {job.job_posted_at_datetime_utc && (
              <p className="text-gray-500 text-sm">
                Posted on: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
              </p>
            )}
            <NavLink
              to={job.job_apply_link}
              target="_blank"
              className="mt-3 inline-block text-blue-600 hover:underline font-medium"
            >
              Apply Now
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobScraper;