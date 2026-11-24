import { useState } from 'react';
import { ChatPage, WelcomePage } from './components';
import { getReply } from './chatApi.js';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  async function ask(text) {
    if (isTyping) return; // one question at a time
    const withQuestion = [...messages, { from: 'user', text }];
    setMessages(withQuestion);
    setIsTyping(true);
    try {
      const reply = await getReply(withQuestion);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } finally {
      setIsTyping(false); // unlock even if the request fails
    }
  }

  if (messages.length === 0) return <WelcomePage onAsk={ask} />;
  return (
    <ChatPage messages={messages} isTyping={isTyping} onSend={ask} onBack={() => !isTyping && setMessages([])} />
  );
}
