import React, { useState } from 'react';
import '../css/recs.css';
export default function Recs() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const sendMessage = () => {
      if (input.trim() === '') return;
  
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
    }
  return (
    <div className="App">
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  </div>
);
}
