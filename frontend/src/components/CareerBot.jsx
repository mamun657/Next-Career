import { useState } from 'react';
import { careerBot } from '../services/api';

export default function CareerBot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await careerBot(question);
      setAnswer(res.data);
    } catch (err) {
      setAnswer({ answer: 'Sorry, something went wrong.', disclaimer: err.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-slate-800/80 via-purple-900/30 to-slate-800/80 px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">CareerBot</h3>
            <p className="text-sm text-gray-400">AI-powered career guidance</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <form onSubmit={handleAsk} className="flex gap-3 mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. How do I prepare for internships?"
            className="flex-1 px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Ask'
            )}
          </button>
        </form>
        
        {!answer && !loading && (
          <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 text-center">
            <p className="text-gray-500 text-sm">Ask anything about your career path, interview tips, or skill development</p>
          </div>
        )}

        {answer && (
          <div className="p-5 bg-gradient-to-br from-slate-900/60 to-purple-900/20 border border-purple-500/20 rounded-xl">
            <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{answer.answer}</p>
            {answer.disclaimer && (
              <p className="mt-4 text-gray-500 italic text-xs border-t border-white/5 pt-3">{answer.disclaimer}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
