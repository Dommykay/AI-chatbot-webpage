import TempleLayout from './TempleLayout.jsx';
import BackButton from './BackButton.jsx';
import Switch from './Switch.jsx';
import './components.css';

/** Settings screen. Setting values live in App; onBack returns to whichever page opened it. */
export default function SettingsPage({ reduceMotion, onReduceMotionChange, onBack }) {
  return (
    <TempleLayout>
      <section className="settings">
        <BackButton onClick={onBack} />
        <h1 className="settings__title">Settings</h1>
        <div className="settings__list">
          <Switch label="Reduce animations" checked={reduceMotion} onChange={onReduceMotionChange} />
        </div>
      </section>
    </TempleLayout>
  );
}
