/**
 * High-quality Uzbek Text-to-Speech service.
 * Uses Google Translate's unofficial TTS endpoint which provides a much more 
 * natural and native-sounding Uzbek voice compared to the browser's built-in Web Speech API.
 */
export const playUzbekTTS = (
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void
): { stop: () => void } => {
  // Split text into sentences to handle longer texts and avoid URL length limits
  let chunks = text.match(/[^.!?]+[.!?]+/g);
  if (!chunks || chunks.length === 0) {
    chunks = [text];
  }

  let currentIndex = 0;
  let currentAudio: HTMLAudioElement | null = null;
  let isStopped = false;

  const playNext = () => {
    if (isStopped) return;
    
    if (currentIndex >= chunks.length) {
      if (onEnd) onEnd();
      return;
    }
    
    const chunk = chunks[currentIndex].trim();
    if (!chunk) {
      currentIndex++;
      playNext();
      return;
    }

    // client=tw-ob is required to act as a standard web client and bypass CORS for media
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=uz&client=tw-ob&q=${encodeURIComponent(chunk)}`;
    currentAudio = new Audio(url);
    
    if (currentIndex === 0 && onStart) {
      currentAudio.onplay = onStart;
    }
    
    currentAudio.onended = () => {
      currentIndex++;
      playNext();
    };
    
    currentAudio.onerror = () => {
      console.warn("Audio chunk failed to play");
      currentIndex++;
      playNext();
    };

    currentAudio.play().catch(err => {
      console.warn("Audio playback blocked by browser (needs user interaction first):", err);
      if (onEnd) onEnd(); // Stop sequence if blocked
    });
  };

  playNext();

  return {
    stop: () => {
      isStopped = true;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (onEnd) onEnd();
    }
  };
};
