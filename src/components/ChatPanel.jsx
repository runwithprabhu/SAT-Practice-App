import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./ChatPanel.css";

// In development, use Vite proxy to avoid CORS. In production (AWS), call directly.
const API_URL = import.meta.env.DEV
  ? "/api/chat"
  : "https://text.pollinations.ai/openai/v1/chat/completions";

function ChatPanel({ question, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const buildContext = () => {
    let context = "";
    if (question.passage) {
      context += `Passage: ${question.passage}\n\n`;
    }
    context += `Question: ${question.question}\n\n`;
    context += `Options:\n`;
    question.options.forEach((opt, i) => {
      context += `${String.fromCharCode(65 + i)}) ${opt}\n`;
    });
    return context;
  };

  const handleAskAI = async (userMessage) => {
    const questionContext = buildContext();
    const userPrompt = userMessage
      ? `${questionContext}\n\nStudent asks: ${userMessage}`
      : `${questionContext}\n\nPlease explain this SAT question step by step. What is the correct answer and why? Be concise.`;

    const newMessages = [
      ...messages,
      { role: "user", content: userMessage || "Explain this question" },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful SAT tutor. Help the student understand the question. Give clear, step-by-step explanations. Be concise and accurate.",
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status}). Please try again.`);
      }

      const data = await response.json();
      const aiResponse =
        data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";

      setMessages([...newMessages, { role: "assistant", content: aiResponse.trim() }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleAskAI(input.trim());
    }
  };

  return createPortal(
    <div
      className="chat-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="chat-panel" role="dialog" aria-label="AI Chat Assistant">
        <div className="chat-header">
          <div className="chat-title">
            <span className="chat-icon">🤖</span>
            <h4>AI Tutor</h4>
          </div>
          <button
            className="btn-close-chat"
            onClick={onClose}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-question-context">
          <span className="context-label">📌 Question:</span>
          {question.passage && (
            <p className="context-passage">{question.passage}</p>
          )}
          <p className="context-text">{question.question}</p>
          <div className="context-options">
            {question.options.map((opt, i) => (
              <span key={i} className="context-option">
                {String.fromCharCode(65 + i)}) {opt}
              </span>
            ))}
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              <p>Get AI help with this question — no setup needed!</p>
              <button
                className="btn-quick-ask"
                onClick={() => handleAskAI("")}
                disabled={loading}
              >
                ✨ Explain this question
              </button>
              <p className="chat-hint">
                Or type your own question below
              </p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              <span className="msg-avatar">
                {msg.role === "user" ? "👤" : "🤖"}
              </span>
              <div className="msg-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message assistant">
              <span className="msg-avatar">🤖</span>
              <div className="msg-content loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this question..."
            className="chat-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="btn-send"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default ChatPanel;
