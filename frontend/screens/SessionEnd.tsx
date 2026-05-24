import React, { useEffect, useState, useRef } from 'react';
import { Button, Confetti, GlassCard } from '../components/UI';
import { Star, ArrowRight, Volume2 } from 'lucide-react';
import { playTTS } from '../services/audio';

interface Props {
  coinsEarned: number;
  onNext: () => void;
}

export const SessionEnd: React.FC<Props> = ({ coinsEarned, onNext }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioControllerRef = useRef<{ stop: () => void } | null>(null);
  const successMessage = "Bravo! Sen bugungi missiyani ajoyib bajarding!";

  const speak = () => {
    if (audioControllerRef.current) audioControllerRef.current.stop();
    audioControllerRef.current = playTTS(
      successMessage,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  useEffect(() => {
    speak();
    return () => {
      if (audioControllerRef.current) audioControllerRef.current.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-pastel flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <Confetti />
      
      {/* Rotating Sunburst Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,transparent_0deg,#fff_15deg,transparent_30deg,#fff_45deg,transparent_60deg,#fff_75deg,transparent_90deg,#fff_105deg,transparent_120deg,#fff_135deg,transparent_150deg,#fff_165deg,transparent_180deg,#fff_195deg,transparent_210deg,#fff_225deg,transparent_240deg,#fff_255deg,transparent_270deg,#fff_285deg,transparent_300deg,#fff_315deg,transparent_330deg,#fff_345deg,transparent_360deg)] animate-spin-slow"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        <div className={`relative w-32 h-32 bg-gradient-to-br from-sunny to-warm rounded-full flex items-center justify-center text-7xl shadow-3d-white border-4 border-white mb-8 ${isSpeaking ? 'animate-bounce-soft' : 'animate-float'}`}>
          <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
          <span className="relative z-10 drop-shadow-lg">🏆</span>
        </div>
        
        <h1 className="text-5xl font-display font-black text-charcoal mb-4 animate-pop-in drop-shadow-sm">Bravo!</h1>
        
        <div className="flex items-center justify-center gap-3 mb-10 bg-white/50 backdrop-blur-sm rounded-full py-2 px-4 border border-white/50">
          <p className="text-charcoal font-bold text-lg">{successMessage}</p>
          <button 
            onClick={speak}
            className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-lavender text-white animate-pulse scale-110' : 'bg-white text-lavender hover:bg-lavender/10'}`}
          >
            <Volume2 size={20} strokeWidth={3} />
          </button>
        </div>
        
        <GlassCard className="w-full mb-12 animate-pop-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-4">Mukofot</p>
          <div className="flex items-center justify-center gap-4 text-5xl font-display font-black text-sunny drop-shadow-md">
            <Star fill="currentColor" size={48} className="animate-pulse-glow rounded-full" />
            +{coinsEarned}
          </div>
        </GlassCard>

        <Button onClick={onNext} className="w-full !py-5 !text-xl">
          Keyingi qadam <ArrowRight size={24} strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};
