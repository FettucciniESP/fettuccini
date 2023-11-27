import { useState } from 'react';

const useTimeRemaining = (timeDuration: number) => {
  const [time, setTime] = useState<number>(timeDuration*60);

  const handleTimeUp = (): void => {
    setTime(timeDuration*60);
  };

  return { time, handleTimeUp };
};

export default useTimeRemaining;
