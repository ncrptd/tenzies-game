import { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Dice from './components/Dice';
import Timer from './components/Timer';
function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [start, setStart] = useState(false);
  const [highScore, setHighScore] = useState('00:00:00');

  useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

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
  function handleStart() {
    setStart(!start);
  }
  return (
    <div className="app">
      {tenzies && <Confetti />}
      {start && <Timer />}
      {start && <p className="highScore">High Score: {highScore} </p>}

      <main>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        {!start || (
          <button className="btn" onClick={rollDice}>
            {tenzies ? 'Reset Game' : 'Roll'}
          </button>
        )}
        {start || (
          <button className="btn" onClick={handleStart}>
            Start
          </button>
        )}
      </main>
    </div>
  );
}
export default App;
