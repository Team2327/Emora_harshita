import { useState } from "react";
import type { ChatbotState } from "../types/chatbot";
import {
  createInitialChatbotState,
  processChatbotMessage,
} from "../services/chatbotService";

function Chatbot() {
  const [state, setState] = useState<ChatbotState>(
    createInitialChatbotState()
  );

  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const result = processChatbotMessage(
      state,
      trimmedMessage
    );

    setState(result.state);
    setMessage("");
  };

  return (
    <section className="chatbot-card">
      <div className="chatbot-header">
        <h2>Talk to Emora</h2>
        <p>A safe space to check in and talk.</p>
      </div>

      <div className="chatbot-messages">
        {state.messages.length === 0 ? (
          <div className="chatbot-empty">
            <p>Hi, I'm Emora.</p>
            <p>
              You can tell me how you're feeling, and I'll
              try to guide you toward something helpful.
            </p>
          </div>
        ) : (
          state.messages.map((chatMessage, index) => (
            <div
              key={`${chatMessage.timestamp}-${index}`}
              className={`chat-message ${chatMessage.role}`}
            >
              <span>{chatMessage.text}</span>
            </div>
          ))
        )}
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="How are you feeling?"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>

     {state.isEscalated && (
        <div className="safety-panel">
            <strong>You don't have to handle this alone.</strong>

            <p>
            Please choose the kind of support that feels most
            appropriate right now.
            </p>

            <div className="safety-actions">
            <button
                type="button"
                onClick={() => {
                    window.location.href =
                    "mailto:?subject=I need some support&body=I'm having a difficult time and could use someone to talk to.";
                }}
                >
                Contact a Trusted Person
            </button>

            <button
                type="button"
                onClick={() => {
                    window.location.href = "tel:112";
                }}
                >
                Contact Emergency Services
            </button>

            <button
                type="button"
                onClick={() => {
                    alert(
                    "Professional support resources will be available here."
                    );
                }}
                >
                Seek Professional Help
            </button>
            </div>
        </div>
        )}
    </section>
  );
}

export default Chatbot;