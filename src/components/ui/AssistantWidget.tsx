import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

const PREDEFINED_QUESTIONS = [
  'Which approvals are still pending?',
  'Why is my application delayed?',
  'What documents are missing?',
  'Which renewals are due soon?',
  'What schemes may apply to my business?',
];

const RESPONSES: Record<string, { text: string; sources: string[] }> = {
  'Which approvals are still pending?': {
    text: 'Based on your approval roadmap, you have 4 pending approvals:\n\n1. **Pollution Consent (CTE/CTO)** — Under review (65% progress). A department query is currently pending.\n2. **Fire Safety NOC** — In progress (40%). Under technical review.\n3. **Factory Registration** — Not started. Blocked by Pollution Consent and Fire NOC dependencies.\n4. **Water Connection Approval** — In progress (30%). Under initial verification.',
    sources: ['Approval Roadmap', 'Application Status Tracker'],
  },
  'Why is my application delayed?': {
    text: 'Your Pollution Consent application (MH-PC-2026-01842) is currently waiting for inspection scheduling. The expected processing timeline is **15 working days** and **7 days** have elapsed. A department query was raised on 24 Sep 2026 requesting machinery specifications and water consumption declaration. The response deadline is **27 Sep 2026**.\n\nThe primary bottleneck in the current workflow is inspection scheduling, which contributes an average delay of 4.2 days across all applications.',
    sources: ['Application MH-PC-2026-01842', 'Timeline Data', 'Bottleneck Analytics'],
  },
  'What documents are missing?': {
    text: 'You currently have **2 missing documents**:\n\n1. **Machinery Details & Specifications** — Required for Pollution Consent application\n2. **Water Consumption Declaration** — Required for Pollution Consent and Water Connection applications\n\nUploading these documents would increase your application readiness from 87% to 100%.',
    sources: ['Document Vault', 'Pre-validation Report'],
  },
  'Which renewals are due soon?': {
    text: 'You have **3 upcoming renewals**:\n\n1. **Pollution Consent (CTO)** — Due in 18 days (13 Oct 2026)\n2. **Factory Licence** — Due in 18 days (13 Oct 2026)\n3. **Fire Safety NOC** — Due in 64 days (28 Nov 2026)\n\nThe Factory Licence renewal requires all documents to be updated before the renewal date.',
    sources: ['Compliance Calendar', 'Renewal Tracker'],
  },
  'What schemes may apply to my business?': {
    text: 'Based on your business profile, **3 potential schemes** have been identified:\n\n1. **Package Scheme of Incentives (PSI) 2024** — 91% match. Up to 40% of fixed capital investment.\n2. **PMFME** — 85% match. 35% capital subsidy (max ₹10 Lakh).\n3. **CLCSS** — 78% match. 15% capital subsidy on plant & machinery.\n\n⚠️ Final eligibility is subject to official scheme rules.',
    sources: ['Business Profile', 'Scheme Matching Engine', 'Document Vault'],
  },
};

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      text: 'Hello! I\'m Regula Assistant. I can help you understand your approvals, track applications, and find relevant information. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: messages.length, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Find response
    const responseData = RESPONSES[text] || {
      text: `I understand you're asking about "${text}". Based on the available data for Aarambh Foods Pvt. Ltd., I can see your business has 12 tracked approvals with 72% overall progress. For specific details, please check the relevant section in your dashboard.`,
      sources: ['Business Profile', 'Application Data'],
    };

    setTimeout(() => {
      const assistantMsg: Message = {
        id: messages.length + 1,
        role: 'assistant',
        text: responseData.text,
        sources: responseData.sources,
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 800);
  };

  return (
    <div className="assistant-bubble">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-navy-800 text-white shadow-lg hover:bg-navy-900 flex items-center justify-center transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="assistant-panel"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-navy-900 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <div>
                  <p className="text-sm font-semibold">Regula Assistant</p>
                  <p className="text-[10px] text-navy-300">Powered by mock data</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-navy-600" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-navy-800 text-white rounded-2xl rounded-br-sm px-3 py-2'
                      : 'bg-slate-100 text-slate-700 rounded-2xl rounded-bl-sm px-3 py-2'
                  }`}>
                    <p className="text-xs whitespace-pre-line leading-relaxed">{msg.text}</p>
                    {msg.sources && (
                      <div className="mt-2 pt-2 border-t border-slate-200/50">
                        <p className="text-[10px] text-slate-400 mb-1 flex items-center gap-1">
                          <ExternalLink size={10} /> Sources / Data used
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map(s => (
                            <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white/50 rounded text-slate-500">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={12} className="text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t border-slate-100">
              <div className="flex gap-1.5 overflow-x-auto pb-2">
                {PREDEFINED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 whitespace-nowrap shrink-0 transition-colors"
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 text-xs outline-none text-slate-700 placeholder:text-slate-400 bg-slate-50 rounded-lg px-3 py-2"
                  placeholder="Ask about your approvals..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                />
                <button
                  className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center hover:bg-navy-900 transition-colors"
                  onClick={() => handleSend(input)}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
