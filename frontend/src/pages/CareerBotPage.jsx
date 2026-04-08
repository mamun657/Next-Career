import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import {
  getChatSession,
  getChatHistory,
  sendChatMessage,
  createChatSession,
} from '../services/api';

// Suggested prompts for new conversations
const SUGGESTED_PROMPTS = [
  {
    icon: '🎯',
    title: 'Skills to Learn',
    prompt: 'What skills should I learn next to advance my career?',
  },
  {
    icon: '💼',
    title: 'Job Match',
    prompt: 'What jobs match my current skills and experience level?',
  },
  {
    icon: '📈',
    title: 'Profile Improvement',
    prompt: 'How can I improve my profile to attract better opportunities?',
  },
  {
    icon: '🎤',
    title: 'Interview Prep',
    prompt: 'How should I prepare for technical interviews in my field?',
  },
];

// Message bubble component
function MessageBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 ${
          isUser
            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
            : 'bg-slate-800/60 border border-white/10 text-gray-200'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-purple-300">CareerBot</span>
          </div>
        )}
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
        <div className={`text-xs mt-2 ${isUser ? 'text-purple-200' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

// Loading indicator for AI response
function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-purple-300">CareerBot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function CareerBotPage() {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        setInitialLoading(true);
        const res = await getChatSession();
        const sid = res.data.sessionId;
        setSessionId(sid);

        // Load chat history
        const historyRes = await getChatHistory(sid);
        setMessages(historyRes.data.messages || []);
      } catch (err) {
        console.error('Failed to init session:', err);
        setError('Failed to initialize chat. Please refresh the page.');
      } finally {
        setInitialLoading(false);
      }
    };

    initSession();
  }, []);

  // Handle sending a message
  const handleSend = async (text = input) => {
    const messageText = text.trim();
    if (!messageText || loading) return;

    setInput('');
    setError(null);
    setLoading(true);

    // Optimistically add user message
    const tempUserMessage = {
      _id: `temp-${Date.now()}`,
      role: 'user',
      content: messageText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const res = await sendChatMessage(messageText, sessionId);
      
      // Update session ID if new
      if (res.data.sessionId) {
        setSessionId(res.data.sessionId);
      }

      // Replace temp message with real one and add assistant response
      setMessages((prev) => {
        const filtered = prev.filter((m) => m._id !== tempUserMessage._id);
        return [...filtered, res.data.userMessage, res.data.assistantMessage];
      });
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      // Remove the optimistic message on error
      setMessages((prev) => prev.filter((m) => m._id !== tempUserMessage._id));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle keyboard submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Start new conversation
  const handleNewChat = async () => {
    try {
      setLoading(true);
      const res = await createChatSession();
      setSessionId(res.data.sessionId);
      setMessages([]);
      setError(null);
    } catch (err) {
      console.error('Failed to create new chat:', err);
      setError('Failed to start new conversation.');
    } finally {
      setLoading(false);
    }
  };

  // Handle suggested prompt click
  const handleSuggestedPrompt = (prompt) => {
    handleSend(prompt);
  };

  return (
    <Layout>
      {/* Full height container - prevents page scroll */}
      <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-[#0a0f1a] via-[#0d1526] to-[#1a1033] -mx-4 -mt-8 -mb-8 overflow-hidden flex flex-col">
        {/* Ambient glow effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        {/* Main content wrapper */}
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 min-h-0">
          {/* Header - fixed height */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CareerBot</h1>
                <p className="text-gray-400 text-sm">AI-powered career guidance</p>
              </div>
            </div>
            <button
              onClick={handleNewChat}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-xl text-gray-300 text-sm font-medium transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
          </div>

          {/* Chat Container - takes remaining space */}
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col min-h-0 overflow-hidden">
            {/* Messages Area - scrollable */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 scroll-smooth"
            >
              {initialLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-gray-400">Loading conversation...</p>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                /* Welcome Screen with Suggested Prompts */
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Hi {user?.name || 'there'}! 👋</h2>
                  <p className="text-gray-400 mb-8 max-w-md">
                    I'm CareerBot, your AI career guidance assistant. I can help you with career advice, skill development, and job preparation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {SUGGESTED_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedPrompt(item.prompt)}
                        disabled={loading}
                        className="flex items-center gap-3 p-4 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-purple-500/30 rounded-xl text-left transition-all group disabled:opacity-50"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">{item.title}</p>
                          <p className="text-gray-500 text-xs line-clamp-1">{item.prompt}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Message List */
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <MessageBubble key={msg._id} message={msg} isUser={msg.role === 'user'} />
                  ))}
                  {loading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 shrink-0">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Input Area - fixed at bottom */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-3"
              >
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about your career..."
                    rows={1}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none transition-all"
                    style={{ maxHeight: '120px' }}
                    disabled={loading || initialLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || initialLoading || !input.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </form>
              <p className="text-gray-600 text-xs mt-2 text-center">
                CareerBot provides guidance only. Always verify advice and never share sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
