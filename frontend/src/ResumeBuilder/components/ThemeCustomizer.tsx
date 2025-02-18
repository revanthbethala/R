import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types/resume';

interface ThemeCustomizerProps {
  theme: Theme;
  onChange: (field: keyof Theme, value: string) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  theme,
  onChange,
}) => {
  const colors = [
    '#2563eb', // blue-600
    '#dc2626', // red-600
    '#16a34a', // green-600
    '#9333ea', // purple-600
    '#ea580c', // orange-600
    '#0891b2', // cyan-600
  ];

  const fonts = [
    'font-sans',
    'font-serif',
    'font-mono',
  ];

  const layouts = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Palette className="w-5 h-5 text-gray-500" />
        <h2 className="text-xl font-semibold">Customize Theme</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Scheme
          </label>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onChange('primaryColor', color)}
                className={`w-8 h-8 rounded-full ${
                  theme.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={theme.fontFamily}
            onChange={(e) => onChange('fontFamily', e.target.value)}
            className="w-full p-2 border rounded"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font.replace('font-', '').charAt(0).toUpperCase() + font.slice(6)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Layout
          </label>
          <div className="grid grid-cols-3 gap-2">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => onChange('layout', layout.id as Theme['layout'])}
                className={`p-2 border rounded ${
                  theme.layout === layout.id
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};