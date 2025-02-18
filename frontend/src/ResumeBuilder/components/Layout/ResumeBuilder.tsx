import React from "react";
import { Download } from "lucide-react";
import { usePDF } from "../../hooks/usePDF";

import { useResumeData } from "../../hooks/useResumeData";
import { useTheme } from "../../hooks/useTheme";
import { PersonalInfoForm } from "../PersonalInfoForm";
import { EducationForm } from "../EducationForm";
import { WorkExperienceForm } from "../WorkExperienceForm";
import { SkillsForm } from "../SkillsForm";
import { ThemeCustomizer } from "../ThemeCustomizer";
import { ResumePreview } from "../ResumePreview";
import { useUser } from "@clerk/clerk-react";

export const ResumeBuilder: React.FC = () => {

  const { resumeData, isImporting, handlers } = useResumeData();
  const { theme, handleThemeChange } = useTheme();
  const { toPDF, targetRef } = usePDF({
    filename: `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_resume.pdf`,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600">
            Create your professional resume in minutes
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormSection>
              <PersonalInfoForm
                personalInfo={resumeData.personalInfo}
                onChange={handlers.handlePersonalInfoChange}
                onImport={handlers.handleLinkedInImport}
                isImporting={isImporting}
              />
            </FormSection>

            <FormSection>
              <EducationForm
                education={resumeData.education}
                onAdd={handlers.handleEducationAdd}
                onRemove={handlers.handleEducationRemove}
                onChange={handlers.handleEducationChange}
              />
            </FormSection>

            <FormSection>
              <WorkExperienceForm
                experience={resumeData.workExperience}
                onAdd={handlers.handleExperienceAdd}
                onRemove={handlers.handleExperienceRemove}
                onChange={handlers.handleExperienceChange}
              />
            </FormSection>

            <FormSection>
              <SkillsForm
                skills={resumeData.skills}
                onChange={handlers.handleSkillsChange}
              />
            </FormSection>

            <FormSection>
              <ThemeCustomizer theme={theme} onChange={handleThemeChange} />
            </FormSection>
          </div>

          <PreviewSection
            targetRef={targetRef}
            onDownload={toPDF}
            resumeData={resumeData}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

const FormSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
);

const PreviewSection: React.FC<{
  targetRef: React.RefObject<any>;
  onDownload: () => void;
  resumeData: any;
  theme: any;
}> = ({ targetRef, onDownload, resumeData, theme }) => (
  <div className="lg:sticky lg:top-8 space-y-4">
    <div className="flex justify-end">
      <button
        onClick={onDownload}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
    </div>
    <div ref={targetRef} className="overflow-auto max-h-[calc(100vh-10rem)]">
      <ResumePreview data={resumeData} theme={theme} />
    </div>
  </div>
);
