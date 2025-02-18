import { useState } from 'react';
import { Theme } from '../types/resume';

const initialTheme: Theme = {
  primaryColor: '#2563eb',
  fontFamily: 'font-sans',
  layout: 'classic',
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleThemeChange = (field: keyof Theme, value: string) => {
    setTheme((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { theme, handleThemeChange };
};