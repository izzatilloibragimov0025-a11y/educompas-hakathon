import React, { useState, useEffect } from 'react';
import { User, GameTask } from '../types';
import { generateMissionTask } from '../services/ai';
import { AstroCar, Confetti } from '../components/UI';
import { EMOJI_MAP } from '../constants';
import { X } from 'lucide-react';
import { sfx } from '../services/audio';

interface Props {
  user: User;
  onComplete: (coinsEarned: number) => void;
  onExit: () => void;
}

export const Game: React.FC<Props> = ({ user, onComplete, onExit }) => {
  const [task, setTask] = useState<GameTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorWiggle, setErrorWiggle] = useState<number | null>(null);
  const [astroEmotion, setAstroEmotion] = useState<'happy' | 'thinking' | 'excited' | 'sad'>('thinking');
  const [astroDialogue, setAstroDialogue] = useState("Missiya tayyorlanmoqda...");

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setAstroEmotion('thinking');
      const newTask = await generateMissionTask(user.interests, user.age, user.gender);
      setTask(newTask);
      setAstroDialogue(newTask.dialogue);
      setAstroEmotion('happy');
      setLoading(false);
    };
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (item: string, index: number) => {
    if (!task || showSuccess) return;

    if (item === task.targetItem) {
      sfx.success();
      const newCount = selectedCount + 1;
      setSelectedCount(newCount);
      
      if (newCount === task.targetCount) {
        sfx.tada();
        setShowSuccess(true);
        setAstroEmotion('excited');
        setAstroDialogue("Barakalla! Sen buni uddalading! 🎉");
        setTimeout(() => {
          onComplete(10);
        }, 4000);
      } else {
        setAstroEmotion('happy');
        setAstroDialogue(`Zo'r! Yana ${task.targetCount - newCount} ta qoldi.`);
      }
    } else {
      sfx.error();
      setErrorWiggle(index);
      setAstroEmotion('sad');
      setAstroDialogue("O'xshamadi, keling boshqasini ko'ramiz!");
      setTimeout(() => {
        setErrorWiggle(null);
        setAstroEmotion('happy');
      }, 1500);
    }
  };

  if (loading || !task) {
    return (
      <div className="min-h-screen bg-cosmic flex flex-col items-center justify-center p-6">
        <AstroCar dialogue={astroDialogue} emotion={astroEmotion} />
      </div>
    );
  }

  const progressPercent = (selectedCount / task.targetCount) * 100;

  return (
    <div className="min-h-screen bg-cosmic flex flex-col p-6 relative overflow-hidden">
      {showSuccess && <Confetti />}
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-sky/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-lavender/30 rounded-full blur-3xl"></div>
        {/* Rotating stars */}
        <div className="absolute top-1/4 right-1/4 text-white/20 text-4xl animate-spin-slow">⭐</div>
        <div className="absolute bottom-1/3 left-1/4 text-white/20 text-2xl animate-spin-slow" style={{animationDirection: 'reverse'}}>⭐</div>
      </div>

      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-8 z-10 pt-4">
        <button onClick={() => { sfx.tap(); onExit(); }} className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border-2 border-white/20 transition-colors flex-shrink-0">
          <X size={24} strokeWidth={3} />
        </button>
        
        {/* Thick Progress Track */}
        <div className="flex-1 h-6 bg-black/30 rounded-full border-2 border-white/10 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-mint to-sky rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Shine effect on progress bar */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white font-display font-black text-lg border-2 border-white/20 flex-shrink-0">
          {selectedCount} / {task.targetCount}
        </div>
      </div>

      {/* Astro Car */}
      <div className="z-10 mb-auto mt-4">
        <AstroCar dialogue={astroDialogue} emotion={astroEmotion} />
      </div>

      {/* Game Area - 3D Bubbles */}
      <div className="flex-1 flex flex-wrap content-center justify-center gap-6 z-10 pb-12">
        {task.options.map((item, index) => {
          const emoji = EMOJI_MAP[item.toLowerCase()] || '❓';
          const isCorrect = item === task.targetItem;
          const isFound = showSuccess && isCorrect;
          const isWiggling = errorWiggle === index;
          
          return (
            <button
              key={index}
              onClick={() => handleItemClick(item, index)}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center text-6xl transition-all duration-200 active:scale-90
                ${isWiggling ? 'animate-wiggle bg-coral/20 border-coral' : 'hover:scale-105'}
                ${isFound ? 'animate-bounce-soft z-20' : ''}
              `}
            >
              {/* 3D Bubble styling */}
              <div className={`absolute inset-0 rounded-full shadow-2xl border-4 ${isFound ? 'bg-mint border-white' : isWiggling ? 'bg-coral/40 border-coral' : 'bg-white/10 backdrop-blur-md border-white/30'}`}>
                {/* Bubble shine */}
                <div className="absolute top-2 left-4 w-8 h-4 bg-white/40 rounded-full rotate-[-30deg]"></div>
              </div>
              <span className="relative z-10 drop-shadow-lg">{emoji}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
