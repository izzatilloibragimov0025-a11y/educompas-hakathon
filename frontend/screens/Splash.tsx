import React, { useEffect, useState } from 'react';
import { initAudio, sfx } from '../services/audio';
import { User } from '../types';
import { Button } from '../components/UI';

interface Props {
  user: User | null;
  onComplete: () => void;
  onReset: () => void;
}

export const Splash: React.FC<Props> = ({ user, onComplete, onReset }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    initAudio();
    sfx.tada();
    onComplete();
  };

  // Custom SVG Logo Component matching the provided design
  const EduKompasLogo = () => (
    <div className="relative w-48 h-48 mb-6 animate-float">
      <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B224EF" />
            <stop offset="100%" stopColor="#FF758C" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#B224EF" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#B224EF" floodOpacity="0.3"/>
          </filter>
        </defs>
        <g transform="translate(100, 100)" filter="url(#glow)">
          {/* The 4 geometric wings */}
          <path d="M -20,-20 L -50,-80 L 10,-90 L 30,-30 Z" fill="url(#logoGrad1)" />
          <path d="M 20,-20 L 80,-50 L 90,10 L 30,30 Z" fill="url(#logoGrad2)" />
          <path d="M 20,20 L 50,80 L -10,90 L -30,30 Z" fill="url(#logoGrad1)" />
          <path d="M -20,20 L -80,50 L -90,-10 L -30,-30 Z" fill="url(#logoGrad2)" />
          
          {/* Inner connecting lines forming a square */}
          <rect x="-28" y="-28" width="56" height="56" fill="none" stroke="white" strokeWidth="4" />
          
          {/* The 4 nodes (dots) */}
          <circle cx="-28" cy="-28" r="7" fill="white" className="animate-pulse" />
          <circle cx="28" cy="-28" r="7" fill="white" className="animate-pulse" style={{animationDelay: '0.2s'}} />
          <circle cx="28" cy="28" r="7" fill="white" className="animate-pulse" style={{animationDelay: '0.4s'}} />
          <circle cx="-28" cy="28" r="7" fill="white" className="animate-pulse" style={{animationDelay: '0.6s'}} />
        </g>
      </svg>
    </div>
  );

  // Generic Premium Splash for First Launch (No interests known yet)
  if (!user) {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center relative overflow-hidden">
        {/* Elegant background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-lavender/20 to-transparent rounded-b-[100%] blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full px-6">
          
          <EduKompasLogo />
          
          <h1 
            className="text-5xl font-display font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-lavender to-coral animate-pop-in text-center"
            style={{ filter: 'drop-shadow(3px 4px 0px #2D3436)' }}
          >
            EDUCOMPAS
          </h1>

          {isReady ? (
            <div className="mt-16 animate-pop-in w-full max-w-xs">
              <Button 
                onClick={handleStart} 
                variant="primary" 
                className="w-full !py-5 !text-xl !bg-lavender !border-lavender-dark !shadow-3d-secondary"
              >
                Boshlash
              </Button>
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center animate-pop-in w-full max-w-xs" style={{animationDelay: '0.4s'}}>
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-lavender rounded-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Personalized Cosmic Splash for Returning Users
  return (
    <div className="min-h-screen bg-cosmic flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-sunny rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sky rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        
        <EduKompasLogo />
        
        <h1 
          className="text-4xl font-display font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-sunny to-coral animate-pop-in text-center mb-4"
          style={{ filter: 'drop-shadow(3px 4px 0px #2D3436)' }}
        >
          EDUCOMPAS
        </h1>

        <h2 className="text-2xl font-display font-bold text-white animate-pop-in drop-shadow-lg text-center">
          Qaytganing bilan, <span className="text-sunny">{user.name}!</span>
        </h2>
        
        {isReady ? (
          <div className="mt-12 flex flex-col items-center animate-pop-in w-full max-w-xs">
            <Button 
              onClick={handleStart} 
              variant="white" 
              className="w-full !py-4 !text-lg mb-6"
            >
              Davom etish
            </Button>
            
            {/* Reset Button for Demo Purposes */}
            <button 
              onClick={onReset} 
              className="text-white/50 text-sm font-bold hover:text-white transition-colors underline underline-offset-4"
            >
              Boshqa foydalanuvchi (Tozalash)
            </button>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center animate-pop-in" style={{animationDelay: '0.5s'}}>
            <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sunny to-coral rounded-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="mt-3 text-white/80 font-bold text-sm tracking-widest uppercase">Koinotga tayyorgarlik...</p>
          </div>
        )}
      </div>
    </div>
  );
};
