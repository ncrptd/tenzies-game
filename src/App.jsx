import { useState, useEffect } from 'react';
import './App.css';
import Dice from './components/Dice';
import { nanoid } from 'nanoid';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

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

  return (
    <div className="app">
      <main>
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll" onClick={rollDice}>
          {tenzies ? 'Reset Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}
export default App;
