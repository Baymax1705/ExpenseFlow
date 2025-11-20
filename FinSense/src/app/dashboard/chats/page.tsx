"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatsPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to FinSense support. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message! Our support team will get back to you shortly. Is there anything specific about your FinSense experience you&apos;d like help with?",
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-2">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">FinSense Support</h1>
              <p className="text-slate-600">We&apos;re here to help you with any questions!</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white scroll-smooth" id="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white"
                      : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-teal-100" : "text-slate-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-6 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    // Placeholder for file attachment
                  }}
                >
                  �
                </button>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-medium text-slate-800 group-hover:text-teal-600">Expense Tracking</span>
              </div>
              <p className="text-sm text-slate-600">Get help with adding and managing your expenses</p>
            </button>
            
            <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💰</span>
                <span className="font-medium text-slate-800 group-hover:text-teal-600">Budget Planning</span>
              </div>
              <p className="text-sm text-slate-600">Learn how to set up and manage your monthly budget</p>
            </button>
            
            <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚙️</span>
                <span className="font-medium text-slate-800 group-hover:text-teal-600">Account Settings</span>
              </div>
              <p className="text-sm text-slate-600">Help with profile settings and account management</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}