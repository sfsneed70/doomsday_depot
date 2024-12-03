import { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import '../utils/Chatbot.css'; // Import the CSS file for styling

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage: Message = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);

        try {
            console.log('Sending message:', input); // Debugging statement
            const response = await axios.post<{ message: string }>('/api/chat', { message: input });
            console.log('Server response:', response.data.message); // Debugging statement
            const aiMessage: Message = { sender: 'ai', text: response.data.message };
            setMessages([...messages, newMessage, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
        }

        setInput('');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatbot-container">
            <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatWindow}>
                {/* The background image is set in the CSS */}
            </div>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;