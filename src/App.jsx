import { useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import { nanoid } from 'nanoid';
function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
    }
    return newDice;
  }
  const diceElements = dice.map(({ value, isHeld }) => (
    <Dice value={value} key={nanoid()} />
  ));

  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <div className="app">
      <main>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button onClick={rollDice} className="roll">
          Roll
        </button>
      </main>
    </div>
  );
}
export default App;
