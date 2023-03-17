import { useState } from 'react';
import './App.css';
import Dice from './components/Dice';
function App() {
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }
  const [dice, setDice] = useState(allNewDice());
  const diceElements = dice.map((num) => <Dice value={num} key={num} />);

  return (
    <div className="app">
      <main>
        <div className="dice-container">{diceElements}</div>
      </main>
    </div>
  );
}
export default App;
