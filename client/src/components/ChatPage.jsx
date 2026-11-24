import { useEffect, useRef } from 'react';
import TempleLayout from './TempleLayout.jsx';
import BackButton from './BackButton.jsx';
import ChatMessage from './ChatMessage.jsx';
import MessageInput from './MessageInput.jsx';
import './components.css';

/**
 * Conversation screen.
 * messages: [{ from: 'user' | 'bot', text: string }]
 * isTyping: true while waiting for the bot; shows "…" and blocks sending.
 */
export default function ChatPage({ messages, isTyping, onSend, onBack }) {
  const listRef = useRef(null);

  // Glide to the newest message whenever one is added or the typing bubble appears.
  useEffect(() => {
    const list = listRef.current;
    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages.length, isTyping]);

  return (
    <TempleLayout>
      <section className="chat">
        <BackButton onClick={onBack} />

        <div className="chat__messages" ref={listRef}>
          {messages.map((message, i) => (
            <ChatMessage key={i} from={message.from}>
              {message.text}
            </ChatMessage>
          ))}
          {isTyping && <ChatMessage from="bot">…</ChatMessage>}
        </div>

        <MessageInput onSend={onSend} disabled={isTyping} />
        <p className="disclaimer">A character voice drawn from Arrian and Plutarch. Not a historical source.</p>
      </section>
    </TempleLayout>
  );
}
