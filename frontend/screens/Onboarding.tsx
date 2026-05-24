import React, { useState } from 'react';
import { User } from '../types';
import { INTERESTS } from '../constants';
import { Button } from '../components/UI';
import { ArrowRight, Check } from 'lucide-react';
import { sfx } from '../services/audio';

interface Props {
  onComplete: (user: Partial<User>) => void;
}

export const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl' | null>(null);
  const [age, setAge] = useState<number>(4);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const filteredInterests = INTERESTS.filter(i => i.target === 'both' || i.target === gender);

  const handleInterestToggle = (id: string) => {
    sfx.tap();
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAgeSelect = (a: number) => {
    sfx.tap();
    setAge(a);
  };

  const handleNext = () => {
    sfx.pop();
    if (step === 1 && name.trim() && gender) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && selectedInterests.length > 0) {
      onComplete({ name, gender: gender!, age, interests: selectedInterests, coins: 0, streak: 1, level: 1 });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite p-6 flex flex-col relative overflow-hidden">
      {/* Elegant background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-lavender/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-sky/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full mt-8 z-10">
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-8">
          <div className={`h-3 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-lavender shadow-inner' : 'bg-gray-200'}`} />
          <div className={`h-3 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-lavender shadow-inner' : 'bg-gray-200'}`} />
          <div className={`h-3 flex-1 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-lavender shadow-inner' : 'bg-gray-200'}`} />
        </div>

        {step === 1 && (
          <div className="animate-pop-in flex-1 flex flex-col">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce-soft">👋</div>
              <h2 className="text-4xl font-display font-black text-charcoal mb-2">Salom!</h2>
              <p className="text-charcoal/60 font-bold text-lg">Qahramonning ismi nima?</p>
            </div>
            
            <div className="mb-6">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismni yozing..."
                className="w-full bg-white rounded-[24px] p-5 text-2xl font-display font-bold text-center text-charcoal shadow-sm border-2 border-gray-200 focus:border-lavender outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="text-center mb-4">
              <p className="text-charcoal/60 font-bold text-lg">O'zingni tanla:</p>
            </div>
            <div className="flex gap-4 mb-auto">
              <button
                onClick={() => { sfx.tap(); setGender('boy'); }}
                className={`flex-1 py-6 rounded-[24px] font-display font-bold text-xl transition-all duration-200 flex flex-col items-center gap-3 ${
                  gender === 'boy' 
                    ? 'bg-sky text-white shadow-3d-white border-2 border-sky-dark -translate-y-2' 
                    : 'bg-white text-charcoal hover:bg-sky/5 border-2 border-gray-200 shadow-sm'
                }`}
              >
                <span className="text-5xl drop-shadow-sm">👦</span>
                O'g'il bola
              </button>
              <button
                onClick={() => { sfx.tap(); setGender('girl'); }}
                className={`flex-1 py-6 rounded-[24px] font-display font-bold text-xl transition-all duration-200 flex flex-col items-center gap-3 ${
                  gender === 'girl' 
                    ? 'bg-coral text-white shadow-3d-white border-2 border-coral-dark -translate-y-2' 
                    : 'bg-white text-charcoal hover:bg-coral/5 border-2 border-gray-200 shadow-sm'
                }`}
              >
                <span className="text-5xl drop-shadow-sm">👧</span>
                Qiz bola
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-pop-in flex-1 flex flex-col">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-float">🎂</div>
              <h2 className="text-4xl font-display font-black text-charcoal mb-2">Yoshing nechada?</h2>
              <p className="text-charcoal/60 font-bold text-lg">{name}ning yoshini tanlang</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-auto">
              {[3, 4, 5, 6].map(a => (
                <button
                  key={a}
                  onClick={() => handleAgeSelect(a)}
                  className={`py-8 rounded-[24px] font-display font-black text-5xl transition-all duration-200 ${
                    age === a 
                      ? 'bg-sunny text-charcoal shadow-3d-white border-2 border-sunny-dark -translate-y-2' 
                      : 'bg-white text-charcoal/40 hover:bg-sunny/10 border-2 border-gray-200 shadow-sm'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-pop-in flex-1 flex flex-col">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-float">🎯</div>
              <h2 className="text-4xl font-display font-black text-charcoal mb-2">Qiziqishlar</h2>
              <p className="text-charcoal/60 font-bold text-lg">{name} nimani yaxshi ko'radi?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-auto overflow-y-auto pb-4" style={{maxHeight: '50vh'}}>
              {filteredInterests.map(interest => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`relative p-3 rounded-[24px] font-display font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-2 h-32 ${
                      isSelected 
                        ? `bg-gradient-to-br ${interest.color} text-white shadow-3d-white border-2 border-white -translate-y-1` 
                        : 'bg-white text-charcoal/60 border-2 border-gray-200 hover:border-lavender/30 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white text-charcoal rounded-full p-1 shadow-sm">
                        <Check size={14} strokeWidth={4} />
                      </div>
                    )}
                    <span className="text-5xl drop-shadow-sm">{interest.label.split(' ')[1]}</span>
                    <span>{interest.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 pb-8">
          <Button 
            onClick={handleNext} 
            className="w-full !bg-lavender !border-lavender-dark !shadow-3d-secondary"
            disabled={
              (step === 1 && (!name.trim() || !gender)) ||
              (step === 3 && selectedInterests.length === 0)
            }
          >
            {step === 3 ? 'Boshlash' : 'Davom etish'}
            <ArrowRight size={24} strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
};
