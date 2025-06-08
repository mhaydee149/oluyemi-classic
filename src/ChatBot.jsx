import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Play notification sound when bot sends message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.from === 'bot') {
      const audio = new Audio('/notification.mp3'); // file in public folder
      audio.play().catch(() => {}); // ignore play errors
    }
  }, [messages]);

  // Fetch AI reply from OpenAI API
  const getAIReply = async (userMsg) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',  // or 'gpt-3.5-turbo' if you prefer
          messages: [{ role: 'user', content: userMsg }],
          max_tokens: 150,
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim();
      }
      return "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "Sorry, I'm having trouble responding right now.";
    }
  };

  // Send user message and get bot reply
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages(prev => [...prev, { from: 'user', text: userInput }]);
    setInput('');

    const reply = await getAIReply(userInput);

    setMessages(prev => [...prev, { from: 'bot', text: reply }]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          backgroundColor: '#3498db',
          color: 'white',
          borderRadius: '50%',
          width: 60,
          height: 60,
          fontSize: 30,
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        aria-label="Toggle chat"
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            left: 20,
            width: 320,
            height: 420,
            border: '1px solid #ddd',
            borderRadius: 8,
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          {/* Close button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '5px 10px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                color: '#999',
                lineHeight: 1,
                fontWeight: 'bold',
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages list */}
          <div
            style={{
              flexGrow: 1,
              padding: 10,
              overflowY: 'auto',
              fontSize: 14,
              lineHeight: '20px',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                {m.from === 'bot' && <div style={{ marginRight: 8 }}>🤖</div>}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 15,
                    backgroundColor: m.from === 'user' ? '#3498db' : '#eee',
                    color: m.from === 'user' ? 'white' : 'black',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {m.text}
                </span>
                {m.from === 'user' && <div style={{ marginLeft: 8 }}>🧑</div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input with send button */}
          <div style={{ padding: 4, borderTop: '1px solid #ddd', display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              style={{
                backgroundColor: '#3498db',
                border: 'none',
                borderRadius: 1,
                padding: '0 4px',
                color: 'white',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
