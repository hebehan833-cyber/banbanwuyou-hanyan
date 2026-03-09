
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../geminiService';
import { ChatMessage } from '../types';

interface ChatScreenProps {
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '您好！我是您的智能陪诊助手“伴伴”。请问有什么可以帮您的？我可以为您介绍服务项目、查询就医流程或提供健康咨询建议。' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const aiResponse = await getGeminiResponse(inputValue, history);

    setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f7f9f9] dark:bg-background-dark">
      <header className="bg-primary p-4 flex items-center gap-3 text-white sticky top-0 z-10 shadow-md">
        <button onClick={onBack} className="material-symbols-outlined text-[24px]">chevron_left</button>
        <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight">智能陪诊助手</h1>
            <span className="text-[10px] opacity-80">由 Gemini 3 Flash 提供技术支持</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white dark:bg-gray-800 dark:text-white rounded-tl-none'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 border-none bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-primary h-12 px-4"
            placeholder="咨询有关陪诊或就医的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center active:scale-95 disabled:opacity-50 transition-transform"
          >
            <span className="material-symbols-outlined filled">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
