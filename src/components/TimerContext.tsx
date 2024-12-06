'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { playCompletionSound } from '@/utils/completionSound';

type Timer = {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
};

type TimerContextType = {
  timers: Timer[];
  addTimer: (name: string, duration: number) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  reorderTimers: (startIndex: number, endIndex: number) => void;
  editTimer: (id: string, name: string, duration: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timers, setTimers] = useState<Timer[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const savedTimers = localStorage.getItem('timers');
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const addTimer = (name: string, duration: number) => {
    setTimers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        duration,
        remaining: duration,
        isRunning: false,
      },
    ]);
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const startTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );
  };

  const pauseTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? { ...timer, remaining: timer.duration, isRunning: false }
          : timer
      )
    );
  };

  const reorderTimers = (startIndex: number, endIndex: number) => {
    setTimers((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const editTimer = (id: string, name: string, duration: number) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? { ...timer, name, duration, remaining: duration, isRunning: false }
          : timer
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.isRunning && timer.remaining > 0) {
            return { ...timer, remaining: timer.remaining - 1 };
          } else if (timer.isRunning && timer.remaining === 0) {
            toast.success(`Timer "${timer.name}" completed!`);
            playCompletionSound();
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        removeTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        reorderTimers,
        editTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

