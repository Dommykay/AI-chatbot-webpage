import './components.css';

/** One chat bubble. `from` is "user" (blue, right) or "bot" (card, left, with author name). */
export default function ChatMessage({ from, author = 'Alexander', children }) {
  return (
    <div className={`chat-message chat-message--${from}`}>
      {from === 'bot' && <span className="chat-message__author">{author}</span>}
      <p>{children}</p>
    </div>
  );
}
