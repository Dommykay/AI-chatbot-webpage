import './components.css';

/** Numbered starter question shown on the welcome page. */
export default function SuggestionButton({ number, children, onClick }) {
  return (
    <button type="button" className="suggestion-button" onClick={onClick}>
      <span className="suggestion-button__number">{number}</span>
      {children}
    </button>
  );
}
