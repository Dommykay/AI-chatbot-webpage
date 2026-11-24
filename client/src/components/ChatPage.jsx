import TempleLayout from './TempleLayout.jsx';
import BackButton from './BackButton.jsx';
import ChatMessage from './ChatMessage.jsx';
import MessageInput from './MessageInput.jsx';
import './components.css';

/**
 * Conversation screen.
 * messages: [{ from: 'user' | 'bot', text: string }]
 */
export default function ChatPage({ messages, onSend, onBack }) {
  return (
    <TempleLayout>
      <section className="chat">
        <BackButton onClick={onBack} />

        <div className="chat__messages">
          {messages.map((message, i) => (
            <ChatMessage key={i} from={message.from}>
              {message.text}
            </ChatMessage>
          ))}
        </div>

        <MessageInput onSend={onSend} />
        <p className="disclaimer">A character voice drawn from Arrian and Plutarch. Not a historical source.</p>
      </section>
    </TempleLayout>
  );
}
