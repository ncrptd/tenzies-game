export default function Dice(props) {
  return (
    <div className={props.isHeld ? 'dice isHeld' : 'dice'}>
      <h2>{props.value}</h2>
    </div>
  );
}
