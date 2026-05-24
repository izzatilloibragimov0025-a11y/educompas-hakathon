import React from 'react';
import { User } from '../types';
import { AstroCar, Button, GlassCard } from '../components/UI';
import { Play, Star, Flame, LogOut } from 'lucide-react';

interface Props {
  user: User;
  onStartMission: () => void;
  onReset: () => void;
}

export const Home: React.FC<Props> = ({ user, onStartMission, onReset }) => {
  return (
    <div className="min-h-screen bg-offwhite pb-24 relative">
      {/* Top Header Background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky/20 to-transparent rounded-b-[40px] z-0"></div>

      <div className="relative z-10 px-6 pt-12 max-w-md mx-auto">
        {/* Header Profile */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-full py-2 px-4 flex items-center gap-3 shadow-sm border border-white">
            <div className="w-10 h-10 bg-gradient-to-br from-lavender to-sky rounded-full flex items-center justify-center text-xl shadow-inner border-2 border-white">
              {user.gender === 'girl' ? '👧' : '👦'}
            </div>
            <div>
              <p className="text-charcoal/50 font-bold text-[10px] uppercase tracking-wider leading-none">Kapitan</p>
              <h1 className="text-lg font-display font-black text-charcoal leading-tight">{user.name}</h1>
            </div>
          </div>
          <button 
            onClick={onReset}
            className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-charcoal/50 shadow-sm border border-white hover:text-coral transition-colors"
            title="Tizimdan chiqish"
          >
            <LogOut size={22} strokeWidth={2.5} className="ml-1" />
          </button>
        </div>

        {/* 3D Stats Row */}
        <div className="flex gap-4 mb-10">
          <div className="flex-1 bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-3d-white border-2 border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-sunny to-warm rounded-full flex items-center justify-center text-white shadow-inner">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-wide">NaviCoin</p>
              <p className="font-display font-black text-2xl text-charcoal leading-none">{user.coins}</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-3d-white border-2 border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-coral to-coral-dark rounded-full flex items-center justify-center text-white shadow-inner">
              <Flame size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-wide">Kunlik</p>
              <p className="font-display font-black text-2xl text-charcoal leading-none">{user.streak}</p>
            </div>
          </div>
        </div>

        {/* Astro-Car Greeting */}
        <AstroCar 
          dialogue={`Salom, ${user.name}! Bugun yangi sayyoraga uchamizmi?`} 
          className="mb-10"
        />

        {/* Glowing Mission Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-lavender to-sky rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="bg-cosmic rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden border-4 border-white/10">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 right-0 text-8xl opacity-20 translate-x-4 translate-y-8 animate-float">🚀</div>
            
            <div className="relative z-10">
              <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-4 border border-white/20">
                ⭐ Level {user.level}
              </div>
              <h2 className="text-4xl font-display font-black mb-3 drop-shadow-md">Koinot Sirlari</h2>
              <p className="text-lg text-white/90 font-bold mb-8 leading-snug max-w-[80%]">
                Yulduzlarni yig'ib, raketamiz dvigatelini ishga tushiramiz!
              </p>
              
              <Button 
                variant="white"
                onClick={onStartMission}
                className="w-full !py-5 !text-xl !text-lavender-dark group-hover:scale-[1.02]"
              >
                Boshlash <Play size={24} fill="currentColor" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
