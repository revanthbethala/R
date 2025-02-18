import React from 'react';
import { ResumeData, Theme } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  theme: Theme;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, theme }) => {
  const getLayoutClass = () => {
    switch (theme.layout) {
      case 'modern':
        return 'grid grid-cols-3 gap-6';
      case 'minimal':
        return 'space-y-6';
      default: // classic
        return 'space-y-6';
    }
  };

  return (
    <div
      className={`p-8 bg-white shadow-lg min-h-[297mm] w-[210mm] mx-auto ${theme.fontFamily}`}
      style={{ color: theme.primaryColor }}
    >
      <div className={getLayoutClass()}>
        {/* Header Section */}
        <header className="col-span-full text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
          <div className="text-sm space-y-1">
            <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
            {data.personalInfo.linkedIn && (
              <p>
                <a
                  href={data.personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className={theme.layout === 'modern' ? 'col-span-2' : 'col-span-full'}>
          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">Work Experience</h2>
            {data.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{edu.school}</h3>
                <p className="text-sm">{edu.degree} in {edu.fieldOfStudy}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
                <p className="mt-2">{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className={theme.layout === 'modern' ? 'col-span-1' : 'col-span-full'}>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};