import { useLayoutEffect, useRef } from 'react';
import { reduceMotion } from './motion.js';
import './components.css';

/**
 * One chat bubble. `from` is "user" (blue, right) or "bot" (card, left, with author name).
 * `typing` shows three bouncing dots instead of text. When it flips to false on the same
 * element, the bubble grows from the dots' size to the message's size.
 */
// `still` skips the entry animation for a bubble that was already on screen before.
export default function ChatMessage({ from, author = 'Alexander', typing = false, still = false, children }) {
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
    // Keep the growing bubble's bottom in view every frame so the scroll moves with the grow.
    let frame;
    const follow = () => {
      el.scrollIntoView({ block: 'nearest' });
      frame = requestAnimationFrame(follow);
    };
    follow();
    grow.onfinish = grow.oncancel = () => cancelAnimationFrame(frame);
    return () => cancelAnimationFrame(frame);
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
    <div ref={ref} className={`chat-message chat-message--${from}${still ? ' chat-message--still' : ''}`}>
      {from === 'bot' && <span className="chat-message__author">{author}</span>}
      <p>{children}</p>
    </div>
  );
}
