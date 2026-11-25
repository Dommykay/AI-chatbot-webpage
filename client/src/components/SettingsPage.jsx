import { useState } from 'react';
import TempleLayout from './TempleLayout.jsx';
import BackButton from './BackButton.jsx';
import Switch from './Switch.jsx';
import './components.css';

/** Settings screen. onBack returns to whichever page opened it. */
export default function SettingsPage({ onBack }) {
  // shortcut: placeholder setting that does nothing and resets on each visit; move real settings' state into App.
  const [example, setExample] = useState(false);

  return (
    <TempleLayout>
      <section className="settings">
        <BackButton onClick={onBack} />
        <h1 className="settings__title">Settings</h1>
        <div className="settings__list">
          <Switch label="Example setting" checked={example} onChange={setExample} />
        </div>
      </section>
    </TempleLayout>
  );
}
