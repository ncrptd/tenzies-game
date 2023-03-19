export default function Dice(props) {
  return (
    <div
      className={props.isHeld ? 'dice isHeld' : 'dice'}
      onClick={props.holdDice}
    >
      <img src={`src/assets/dice/dice 0${props.value}.svg`} alt="" />
      {/* <h2>{props.value}</h2> */}
    </div>
  );
}
