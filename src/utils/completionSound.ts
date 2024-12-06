export const playCompletionSound = async () => {
  try {
    if (typeof window !== 'undefined') {
      const sound = new Audio('/timer-end.wav');
      sound.volume = 0.3;

      await sound.play();
    }
  } catch (error) {
    console.warn('Failed to play completion sound:', error);
  }
};
