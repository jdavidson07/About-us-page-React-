console.log("ChatSystem operational") 

import { useState, useEffect, useRef } from 'react';

export default function ChatSystem() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatMessagesRef = useRef(null); 

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const botResponses = (userText) => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes("stress")) {
            return "I'm sorry you're feeling stressed. Try taking a short break or deep breathing 💜";
        } else if (lowerText.includes("help")) {
            return "You can contact us or explore our coping tools!";
        } else if (lowerText.includes("hello")) {
            return "Hi there! 👋 How are you feeling today?";
        } 
        return "I'm here to help! 😊";
    }; 

    const sendMessage = () => {
        const text = input.trim();
        if (text === "") return;

        const userMessage = { sender: "user", text, id: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const botMessage = { sender: "bot", text: botResponses(text), id: Date.now() + 1 };
            setMessages(prev => [...prev, botMessage]); 
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(); 
        }
    };

    return ( 
        <>
        <button className="chat-button" aria-label="Open chat" onClick={() => setIsOpen(true)}> 💬
        </button>

        <div className={`chatArea ${isOpen ? "active" : ""}`}>
            <div className="chatBar">Chat with us
    
                <button id="exit" onClick={() => setIsOpen(false)}>X</button>
                </div> 

                <div className="chatMessages" ref={chatMessagesRef}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`${msg.sender === "user" ? "user-message" : "bot-message"} message show`}>
                            {msg.text}
                            </div> 
                    ))}
                </div>

                <div className="chatFooter">

          <input id="chatInput" type="text" placeholder="Type a message..." value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}/>

          <button id="sendButton" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

                


    
    
