import React, { useState } from 'react';
import axios from 'axios';
import "../css/ChatBox.css"
import api from '../constant/api';

const ChatBoxPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }

    setMessages([...messages, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await api.post('api/chat/', {
        message: inputMessage
      });

      const botResponse = response.data.reply;
      setMessages([...messages, { sender: 'user', text: inputMessage }, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Error in sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Customer Support</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBoxPage;
