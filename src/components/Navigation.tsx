'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className='mb-8 relative'>
      <ul className='flex justify-center space-x-4'>
        <li>
          <Link
            href='/'
            className={`inline-block px-4 py-2 rounded-md ${
              pathname === '/'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Timers
          </Link>
        </li>
        <li>
          <Link
            href='/stopwatch'
            className={`inline-block px-4 py-2 rounded-md ${
              pathname === '/stopwatch'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Stopwatch
          </Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
};

