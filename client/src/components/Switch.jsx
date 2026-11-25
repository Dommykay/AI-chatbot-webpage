import './components.css';

/** Temple-themed on/off switch. Calls onChange(newValue) when clicked. */
export default function Switch({ label, checked, onChange }) {
  return (
    <label className="switch">
      <span className="switch__label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className="switch__track"
        onClick={() => onChange(!checked)}
      >
        <span className="switch__knob" />
      </button>
    </label>
  );
}
