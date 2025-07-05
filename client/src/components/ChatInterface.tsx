import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Heart, Brain } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onLogout: () => void;
}

const ChatInterface = ({ onLogout }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Therapist. I'm here to provide a safe, non-judgmental space for you to share your thoughts and feelings. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_URL}/api/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, content: fullText } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Error during chat stream:', error);
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-therapeutic">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <Heart className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Therapist AI
            </h1>
            <p className="text-sm text-gray-500">Your compassionate AI companion</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
        >
          Logout
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <Avatar className="w-10 h-10 shadow-md">
                <AvatarFallback className={
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                    : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                }>
                  {message.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[75%] rounded-2xl p-4 shadow-lg ${
                message.sender === 'user'
                  ? 'message-bubble-user ml-auto'
                  : 'message-bubble-ai'
              }`}>
                <div className="prose prose-sm">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="message-bubble-ai rounded-2xl p-4 shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div 
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce" 
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div 
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce" 
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-blue-100">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share your thoughts and feelings here..."
              className="flex-1 h-12 px-4 rounded-2xl border-2 border-blue-200 focus:border-blue-400 bg-white/90 placeholder:text-gray-400 text-gray-700 shadow-sm"
              disabled={isTyping}
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="h-12 w-12 rounded-2xl therapeutic-button p-0 shadow-therapeutic"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
