import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  educationLevel: EducationLevel | null;
  academicData: AcademicData;
  interests: string[];
}

interface CareerContextType extends CareerState {
  setEducationLevel: (level: EducationLevel) => void;
  setAcademicData: (data: AcademicData) => void;
  setInterests: (interests: string[]) => void;
  reset: () => void;
}

const defaultState: CareerState = {
  educationLevel: null,
  academicData: {},
  interests: [],
};

const CareerContext = createContext<CareerContextType | null>(null);

const STORAGE_KEY = "@career_wizard_state";

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CareerState>(defaultState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw) as CareerState;
          setState(parsed);
        }
      })
      .catch(() => {});
  }, []);

  function persist(next: CareerState) {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }

  function setEducationLevel(level: EducationLevel) {
    persist({ ...state, educationLevel: level, academicData: {}, interests: [] });
  }

  function setAcademicData(data: AcademicData) {
    persist({ ...state, academicData: data });
  }

  function setInterests(interests: string[]) {
    persist({ ...state, interests });
  }

  function reset() {
    persist(defaultState);
  }

  return (
    <CareerContext.Provider
      value={{ ...state, setEducationLevel, setAcademicData, setInterests, reset }}
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
