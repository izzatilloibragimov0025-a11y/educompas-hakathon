import React, { useEffect, useState, useRef } from 'react';
import { User } from '../types';
import { generatePhygitalTask } from '../services/ai';
import { Button, AstroCar } from '../components/UI';
import { CheckCircle2, Volume2 } from 'lucide-react';
import { playTTS } from '../services/audio';

interface Props {
  user: User;
  onUnlock: () => void;
}

export const PhygitalLock: React.FC<Props> = ({ user, onUnlock }) => {
  const [task, setTask] = useState("Vazifa tayyorlanmoqda...");
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioControllerRef = useRef<{ stop: () => void } | null>(null);

  const speak = () => {
    if (loading || !task) return;
    if (audioControllerRef.current) audioControllerRef.current.stop();
    
    const fullText = `Dam olish vaqti! Astro-Car quvvat yig'moqda. Endi real dunyoda o'ynaymiz! ${task}`;
    
    audioControllerRef.current = playTTS(
      fullText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  useEffect(() => {
    const fetchTask = async () => {
      const t = await generatePhygitalTask(user.interests);
      setTask(t);
      setLoading(false);
    };
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && task) speak();
    return () => {
      if (audioControllerRef.current) audioControllerRef.current.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, task]);

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-lavender/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-sky/10 rounded-full blur-[100px]"></div>
        
        {/* Glowing Moon */}
        <div className="absolute top-16 right-12 text-6xl drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-float">🌕</div>
        
        {/* Stars */}
        <div className="absolute top-32 left-10 text-2xl animate-pulse-soft">⭐</div>
        <div className="absolute top-1/2 right-20 text-xl animate-pulse-soft" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-40 left-1/4 text-sm text-white animate-pulse-soft" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-sm w-full">
        
        {/* Sleeping AstroCar */}
        <div className="mb-8 relative">
          <div className="absolute -top-8 -right-8 text-4xl animate-bounce-soft opacity-80">💤</div>
          <AstroCar emotion="sleepy" />
        </div>

        <h1 className="text-4xl font-display font-black text-white mb-3 drop-shadow-md">Dam olish vaqti!</h1>
        <p className="text-white/70 font-bold text-lg mb-10 px-4">
          Astro-Car quvvat yig'moqda. Endi real dunyoda o'ynaymiz!
        </p>

        {/* Offline Task Card */}
        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-[32px] p-8 w-full mb-12 relative shadow-2xl">
          <button 
            onClick={speak}
            disabled={loading}
            className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
              isSpeaking ? 'bg-warm text-white animate-pulse scale-110' : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Volume2 size={24} strokeWidth={2.5} />
          </button>

          <div className="w-16 h-16 bg-gradient-to-br from-warm to-coral rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-3d-primary border-2 border-white/50">
            🌍
          </div>
          <p className="text-sm font-bold text-warm uppercase tracking-widest mb-4">Oflayn Vazifa</p>
          <p className="text-white font-display font-bold text-2xl leading-snug">
            {loading ? "..." : task}
          </p>
        </div>

        {/* Demo unlock button */}
        <Button 
          variant="white" 
          onClick={onUnlock} 
          className="!bg-white/10 !border-white/20 !text-white/70 hover:!bg-white/20 !shadow-none"
        >
          <CheckCircle2 size={20} /> Vazifa bajarildi (Demo)
        </Button>
      </div>
    </div>
  );
};
