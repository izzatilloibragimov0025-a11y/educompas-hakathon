// --- Sound Effects (SFX) Engine using Web Audio API ---
let audioCtx: AudioContext | null = null;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  // Silent utterance to unlock SpeechSynthesis on iOS/Safari
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('');
    utterance.volume = 0;
    window.speechSynthesis.speak(utterance);
  }
};

const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const sfx = {
  pop: () => playTone(600, 'sine', 0.1, 0.2),
  tap: () => playTone(800, 'sine', 0.05, 0.1),
  success: () => {
    if (!audioCtx) return;
    playTone(523.25, 'sine', 0.1, 0.2); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.1, 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.3, 0.2), 200); // G5
  },
  error: () => {
    if (!audioCtx) return;
    playTone(300, 'triangle', 0.2, 0.2);
    setTimeout(() => playTone(250, 'triangle', 0.3, 0.2), 150);
  },
  tada: () => {
    if (!audioCtx) return;
    playTone(440, 'square', 0.1, 0.1);
    setTimeout(() => playTone(554, 'square', 0.1, 0.1), 100);
    setTimeout(() => playTone(659, 'square', 0.4, 0.1), 200);
    setTimeout(() => playTone(880, 'square', 0.6, 0.15), 300);
  }
};

// --- Robust Text-to-Speech (TTS) ---
export const playTTS = (
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void
): { stop: () => void } => {
  if (!('speechSynthesis' in window)) {
    console.warn("TTS not supported");
    if (onEnd) onEnd();
    return { stop: () => {} };
  }

  window.speechSynthesis.cancel(); // Clear queue

  const utterance = new SpeechSynthesisUtterance(text);
  
  const setVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    // Try to find the best voice. Uzbek is rare, so fallback to Turkish or Russian for better phonetic reading of Latin script than English.
    let selectedVoice = voices.find(v => v.lang.includes('uz'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('tr'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('ru'));
    
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.lang = 'uz-UZ';
    utterance.pitch = 1.4; // High pitch for cute robot voice
    utterance.rate = 0.85; // Slower for kids
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', setVoiceAndSpeak, { once: true });
  } else {
    setVoiceAndSpeak();
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };
  
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  
  utterance.onerror = (e) => {
    console.warn("TTS Error:", e);
    if (onEnd) onEnd();
  };

  return {
    stop: () => {
      window.speechSynthesis.cancel();
      if (onEnd) onEnd();
    }
  };
};
