import { useState } from 'react';
import pigeonImg from '../assets/send-pigeon.png';
import './components.css';

/**
 * Text box with the pigeon send button. Calls onSend(text) with the trimmed message.
 * While `disabled`, the user can keep typing but cannot send.
 */
export default function MessageInput({ onSend, disabled = false, placeholder = 'Ask your questions…' }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const message = text.trim();
    if (!message || disabled) return;
    onSend?.(message);
    setText('');
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        className="message-input__field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label="Message"
      />
      <button type="submit" className="message-input__send" aria-label="Send message" disabled={disabled}>
        <img src={pigeonImg} alt="" />
      </button>
    </form>
  );
}
