'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTimerContext } from './TimerContext';

interface CreateTimerProps {
  open: boolean;
  onClose: () => void;
}

export const CreateTimer: React.FC<CreateTimerProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const { addTimer } = useTimerContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds =
      parseInt(hours || '0') * 3600 +
      parseInt(minutes || '0') * 60 +
      parseInt(seconds || '0');
    if (totalSeconds > 0) {
      addTimer(name || 'Timer', totalSeconds);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Create New Timer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='text'
            placeholder='Timer Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='flex space-x-2'>
            <Input
              type='number'
              placeholder='HH'
              min='0'
              max='23'
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <Input
              type='number'
              placeholder='MM'
              min='0'
              max='59'
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <Input
              type='number'
              placeholder='SS'
              min='0'
              max='59'
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </div>
          <Button type='submit' className='w-full'>
            Create Timer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

