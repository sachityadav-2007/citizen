import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ weatherData, currencyData, citizenData, factData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    return [{ role: 'assistant', content: 'Hello! I am your SmartCity assistant. How can I help you today?' }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const buildContextString = () => {
    let context = "You are a SmartCity assistant. Answer only based on this live dashboard data.\n";
    
    if (weatherData) {
      context += `WEATHER: temperature ${weatherData.temperature}°C, windspeed ${weatherData.windspeed} km/h, condition code ${weatherData.weathercode}.\n`;
    }
    
    if (currencyData) {
      const usdOffset = (1 / currencyData.INR) * currencyData.USD;
      const eurOffset = (1 / currencyData.INR) * currencyData.EUR;
      const gbpOffset = (1 / currencyData.INR) * currencyData.GBP;
      context += `CURRENCY: 1 INR in USD is ${usdOffset.toFixed(4)}, in EUR is ${eurOffset.toFixed(4)}, in GBP is ${gbpOffset.toFixed(4)}.\n`;
    }
    
    if (citizenData) {
      context += `CITIZEN: name is ${citizenData.name.first} ${citizenData.name.last}, city is ${citizenData.location.city}, email is ${citizenData.email}.\n`;
    }
    
    if (factData) {
      context += `FACT: ${factData}\n`;
    }
    
    context += "If asked anything else say you only know about the dashboard data.";
    return context;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemContext = buildContextString();
      // Using completely free Pollinations endpoint for GET requests
      const combinedPrompt = systemContext + "\n\nUser Question: " + userMessage;
      const encodedPrompt = encodeURIComponent(combinedPrompt);

      const response = await fetch(`https://text.pollinations.ai/prompt/${encodedPrompt}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const botMessage = await response.text();

      setMessages((prev) => [...prev, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-indigo-500/50 hover:scale-110 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl flex flex-col z-50 transition-all duration-400 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">SmartCity AI</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm flex flex-col gap-1 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'}`}>
                <span className="text-[10px] opacity-50 flex items-center gap-1 mb-1 font-semibold uppercase tracking-wider">
                  {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {msg.role === 'user' ? 'You' : 'AI'}
                </span>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl rounded-tl-sm p-4 w-16">
                <div className="flex space-x-1.5 justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-white/5 rounded-b-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about city data..."
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
