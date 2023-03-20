import { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Dice from './components/Dice';
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [start, setStart] = useState(false);
  const [highScore, setHighScore] = useState(
    JSON.parse(
      localStorage.getItem('highScore') ||
        JSON.stringify({
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
    )
  );

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  if (seconds > 59) {
    setSeconds(0);
    setMinutes((minute) => minute + 1);
  }
  if (minutes > 59) {
    setMinutes(0);
    setHours((hour) => hour + 1);
  }
  if (hours > 23) {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }
  useEffect(() => {
    let timer = null;
    if (start && !tenzies) {
      timer = setInterval(() => {
        setSeconds((second) => second + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start, tenzies]);

  useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    if (tenzies) {
      const time = { hours: hours, minutes: minutes, seconds: seconds };
      const storedScore = JSON.parse(localStorage.getItem('highScore'));
      if (
        !storedScore ||
        time.hours < storedScore.hours ||
        (time.hours === storedScore.hours &&
          time.minutes < storedScore.minutes) ||
        (time.hours === storedScore.hours &&
          time.minutes === storedScore.minutes &&
          time.seconds < storedScore.seconds)
      ) {
        localStorage.setItem('highScore', JSON.stringify(time));
        setHighScore(time);
      }
    }
  }, [tenzies]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  const diceElements = dice.map(({ value, isHeld, id }) => (
    <Dice
      value={value}
      key={id}
      isHeld={isHeld}
      holdDice={() => holdDice(id)}
    />
  ));

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setStart(false);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((dice) => {
          if (dice.isHeld) {
            return { ...dice };
          } else {
            return generateNewDice();
          }
        })
      );
    }
  }

  function holdDice(id) {
    setStart(true);
    if (tenzies) {
      return;
    }
    setDice((prevDice) => {
      return prevDice.map((dice) => {
        if (dice.id === id) {
          return { ...dice, isHeld: !dice.isHeld };
        } else {
          return { ...dice };
        }
      });
    });
  }

  return (
    <div className="app">
      {tenzies && <Confetti />}
      <div className="timer-container">
        <span>
          <span className="text">Timer </span>
          <span className="timer">
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </span>
      </div>
      <div className="highScore-container">
        <span>
          <span className="title">HighScore </span>
          <span className="highScore">
            {highScore.hours < 10 ? `0${highScore.hours}` : highScore.hours}:
            {highScore.minutes < 10
              ? `0${highScore.minutes}`
              : highScore.minutes}
            :
            {highScore.seconds < 10
              ? `0${highScore.seconds}`
              : highScore.seconds}
          </span>
        </span>
      </div>
      <main>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="btn" onClick={rollDice}>
          {tenzies ? 'Reset Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}
export default App;
