import { useState } from 'react';
import { ChatPage, WelcomePage } from './components';

export default function App() {
  const [messages, setMessages] = useState([]);

  // shortcut: no backend yet, so questions are only echoed into the chat.
  const ask = (text) => setMessages((prev) => [...prev, { from: 'user', text }]);

  if (messages.length === 0) return <WelcomePage onAsk={ask} />;
  return <ChatPage messages={messages} onSend={ask} onBack={() => setMessages([])} />;
}
