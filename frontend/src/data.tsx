import {
  BarChart,
  Brain,
  Code,
  Database,
  Globe,
  Lock,
  Server,
  Smartphone,
} from "lucide-react";
import hero from "./assets/hero.png";
import logo from "./assets/logo.png";
import userPreferences from "./assets/userPreferences.png";
import resume from "./assets/resume.png";
import quiz from "./assets/quiz.png";
import badge from "./assets/badge.png";
import border from "./assets/border.png";
const categories = [
  { name: "Data Structures", icon: <Database /> },
  { name: "Algorithms", icon: <Code /> },
  { name: "Web Development", icon: <Globe /> },
  { name: "Database Management", icon: <Server /> },
  { name: "Machine Learning", icon: <BarChart /> },
  { name: "Cybersecurity", icon: <Lock /> },
  { name: "Artificial Intelligence", icon: <Brain /> },
  { name: "Mobile App Development", icon: <Smartphone /> },
];

const jobs = [
  {
    jobRole: "Software Developer",
    companyName: "Tech Solutions Pvt. Ltd.",
    workType: "Full-time",
    location: "Bangalore, Karnataka",
  },

  {
    jobRole: "Marketing Assistant",
    companyName: "Creative Solutions Pvt. Ltd.",
    workType: "Part-time",
    location: "Delhi, NCR",
  },
  {
    jobRole: "UX/UI Designer Intern",
    companyName: "Design Studio India",
    workType: "Internship",
    location: "Chennai, Tamil Nadu",
  },
  {
    jobRole: "Web Developer",
    companyName: "WebTech Innovations",
    workType: "Full-time",
    location: "Pune, Maharashtra",
  },
  {
    jobRole: " Marketing Intern",
    companyName: "MarketReach Solutions",
    workType: "Internship",
    location: "Kolkata, West Bengal",
  },
  {
    jobRole: "Business Analyst",
    companyName: "Global Enterprises",
    workType: "Full-time",
    location: "Noida, Uttar Pradesh",
  },
];

export { categories, jobs, hero, logo,border,badge, userPreferences, resume, quiz };
