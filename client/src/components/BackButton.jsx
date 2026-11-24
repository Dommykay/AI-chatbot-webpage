import arrowImg from '../assets/back-arrow.png';
import './components.css';

export default function BackButton({ onClick }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <img src={arrowImg} alt="" />
      Back
    </button>
  );
}
