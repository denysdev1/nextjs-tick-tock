'use client';

import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { TimerItem } from './TimerItem';
import { CreateTimer } from './CreateTimer';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TimerProvider, useTimerContext } from './TimerContext';
import { useAnimatedUnmount } from '@/hooks/useAnimatedUnmount';

const TimerList: React.FC = () => {
  const { timers, reorderTimers } = useTimerContext();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    reorderTimers(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='timerList' direction='vertical'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='space-y-4'
          >
            <AnimatePresence initial={false}>
              {timers.map((timer, index) => (
                <Draggable key={timer.id} draggableId={timer.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TimerItem {...timer} />
                      </motion.div>
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const Timer: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { shouldRender } = useAnimatedUnmount(isCreateModalOpen, 300);

  return (
    <TimerProvider>
      <div className='container mx-auto px-4'>
        <Button onClick={() => setIsCreateModalOpen(true)} className='mb-4'>
          <Plus className='mr-2 h-4 w-4' /> Create New Timer
        </Button>
        <TimerList />
        {shouldRender && (
          <CreateTimer
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </div>
    </TimerProvider>
  );
};

