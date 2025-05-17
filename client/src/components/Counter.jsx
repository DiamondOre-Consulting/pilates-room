import { useEffect, useState } from "react";

const getCountdownToDateTime = (scheduledTime) => {
  const now = new Date();
  const [targetHour, targetMinute] = scheduledTime.split(":").map(Number);

  const target = new Date();
  target.setHours(targetHour, targetMinute, 0, 0);

  if (now >= target) {
    target.setDate(target.getDate() + 1); // move to next day
  }

  const diffInSeconds = Math.floor((target - now) / 1000);
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return { hours, minutes, seconds };
};

const Counter = ({ scheduledDateTime = "18:30" }) => {
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const time = getCountdownToDateTime(scheduledDateTime);
      setRemainingTime(time);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [scheduledDateTime]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <span className="text-green-600 text-sm">
      {formatTime(remainingTime.hours)}:
      {formatTime(remainingTime.minutes)}:
      {formatTime(remainingTime.seconds)}
    </span>
  );
};

export default Counter;
