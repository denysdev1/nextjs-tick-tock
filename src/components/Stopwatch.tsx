'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatTime } from '../../utils/timeFormat';

export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardContent className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>Stopwatch</h3>
        <div className='text-3xl font-bold mb-4'>{formatTime(time)}</div>
      </CardContent>
      <CardFooter className='flex justify-between p-4'>
        {isRunning ? (
          <Button onClick={handlePause}>Pause</Button>
        ) : (
          <Button onClick={handleStart}>Start</Button>
        )}
        <Button onClick={handleReset} variant='outline'>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

