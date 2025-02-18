import React, { useState } from "react";
import { Tags, X } from "lucide-react";

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="flex items-center space-x-2">
        <Tags className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Add a skill (press Enter)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleAddSkill}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
