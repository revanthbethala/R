import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  education: Education[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof Education, value: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <h3 className="font-medium">Education #{index + 1}</h3>
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
            placeholder="School"
            value={edu.school}
            onChange={(e) => onChange(index, 'school', e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => onChange(index, 'degree', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => onChange(index, 'fieldOfStudy', e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => onChange(index, 'startDate', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => onChange(index, 'endDate', e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <textarea
            placeholder="Description"
            value={edu.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full p-2 border rounded h-24"
          />
          <button>Rephrase</button>
        </div>
      ))}
    </div>
  );
};