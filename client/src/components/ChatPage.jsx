import { useEffect, useRef } from 'react';
import TempleLayout from './TempleLayout.jsx';
import BackButton from './BackButton.jsx';
import ChatMessage from './ChatMessage.jsx';
import MessageInput from './MessageInput.jsx';
import { reduceMotion } from './motion.js';
import './components.css';

/**
 * Conversation screen.
 * messages: [{ from: 'user' | 'bot', text: string }]
 * isTyping: true while waiting for the bot; shows the typing dots and blocks sending.
 * animateFrom: messages before this index were already shown, so they appear without animating.
 */
export default function ChatPage({ messages, isTyping, animateFrom = 0, onSend, onBack, onSettings }) {
  const listRef = useRef(null);
  const hasScrolled = useRef(false);
  // The typing bubble sits in the same list at the index the reply will take, so React
  // reuses that element for the reply and it can grow from the dots into the message.
  const bubbles = isTyping ? [...messages, { from: 'bot', typing: true }] : messages;

  // Glide to the newest message whenever one is added or the typing bubble appears.
  // The first scroll is instant so returning from settings doesn't glide down the whole chat.
  useEffect(() => {
    const list = listRef.current;
    const glide = hasScrolled.current && !reduceMotion();
    list.scrollTo({ top: list.scrollHeight, behavior: glide ? 'smooth' : 'instant' });
    hasScrolled.current = true;
  }, [messages.length, isTyping]);

  return (
    <TempleLayout onSettings={onSettings}>
      <section className="chat">
        <BackButton onClick={onBack} />

        <div className="chat__messages" ref={listRef}>
          {bubbles.map((message, i) => (
            <ChatMessage key={i} from={message.from} typing={message.typing} still={i < animateFrom}>
              {message.text}
            </ChatMessage>
          ))}
        </div>

        <MessageInput onSend={onSend} disabled={isTyping} />
        <p className="disclaimer">A character voice drawn from Arrian and Plutarch. Not a historical source.</p>
      </section>
    </TempleLayout>
  );
}
