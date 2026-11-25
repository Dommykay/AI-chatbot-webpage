import TempleLayout from './TempleLayout.jsx';
import MessageInput from './MessageInput.jsx';
import SuggestionButton from './SuggestionButton.jsx';
import './components.css';

const SUGGESTIONS = [
  'What did the oracle at Siwa tell you?',
  'Did you really cut the Gordian knot?',
  'What did you leave at the tomb of Achilles?',
];

/** Landing screen: title, message box and starter questions. Both inputs call onAsk(question). */
export default function WelcomePage({ onAsk, onSettings }) {
  return (
    <TempleLayout onSettings={onSettings}>
      <section className="welcome">
        <p className="welcome__eyebrow">Alexander III of Macedon</p>
        <h1 className="welcome__title">
          The oracle called him <span className="accent">invincible.</span>
        </h1>
        <p className="welcome__subtitle">Bring a question and see whether she was right.</p>

        <MessageInput onSend={onAsk} />

        <div className="welcome__suggestions">
          {SUGGESTIONS.map((question, i) => (
            <SuggestionButton key={question} number={i + 1} onClick={() => onAsk?.(question)}>
              {question}
            </SuggestionButton>
          ))}
        </div>

        <p className="disclaimer">A character voice drawn from Arrian and Plutarch. Not a historical source.</p>
      </section>
    </TempleLayout>
  );
}
