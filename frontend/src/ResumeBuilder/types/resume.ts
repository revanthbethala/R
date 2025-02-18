export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
  };
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
}

export interface Theme {
  primaryColor: string;
  fontFamily: string;
  layout: 'classic' | 'modern' | 'minimal';
}