import React, { useEffect, useState, useRef } from 'react';
import { Volume2, Play } from 'lucide-react';
import { playTTS, sfx, initAudio } from '../services/audio';

// --- 3D Tactile Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'white';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', onClick, ...props }) => {
  const baseStyle = "btn-3d relative inline-flex items-center justify-center gap-3 rounded-[24px] px-8 py-4 font-display font-bold text-xl transition-all duration-150 select-none";
  
  const variants = {
    primary: "bg-coral text-white shadow-3d-primary border-2 border-coral-dark",
    secondary: "bg-lavender text-white shadow-3d-secondary border-2 border-lavender-dark",
    success: "bg-mint text-white shadow-3d-success border-2 border-mint-dark",
    white: "bg-white text-lavender shadow-3d-white border-2 border-gray-200"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    initAudio();
    sfx.pop();
    if (onClick) onClick(e);
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={handleClick} {...props}>
      {icon && <span className="text-2xl">{icon}</span>}
      {children}
    </button>
  );
};

// --- Glassmorphism Card ---
export const GlassCard: React.FC<{children: React.ReactNode, className?: string}> = ({children, className=''}) => (
  <div className={`bg-white/80 backdrop-blur-xl border border-white shadow-glass rounded-[32px] p-6 ${className}`}>
    {children}
  </div>
);

// --- Premium SVG AstroCar Companion ---
interface AstroCarProps {
  dialogue?: string;
  emotion?: 'happy' | 'thinking' | 'excited' | 'sleepy' | 'sad';
  className?: string;
}

export const AstroCar: React.FC<AstroCarProps> = ({ dialogue, emotion = 'happy', className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const audioControllerRef = useRef<{ stop: () => void } | null>(null);

  const speak = () => {
    if (!dialogue) return;
    initAudio();
    setNeedsInteraction(false);
    
    if (audioControllerRef.current) audioControllerRef.current.stop();
    
    audioControllerRef.current = playTTS(
      dialogue,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  useEffect(() => {
    if (!dialogue) {
      setDisplayedText('');
      return;
    }
    
    // Try to speak automatically. If blocked, the user will see the play button.
    speak();
    
    // Check if speech actually started after a short delay (autoplay block detection)
    const checkTimeout = setTimeout(() => {
      if (!isSpeaking && window.speechSynthesis && !window.speechSynthesis.speaking) {
        setNeedsInteraction(true);
      }
    }, 500);

    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText(dialogue.substring(0, i));
      i++;
      if (i > dialogue.length) clearInterval(interval);
    }, 35);
    
    return () => {
      clearInterval(interval);
      clearTimeout(checkTimeout);
      if (audioControllerRef.current) audioControllerRef.current.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogue]);

  // SVG Eye rendering based on emotion
  const renderEyes = () => {
    switch (emotion) {
      case 'sleepy':
        return (
          <g stroke="#45B3FF" strokeWidth="4" strokeLinecap="round">
            <line x1="65" y1="85" x2="85" y2="85" />
            <line x1="115" y1="85" x2="135" y2="85" />
          </g>
        );
      case 'excited':
        return (
          <g fill="#FDCB6E">
            <path d="M75 75 l3 8 l8 1 l-6 5 l2 8 l-7 -4 l-7 4 l2 -8 l-6 -5 l8 -1 z" className="animate-pulse" />
            <path d="M125 75 l3 8 l8 1 l-6 5 l2 8 l-7 -4 l-7 4 l2 -8 l-6 -5 l8 -1 z" className="animate-pulse" />
          </g>
        );
      case 'thinking':
        return (
          <g fill="#45B3FF">
            <circle cx="75" cy="80" r="12" />
            <circle cx="125" cy="85" r="6" />
          </g>
        );
      case 'sad':
        return (
          <g stroke="#45B3FF" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M65 85 Q75 75 85 85" />
            <path d="M115 85 Q125 75 135 85" />
          </g>
        );
      case 'happy':
      default:
        return (
          <g fill="#45B3FF">
            <circle cx="75" cy="85" r="10" className="animate-blink" />
            <circle cx="125" cy="85" r="10" className="animate-blink" />
          </g>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {dialogue && (
        <div className="relative bg-white rounded-[28px] p-5 mb-4 shadow-xl border-4 border-sky/20 max-w-[320px] animate-pop-in group z-10">
          <p className="text-charcoal font-display font-bold text-lg leading-snug pr-12">{displayedText}</p>
          
          <button 
            onClick={speak}
            className={`absolute top-1/2 -translate-y-1/2 right-3 p-3 rounded-full transition-all shadow-md ${
              isSpeaking 
                ? 'bg-sky text-white animate-pulse scale-110' 
                : needsInteraction 
                  ? 'bg-coral text-white animate-bounce' 
                  : 'bg-gray-100 text-sky hover:bg-sky/20'
            }`}
            title="Tinglash"
          >
            {needsInteraction ? <Play size={20} fill="currentColor" /> : <Volume2 size={20} strokeWidth={3} />}
          </button>

          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-sky/20 rotate-45"></div>
        </div>
      )}
      
      <div className="relative cursor-pointer animate-float" onClick={speak}>
        {/* Premium SVG AstroCar */}
        <svg viewBox="0 0 200 200" className="w-36 h-36 drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#45B3FF" />
              <stop offset="100%" stopColor="#0984E3" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Antenna */}
          <line x1="100" y1="40" x2="100" y2="15" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="15" r="8" fill={isSpeaking ? "#FF6B6B" : "#FDCB6E"} className={isSpeaking ? "animate-pulse" : ""} />

          {/* Wheels Back */}
          <rect x="35" y="130" width="25" height="35" rx="12" fill="#1E293B" />
          <rect x="140" y="130" width="25" height="35" rx="12" fill="#1E293B" />

          {/* Main Body */}
          <rect x="25" y="40" width="150" height="110" rx="45" fill="url(#bodyGrad)" />
          
          {/* Body Highlight */}
          <path d="M 40 50 Q 100 45 160 50 A 35 35 0 0 1 165 80 Q 100 70 35 80 A 35 35 0 0 1 40 50 Z" fill="#ffffff" opacity="0.2" />

          {/* Screen/Face */}
          <rect x="45" y="60" width="110" height="65" rx="25" fill="url(#glassGrad)" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
          
          {/* Screen Reflection */}
          <path d="M 55 65 Q 100 60 145 65 A 15 15 0 0 1 150 80 Q 100 75 50 80 A 15 15 0 0 1 55 65 Z" fill="#ffffff" opacity="0.1" />

          {/* Eyes */}
          {renderEyes()}

          {/* Mouth - Fixed distortion by using a stable CSS animation with correct transform-origin */}
          {emotion !== 'sleepy' && (
            <rect 
              x="85" 
              y="105" 
              width="30" 
              height="12" 
              rx="6" 
              fill="#45B3FF" 
              className={isSpeaking ? "animate-talk-mouth" : ""} 
              style={{ transformBox: 'fill-box', transformOrigin: 'center', transform: isSpeaking ? 'none' : 'scaleY(0.3)' }}
            />
          )}

          {/* Wheels Front (Overlays body slightly) */}
          <rect x="20" y="125" width="30" height="40" rx="15" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          <rect x="150" y="125" width="30" height="40" rx="15" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          
          {/* Wheel Hubs */}
          <circle cx="35" cy="145" r="6" fill="#94A3B8" />
          <circle cx="165" cy="145" r="6" fill="#94A3B8" />
        </svg>
      </div>
    </div>
  );
};

// --- Confetti ---
export const Confetti: React.FC = () => {
  const colors = ['#FF6B6B', '#FDCB6E', '#00D2A0', '#45B3FF', '#8A78FA'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => {
        const left = Math.random() * 100;
        const animDuration = 1.5 + Math.random() * 2;
        const delay = Math.random() * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() > 0.5 ? 'w-4 h-4' : 'w-3 h-3 rounded-full';
        return (
          <div
            key={i}
            className={`absolute top-[-20px] ${size}`}
            style={{
              left: `${left}%`,
              backgroundColor: color,
              animation: `confetti-fall ${animDuration}s ${delay}s cubic-bezier(.37,0,.63,1) forwards`,
            }}
          />
        );
      })}
    </div>
  );
};
