import { useLayoutEffect, useRef } from 'react';
import './components.css';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One chat bubble. `from` is "user" (blue, right) or "bot" (card, left, with author name).
 * `typing` shows three bouncing dots instead of text. When it flips to false on the same
 * element, the bubble grows from the dots' size to the message's size.
 */
export default function ChatMessage({ from, author = 'Alexander', typing = false, children }) {
  const ref = useRef(null);
  const lastSize = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const before = lastSize.current;
    const after = { width: `${el.offsetWidth}px`, height: `${el.offsetHeight}px` };
    lastSize.current = after;
    if (!before || typing || reduceMotion()) return;

    const grow = el.animate(
      { width: [before.width, after.width], height: [before.height, after.height] },
      { duration: 300, easing: 'ease-out' },
    );
    // The list scrolled to the bottom before the bubble grew; follow it down.
    grow.onfinish = () => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [typing]);

  if (typing) {
    return (
      <div ref={ref} className={`chat-message chat-message--${from} chat-message--typing`} role="status" aria-label={`${author} is typing`}>
        <span className="typing-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className={`chat-message chat-message--${from}`}>
      {from === 'bot' && <span className="chat-message__author">{author}</span>}
      <p>{children}</p>
    </div>
  );
}
