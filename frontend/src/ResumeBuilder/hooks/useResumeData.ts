import { useState } from 'react';
import { ResumeData, Education, WorkExperience } from '../types/resume';
import { importLinkedInData } from '../utils/linkedinImport';

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
  },
  education: [],
  workExperience: [],
  skills: [],
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isImporting, setIsImporting] = useState(false);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleEducationAdd = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const handleEducationRemove = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleExperienceAdd = () => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const handleExperienceRemove = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const handleLinkedInImport = async () => {
    if (!resumeData.personalInfo.linkedIn) return;

    setIsImporting(true);
    try {
      const data = await importLinkedInData(resumeData.personalInfo.linkedIn);
      setResumeData(data as ResumeData);
    } catch (error) {
      console.error('Failed to import LinkedIn data:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return {
    resumeData,
    isImporting,
    handlers: {
      handlePersonalInfoChange,
      handleEducationAdd,
      handleEducationRemove,
      handleEducationChange,
      handleExperienceAdd,
      handleExperienceRemove,
      handleExperienceChange,
      handleSkillsChange,
      handleLinkedInImport,
    },
  };
};