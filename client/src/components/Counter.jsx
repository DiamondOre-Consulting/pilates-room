import { useEffect, useState } from "react";

/** Parse “18:30”, “11:50 AM”, “11:50 AM:00”, etc. → {h, m} */
const parseTime = (raw) => {
  const cleaned = raw.trim().toUpperCase();

  // 12‑hour?
  const ampmMatch = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/);
  if (ampmMatch) {
    let h = Number(ampmMatch[1]);
    const m = Number(ampmMatch[2]);
    const period = ampmMatch[3];
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return { h, m };
  }

  // simple 24‑hour “HH:mm”
  const [h, m] = cleaned.split(":").map(Number);
  return { h, m };
};

const getCountdownToDateTime = (scheduledTime) => {
  const now = new Date();
  const { h: targetHour, m: targetMinute } = parseTime(scheduledTime);

  const target = new Date();
  target.setHours(targetHour, targetMinute, 0, 0);
// console.log("targeeeeeeeeeet",target)
  // if target already passed today, move to tomorrow
  if (now >= target) target.setDate(target.getDate() + 1);

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
    const update = () => setRemainingTime(getCountdownToDateTime(scheduledDateTime));
    update();                          // initial render
    const id = setInterval(update, 1000);
    return () => clearInterval(id);    // cleanup
  }, [scheduledDateTime]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <span className="text-green-600 text-sm">
      {pad(remainingTime.hours)}:{pad(remainingTime.minutes)}:{pad(remainingTime.seconds)}
    </span>
  );
};

export default Counter;
