import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { WorkExperience } from '../types/resume';

interface WorkExperienceFormProps {
  experience: WorkExperience[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof WorkExperience, value: string) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  experience,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <h3 className="font-medium">Experience #{index + 1}</h3>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => onChange(index, 'company', e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => onChange(index, 'position', e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => onChange(index, 'startDate', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => onChange(index, 'endDate', e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full p-2 border rounded h-24"
          />
        </div>
      ))}
    </div>
  );
};