import React, { createContext, useContext, useState } from "react";

import { type Language } from "@/constants/translations";

export type { Language };
export type EducationLevel = "10th" | "12th" | "graduate";

export interface AcademicData {
  marks10?: string;
  marks12?: string;
  stream12?: string;
  favoriteSubjects?: string[];
  degreeName?: string;
  specialization?: string;
  cgpa?: string;
}

interface CareerState {
  language: Language;
  name: string;
  age: string;
  educationLevel: EducationLevel | null;
  academicData: AcademicData;
  interests: string[];
}

interface CareerContextType extends CareerState {
  setLanguage: (lang: Language) => void;
  setProfile: (name: string, age: string) => void;
  setEducationLevel: (level: EducationLevel) => void;
  setAcademicData: (data: AcademicData) => void;
  setInterests: (interests: string[]) => void;
  reset: () => void;
}

const defaultState: CareerState = {
  language: "en",
  name: "",
  age: "",
  educationLevel: null,
  academicData: {},
  interests: [],
};

const CareerContext = createContext<CareerContextType | null>(null);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CareerState>(defaultState);

  function setLanguage(lang: Language) {
    setState((s) => ({ ...s, language: lang }));
  }

  function setProfile(name: string, age: string) {
    setState((s) => ({ ...s, name, age }));
  }

  function setEducationLevel(level: EducationLevel) {
    setState((s) => ({ ...s, educationLevel: level, academicData: {}, interests: [] }));
  }

  function setAcademicData(data: AcademicData) {
    setState((s) => ({ ...s, academicData: data }));
  }

  function setInterests(interests: string[]) {
    setState((s) => ({ ...s, interests }));
  }

  function reset() {
    setState((s) => ({ ...defaultState, language: s.language }));
  }

  return (
    <CareerContext.Provider
      value={{ ...state, setLanguage, setProfile, setEducationLevel, setAcademicData, setInterests, reset }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer(): CareerContextType {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error("useCareer must be used within CareerProvider");
  return ctx;
}
