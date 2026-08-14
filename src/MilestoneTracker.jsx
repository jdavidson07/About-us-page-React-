import { useState, useEffect } from "react";

const CRISIS_WORDS = ["help", "hurt", "die", "suicide", "depressed", "emergency", "hopeless"];
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;
const STORAGE_KEY = "community_messages"; 

export default function MilestoneTracker() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isCrisis, setIsCrisis] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const recent = saved.filter(msg => Date.now() - msg.time < FORTY_EIGHT_HOURS);
    setMessages(recent);
  }, []);

  
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleShare = () => {
    const lastSubmit = parseInt(localStorage.getItem("user_submitted_message"));
    const now = Date.now();

    if (lastSubmit && now - lastSubmit < TWENTY_FOUR_HOURS) {
      alert("You have already shared a message today, please share one tomorrow!");
      return;
    }

    const trimmed = inputText.trim();
    const lower = trimmed.toLowerCase();
    const crisisDetected = CRISIS_WORDS.some(word => lower.includes(word));

    if (crisisDetected) {
      setIsCrisis(true);
      return;
      }

    if (trimmed.length > 0) {
      const newMessage = { text: trimmed, time: now };

      localStorage.setItem("user_submitted_message", now);
      const updated = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      updated.push(newMessage);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      setMessages(prev => [newMessage, ...prev]);
      setShowSuccess(true);
      setInputText("");
    }
  };

  const charCount = inputText.length;

  return (
    <div className={`milestone-wrapper ${isFocused ? "focused" : ""}`}>
      <h5 className="milestone-title">
        <span>Community Milestones</span> - Share a message!
      </h5>

      <div className="milestone-input-box">
        <textarea
          id="milestone-input"
          maxLength={200}
          placeholder="How have you managed stress today?"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="input-footer">
          <span style={{ color: charCount >= 200 ? "red" : "#333" }}>
            {charCount}/200
          </span>
          <button id="milestone-btn" onClick={handleShare}>Share message</button>
        </div>

        {showSuccess && <p id="success-msg">Milestone recorded, well done!</p>}
      </div>

      {isCrisis && (
        <div id="crisis-msg">
          <p>
            <strong>It sounds like you're having a hard time right now.</strong> Please reach out to these resources: <br />
            Lifeline: 0808 808 8000 <br />
            Samaritans: 116 123
          </p>
          <button onClick={() => setIsCrisis(false)}>Dismiss</button>
        </div>
      )}

      <div id="milestone-feed">
        {messages.map((msg, i) => (
          <div className="milestone-item" key={i}>
            <p>"{msg.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}