import React, { useState, useEffect } from 'react';
import { User, ScreenState } from './types';
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { Game } from './screens/Game';
import { SessionEnd } from './screens/SessionEnd';
import { PhygitalLock } from './screens/PhygitalLock';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [sessionCoins, setSessionCoins] = useState(0);

  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('edukompas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSplashComplete = () => {
    if (user) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('onboarding');
    }
  };

  const handleOnboardingComplete = (userData: Partial<User>) => {
    const newUser = userData as User;
    setUser(newUser);
    localStorage.setItem('edukompas_user', JSON.stringify(newUser));
    setCurrentScreen('home');
  };

  const handleGameComplete = (coins: number) => {
    setSessionCoins(coins);
    if (user) {
      const updatedUser = { ...user, coins: user.coins + coins };
      setUser(updatedUser);
      localStorage.setItem('edukompas_user', JSON.stringify(updatedUser));
    }
    setCurrentScreen('session_end');
  };

  const handleReset = () => {
    localStorage.removeItem('edukompas_user');
    setUser(null);
    setCurrentScreen('splash');
  };

  // Simple router
  switch (currentScreen) {
    case 'splash':
      return <Splash onComplete={handleSplashComplete} user={user} onReset={handleReset} />;
    case 'onboarding':
      return <Onboarding onComplete={handleOnboardingComplete} />;
    case 'home':
      return user ? (
        <Home 
          user={user} 
          onStartMission={() => setCurrentScreen('game')} 
          onReset={handleReset}
        />
      ) : null;
    case 'game':
      return user ? (
        <Game 
          user={user} 
          onComplete={handleGameComplete} 
          onExit={() => setCurrentScreen('home')}
        />
      ) : null;
    case 'session_end':
      return (
        <SessionEnd 
          coinsEarned={sessionCoins} 
          onNext={() => setCurrentScreen('phygital_lock')} 
        />
      );
    case 'phygital_lock':
      return user ? (
        <PhygitalLock 
          user={user} 
          onUnlock={() => setCurrentScreen('home')} 
        />
      ) : null;
    default:
      return <Splash onComplete={handleSplashComplete} user={user} onReset={handleReset} />;
  }
};

export default App;
