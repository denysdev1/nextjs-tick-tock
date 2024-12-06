import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, X } from 'lucide-react';
import { useTimerContext } from './TimerContext';
import { formatTime } from '../../utils/timeFormat';

type TimerItemProps = {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
};

// TODO: fix timer value and name changing logic

export const TimerItem: React.FC<TimerItemProps> = ({
  id,
  name,
  duration,
  remaining,
  isRunning,
}) => {
  const { startTimer, pauseTimer, resetTimer, removeTimer, editTimer } =
    useTimerContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editHours, setEditHours] = useState(
    Math.floor(duration / 3600).toString()
  );
  const [editMinutes, setEditMinutes] = useState(
    Math.floor((duration % 3600) / 60).toString()
  );
  const [editSeconds, setEditSeconds] = useState((duration % 60).toString());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nameInputRef.current &&
        !nameInputRef.current.contains(event.target as Node)
      ) {
        handleNameEdit();
      }

      if (
        timeInputRef.current &&
        !timeInputRef.current.contains(event.target as Node) &&
        isEditingTime
      ) {
        handleTimeEdit();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        if (isEditingName) handleNameEdit();
        if (isEditingTime) handleTimeEdit();

        setIsEditingName(false);
        setIsEditingTime(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNameEdit = () => {
    if (editName.trim() !== '') {
      editTimer(id, editName, duration);
    }
  };

  const handleTimeEdit = () => {
    const newDuration =
      parseInt(editHours || '0') * 3600 +
      parseInt(editMinutes || '0') * 60 +
      parseInt(editSeconds || '0');

    if (newDuration > 0) {
      editTimer(id, name, newDuration);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (isEditingTime) {
        handleTimeEdit();
      } else {
        handleNameEdit();
      }
    }
  };

  return (
    <Card className='w-full transition-all duration-300 ease-in-out'>
      <CardContent className='p-4 flex items-center'>
        <div className='mr-4 cursor-move'>
          <GripVertical size={24} />
        </div>
        <div className='flex-grow'>
          {isEditingName ? (
            <Input
              ref={nameInputRef}
              type='text'
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameEdit}
              onKeyDown={handleKeyDown}
              className='mb-2'
            />
          ) : (
            <h3
              className='text-lg font-semibold mb-2 cursor-pointer hover:text-blue-500'
              onClick={() => setIsEditingName(true)}
            >
              {name}
            </h3>
          )}
          {isEditingTime ? (
            <div className='flex space-x-2 mb-4' ref={timeInputRef}>
              <Input
                type='number'
                value={editHours}
                onChange={(e) => setEditHours(e.target.value)}
                placeholder='HH'
                min='0'
                max='23'
                onKeyDown={handleKeyDown}
              />
              <Input
                type='number'
                value={editMinutes}
                onChange={(e) => setEditMinutes(e.target.value)}
                placeholder='MM'
                min='0'
                max='59'
                onKeyDown={handleKeyDown}
              />
              <Input
                type='number'
                value={editSeconds}
                onChange={(e) => setEditSeconds(e.target.value)}
                placeholder='SS'
                min='0'
                max='59'
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <div
              className='text-3xl font-bold mb-4 cursor-pointer hover:text-blue-500'
              onClick={() => !isRunning && setIsEditingTime(true)}
            >
              {formatTime(remaining)}
            </div>
          )}
          <div className='h-2 bg-gray-200 rounded-full mb-2 dark:bg-gray-700'>
            <div
              className='h-full bg-blue-500 rounded-full transition-all duration-1000 ease-in-out'
              style={{ width: `${(remaining / duration) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between p-4'>
        {isRunning ? (
          <Button onClick={() => pauseTimer(id)}>Pause</Button>
        ) : (
          <Button onClick={() => startTimer(id)}>Start</Button>
        )}
        <Button onClick={() => resetTimer(id)} variant='outline'>
          Reset
        </Button>
        <Button onClick={() => removeTimer(id)} variant='destructive'>
          <X size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
};

