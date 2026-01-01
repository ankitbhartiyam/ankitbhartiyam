
import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Mail, 
  Instagram,
  Sparkles,
  Send,
  MoreVertical,
  Share2,
  Star,
  QrCode,
  X,
  ChevronRight,
  Brush,
  Zap,
  Youtube,
  Briefcase
} from 'lucide-react';
import { generateMarketingInsight } from './services/geminiService';
import { ChatMessage } from './types';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await generateMarketingInsight(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const LinkCard = ({ title, icon: Icon, onClick, href, image }: any) => {
    const content = (
      <div className="flex items-center w-full p-4 glass-effect border border-white rounded-3xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] link-card cursor-pointer group mb-5">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner border border-slate-100">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="p-3">
              <Icon className="text-slate-800" size={28} />
            </div>
          )}
        </div>
        <div className="flex-1 text-center font-black text-slate-900 text-sm md:text-base px-4 leading-tight uppercase tracking-tight">
          {title}
        </div>
        <div className="flex-shrink-0 text-slate-200 group-hover:text-slate-400 transition-colors">
          <MoreVertical size={20} />
        </div>
      </div>
    );

    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
        {content}
      </a>
    ) : (
      <button onClick={onClick} className="w-full text-left focus:outline-none">
        {content}
      </button>
    );
  };

  const SectionTitle = ({ children }: { children: string }) => (
    <h2 className="text-white text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-center mt-12 mb-6 drop-shadow-lg">
      {children}
    </h2>
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-6 relative">
      {/* Top Controls */}
      <div className="w-full max-w-[600px] flex justify-between absolute top-6 px-6 z-10">
        <button className="p-3 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-all border border-white/10 shadow-2xl">
          <Star size={20} fill="white" />
        </button>
        <button className="p-3 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-all border border-white/10 shadow-2xl">
          <Share2 size={20} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10 text-center mt-8 animate-in fade-in zoom-in duration-1000">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[6px] border-white p-1 mb-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden bg-white">
          <img 
            src="https://picsum.photos/seed/ankitportrait/500/500" 
            alt="Ankit Bhartiyam" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-white text-3xl font-black mb-1 tracking-tighter drop-shadow-2xl">@ankitbhartiyam</h1>
        <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
          Fine Artist & Art Educator
        </p>
      </div>

      {/* Main Content Links */}
      <div className="w-full max-w-[580px] z-10 space-y-1">
        
        <SectionTitle>Live Workshops</SectionTitle>
        <LinkCard 
          title="04 Days Comprehensive Acrylic Portrait Workshop" 
          image="https://picsum.photos/seed/art-ws/200/200"
          href="#"
        />

        <SectionTitle>Commission Work</SectionTitle>
        <LinkCard 
          title="Portrait Painting Charges & Process" 
          image="https://picsum.photos/seed/charges/200/200"
          href="#"
        />
        <LinkCard 
          title="View Portrait Samples & Gallery" 
          image="https://picsum.photos/seed/gallery1/200/200"
          href="#"
        />

        <SectionTitle>Creativity & Inspiration</SectionTitle>
        <LinkCard 
          title="The Studio Assistant: AI Muse" 
          icon={Sparkles}
          onClick={() => setShowChat(true)}
        />
        <LinkCard 
          title="Painting Time-Lapses (YouTube)" 
          icon={Youtube}
          href="#"
        />

        <SectionTitle>Contact Me For Work</SectionTitle>
        <LinkCard 
          title="Email for Brands & Business Work" 
          icon={Briefcase}
          href="mailto:business@ankitbhartiyam.com"
        />
        <LinkCard 
          title="Email for Personal Portrait Paintings" 
          icon={Mail}
          href="mailto:portraits@ankitbhartiyam.com"
        />
        <LinkCard 
          title="DM on Instagram for Quick Chat" 
          icon={Instagram}
          href="#"
        />

        {/* Footer / QR Section */}
        <div className="flex flex-col items-center mt-20 mb-12">
           <div className="p-6 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] group hover:scale-110 transition-transform duration-500 cursor-pointer">
              <QrCode size={140} className="text-slate-900" />
           </div>
           <p className="text-white font-black text-xs mt-12 uppercase tracking-[0.4em] drop-shadow-xl opacity-80">View on mobile</p>
           <p className="text-white/30 text-[9px] mt-6 font-bold uppercase tracking-widest">Join Ankit Bhartiyam on Linktree today</p>
        </div>
      </div>

      {/* Studio Muse Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setShowChat(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in slide-in-from-bottom-20 duration-700">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-indigo-600">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-white/20 rounded-[1.5rem] shadow-xl">
                  <Palette size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl tracking-tight leading-tight">Studio Muse</h3>
                  <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">AI Creative Mentor</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-white">
                    <Brush className="text-indigo-600" size={40} />
                  </div>
                  <h4 className="text-slate-900 font-black text-2xl mb-4 tracking-tight">Seeking Inspiration?</h4>
                  <p className="text-slate-500 text-sm font-semibold leading-relaxed max-w-xs">
                    Ask for a portrait theme, color palette advice, or insights into Ankit's creative process.
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4`}>
                  <div className={`max-w-[90%] p-6 rounded-[2rem] text-[15px] font-bold leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-200' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] rounded-tl-none text-slate-400 text-xs flex gap-3 items-center shadow-sm">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    Visualizing the canvas...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-slate-100 flex gap-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="What should I paint today?"
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-[15px] font-bold text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-90 disabled:opacity-50"
              >
                <Send size={28} className="text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Bottom Identity */}
      <div className="fixed bottom-8 bg-white px-8 py-4 rounded-full border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex items-center gap-4 group cursor-pointer transition-all hover:pr-10 active:scale-95 z-20">
        <span className="text-slate-900 font-black text-sm tracking-widest uppercase">ankit.art</span>
        <div className="w-px h-4 bg-slate-200"></div>
        <ChevronRight size={20} className="text-indigo-600 group-hover:translate-x-1 transition-transform animate-pulse" />
      </div>
    </div>
  );
};

export default App;
