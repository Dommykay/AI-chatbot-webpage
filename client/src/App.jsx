import { useEffect, useState } from 'react';
import { ChatPage, SettingsPage, WelcomePage } from './components';
import { getReply } from './chatApi.js';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => setShowSettings(true);
  // Messages before this index were already on screen, so they don't replay their entry animation.
  const [animateFrom, setAnimateFrom] = useState(0);
  // Starts from the device's "reduce motion" setting; the class switches off every animation.
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
  }, [reduceMotion]);

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

  // Messages live here, so leaving for settings and coming back keeps the chat.
  if (showSettings) {
    return (
      <SettingsPage
        reduceMotion={reduceMotion}
        onReduceMotionChange={setReduceMotion}
        onBack={() => {
          setAnimateFrom(messages.length);
          setShowSettings(false);
        }}
      />
    );
  }
  if (messages.length === 0) return <WelcomePage onAsk={ask} onSettings={openSettings} />;
  return (
    <ChatPage
      messages={messages}
      isTyping={isTyping}
      animateFrom={animateFrom}
      onSend={ask}
      onBack={() => {
        if (isTyping) return;
        setMessages([]);
        setAnimateFrom(0);
      }}
      onSettings={openSettings}
    />
  );
}
