import { useState,useEffect,useCallback } from 'react'

function App() {
  const initialTimeInSeconds = 2 * 60 * 60; // 2 hours in seconds
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  const decrementTime = useCallback(() => {
    setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  }, []);

  useEffect(() => {
    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [decrementTime]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        Time Left: {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
}

export default App
