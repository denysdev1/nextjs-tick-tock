import { useState, useEffect } from 'react';

export const useAnimatedUnmount = (open: boolean, duration: number = 200) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration]);

  return { shouldRender, isAnimating };
};
