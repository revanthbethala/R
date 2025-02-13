import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGet from "@/myComponents/useGet";
import { Search, Briefcase, MapPin, Clock, Users } from "lucide-react";
import Loading from "@/pages/Loading";
import { Button } from "@/components/ui/button";

interface Job {
  _id: string;
  company: { name: string };
  createdAt: string;
  description: string;
  experienceLevel: number;
  jobtype: string;
  location: string;
  positions: number;
  requirements: string[];
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer"
    >
      <Card className="">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl truncate uppercase tracking-wide">
              {job.title}
            </h2>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {job.jobtype}
            </Badge>
          </div>
          <p className="text-md   capitalize">{job.company.name}</p>
          <p className="text-sm text-gray-600 line-clamp-2 capitalize">
            <p className="text-sm text-gray-600 capitalize">
              {job.description.length > 45
                ? `${job.description.slice(0, 45)}...`
                : job.description}
            </p>
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-blue-500 capitalize" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase size={16} className="text-green-500" />
              <span>{job.experienceLevel} years</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-purple-500" />
              <span>{job.positions} positions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-orange-500" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.requirements.slice(0, 3).map((req, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-medium"
              >
                {req}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge variant="secondary" className="text-xs font-medium">
                +{job.requirements.length - 3} more
              </Badge>
            )}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 ">
            <NavLink to={`/jobs/job-detail/${job._id}`}>View Details</NavLink>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const JobCards = () => {
  const { data, isLoading, error } = useGet("job/get");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data?.jobs) {
        setFilteredJobs(
          data.jobs.filter(
            (job: Job) =>
              job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.location.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 300); // Debounce for smoother search

    return () => clearTimeout(timeout);
  }, [searchTerm, data]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-2 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Explore Job Listings
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Find the perfect job for your career
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search for a job or location..."
            className="w-full px-6 py-4 pl-14 text-lg text-gray-800 border-2 border-gray-200 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
        </motion.div>
      </motion.div>

      {isLoading && <Loading />}
      {error && (
        <p className="text-center text-red-500 font-medium text-lg">
          Error loading jobs.
        </p>
      )}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job: Job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 font-medium text-xl">
            No jobs found. Try adjusting your search.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default JobCards;
