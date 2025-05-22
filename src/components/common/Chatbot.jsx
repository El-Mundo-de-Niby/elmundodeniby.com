// Archivo: components/common/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, MessageCircle, X } from 'lucide-react';

const Chatbot = ({ navigateTo, setIsChatbotOpen }) => { // navigateTo and setIsChatbotOpen are now props
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide it in runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponseText }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.' }]);
      }
    } catch (error) {
      console.error('Error al comunicarse con la IA:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Hubo un error al conectar con la IA. Por favor, inténtalo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold text-lg border-b border-gray-200 dark:border-gray-600">
        Soporte de IA
        <p className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">Pregunta a nuestra IA o contáctanos</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            ¡Hola! ¿En qué puedo ayudarte hoy?
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl shadow-sm ${msg.sender === 'user'
                  ? 'bg-gray-900 text-white dark:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl shadow-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100">
              <span className="animate-pulse">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Primary input field and send button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center bg-gray-100 dark:bg-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent mr-2 transition-colors duration-200"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Alternative contact options */}
      <div className="p-4 pt-0 bg-gray-100 dark:bg-gray-700 flex flex-col items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          ¿No encontraste lo que buscabas con la IA?
        </p>

        <button
          onClick={() => {
            navigateTo('contact');
            setIsChatbotOpen(false); // Close chatbot when navigating to contact page
          }}
          className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 px-4 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors shadow-md hover:scale-[1.02] transform mb-2"
        >
          <Mail size={20} className="mr-2" /> Contactar por Email
        </button>

        <a
          href="https://discord.gg/elmundodeniby"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 px-4 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors shadow-md hover:scale-[1.02] transform"
        >
          <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_white_RGB.png" alt="Discord Icon" className="w-5 h-5 mr-2 invert dark:invert-0" />
          Unirse a Discord
        </a>
      </div>
    </div>
  );
};


export default Chatbot;