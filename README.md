# Tick Tock ⏰

A modern, feature-rich timer and stopwatch application built with Next.js and TypeScript.

[DEMO](https://nextjs-tick-tock.vercel.app/)

## Features

- **Multiple Timers**

  - Create and manage multiple timers simultaneously
  - Drag and drop to reorder timers
  - Edit timer names and durations on the fly
  - Visual progress bars for each timer
  - Sound notification when timer completes

- **Stopwatch**

  - Simple and accurate stopwatch functionality
  - Start, pause, and reset controls

- **Modern UI/UX**
  - Clean, responsive design
  - Dark/Light theme support
  - Smooth animations and transitions
  - Drag and drop functionality

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- react-beautiful-dnd
- shadcn/ui components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tick-tock.git
cd tick-tock
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── utils/             # Helper functions
```

## Key Components

- `Timer`: Main timer management component with drag-and-drop functionality
- `TimerItem`: Individual timer component with editing capabilities
- `Stopwatch`: Standalone stopwatch component
- `TimerContext`: Global state management for timers
- `ThemeToggle`: Dark/Light theme switcher

