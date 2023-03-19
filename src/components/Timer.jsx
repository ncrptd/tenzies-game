import { useState, useEffect } from 'react';
export default function Timer() {
  const [{ hours, minutes, seconds }, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setTimer((prevTime) => {
        return { ...prevTime, seconds: prevTime.seconds + 1 };
      });
      if (seconds === 59) {
        setTimer((prevTime) => {
          return { ...prevTime, seconds: 0, minutes: prevTime.minutes + 1 };
        });
      } else if (minutes === 59) {
        setTimer((prevTime) => {
          return {
            ...prevTime,
            seconds: 0,
            minutes: 0,
            hours: prevTime.hours + 1,
          };
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  function Stop() {
    clearInterval(timer);
  }
  return (
    <div className="timer">
      <p>
        Timer:
        <span> {hours < 10 ? `0${hours}` : hours}</span>:
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </p>
    </div>
  );
}
