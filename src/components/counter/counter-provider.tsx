"use client";

import { Category, Counter, EDCounter, TotalCounter } from "@/constants/count";
import { DEFAULT_COUNTER } from "@/constants/count.label";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const MAX_UNDO_STEPS = 10;

interface CounterContext {
  date: Date | null;
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
  redoCount: number;
  counter: Counter;
  setNumber: (key: keyof Counter, value: number) => void;
  increment: (
    key: keyof TotalCounter | keyof EDCounter,
    category?: keyof Category,
  ) => void;
  undo: () => void;
  redo: () => void;
}

const counterContext = createContext<CounterContext | null>(null);

// Provider
export function CounterProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Counter[]>([]);
  const [redoStack, setRedoStack] = useState<Counter[]>([]);
  const [counter, setCounter] = useState<Counter>(DEFAULT_COUNTER);

  useEffect(() => {
    if (history.length === 0) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [history]);

  const increment = useCallback(
    (key: keyof TotalCounter | keyof EDCounter, category?: keyof Category) => {
      // Save current state into undo history (capped at MAX_UNDO_STEPS)
      setHistory((prevHistory) => [
        ...prevHistory.slice(-(MAX_UNDO_STEPS - 1)),
        counter,
      ]);

      // New increment branches away from any undone states, so clear redo stack
      setRedoStack([]);

      if (category) {
        setCounter((prev) => ({
          ...prev,
          total: {
            ...prev.total,
            [key]: {
              ...prev.total[key as keyof TotalCounter],
              [category]: prev.total[key as keyof TotalCounter][category] + 1,
            },
          },
        }));
      } else {
        setCounter((prev) => ({
          ...prev,
          ED: { ...prev.ED, [key]: prev.ED[key as keyof EDCounter] + 1 },
        }));
      }
    },
    [counter],
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;

    const previousCounter = history[history.length - 1];

    // Push current counter onto redoStack so it can be redone
    setRedoStack((prevRedo) => [...prevRedo, counter]);
    setHistory((prevHistory) => prevHistory.slice(0, -1));
    setCounter(previousCounter);
  }, [counter, history]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const nextCounter = redoStack[redoStack.length - 1];

    // Push current counter back onto history (also respecting MAX_UNDO_STEPS)
    setHistory((prevHistory) => [
      ...prevHistory.slice(-(MAX_UNDO_STEPS - 1)),
      counter,
    ]);
    setRedoStack((prevRedo) => prevRedo.slice(0, -1));
    setCounter(nextCounter);
  }, [counter, redoStack]);

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const setNumber = (key: keyof Counter, value: number) => {
    if (key === "ED" || key === "total") return;

    // Save current state into undo history (capped at MAX_UNDO_STEPS)
    setHistory((prevHistory) => [
      ...prevHistory.slice(-(MAX_UNDO_STEPS - 1)),
      counter,
    ]);

    // New increment branches away from any undone states, so clear redo stack
    setRedoStack([]);

    setCounter((prev) => ({ ...prev, [key]: value }));
  };

  const value = {
    date,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
    undoCount: history.length,
    redoCount: redoStack.length,
    counter,
    setNumber,
    increment,
    undo,
    redo,
  };

  return (
    <counterContext.Provider value={value}>{children}</counterContext.Provider>
  );
}

// Hook
export function useCounter() {
  const ctx = useContext(counterContext);
  if (!ctx) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return ctx;
}
