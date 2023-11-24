import { useState } from 'react';

const useTimeRemaining = (initialTime: number = 3605) => {
  const [time, setTime] = useState<number>(initialTime);

  const handleTimeUp = (): void => {
    setTime(time + 5);
  };

  return { time, handleTimeUp };
};

export default useTimeRemaining;
