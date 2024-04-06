import React, { useState, useEffect } from 'react';
import clockImg from '../../assets/clock.png';

interface CheckoutTimerProps {
  onTimeout: () => void;
  secondsRemaining: number;
  setSecondsRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const CheckoutTimer: React.FC<CheckoutTimerProps> = ({ onTimeout, secondsRemaining, setSecondsRemaining }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
        localStorage.setItem('timeLeft', (secondsRemaining-1).toString());
      } else {
        onTimeout(); // Call the onTimeout callback when timeout occurs
      }
    }, 1000); // Update every second

    return () => clearTimeout(timer);
  }, [secondsRemaining, onTimeout]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <><img src={clockImg} style={{ width: "20px", marginRight: "5px" }} />You have {formatTime(secondsRemaining)} to complete order</>
  );
};

export default CheckoutTimer;
