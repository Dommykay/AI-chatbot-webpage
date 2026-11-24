/**
 * Get Alexander's reply to the conversation so far.
 * messages: [{ from: 'user' | 'bot', text: string }] — includes the new question last.
 * Returns a Promise<string> so callers won't change when the backend is wired in.
 */
// shortcut: canned reply until the backend exists; replace the body with a fetch() to the server.
export async function getReply(messages) {
  void messages;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake "typing" delay
  return 'The oracle has not yet spoken. Ask me again once the backend is connected.';
}
