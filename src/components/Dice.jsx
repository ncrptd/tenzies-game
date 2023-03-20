export default function Dice(props) {
  return (
    <div
      className={props.isHeld ? 'dice isHeld' : 'dice'}
      onClick={props.holdDice}
    >
      <img
        src={`public/assets/dice/dice 0${props.value}.svg`}
        alt={props.value}
      />
    </div>
  );
}
