import { useState, useEffect, useCallback } from 'react';

export function useTTS() {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      
      const selectedVoice = voices.find(v => v.lang === 'en-IN')
        || voices.find(v => v.name.toLowerCase().includes('raveena'))
        || voices.find(v => v.name.toLowerCase().includes('india'))
        || voices.find(v => v.name.toLowerCase().includes('heera'))
        || voices.find(v => v.lang.startsWith('hi'))
        || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0] || null;

      setVoice(selectedVoice);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speak = useCallback((text, rate = 0.85, onEnd = () => {}) => {
    if (!window.speechSynthesis) {
      onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-IN';
      u.rate = rate;
      u.pitch = 1.0;
      if (voice) u.voice = voice;
      u.onend = onEnd;
      window.speechSynthesis.speak(u);
    }, 50);
  }, [voice]);

  const speakPhonics = useCallback((phonics, highlightCb, onComplete) => {
    let i = 0;
    const next = () => {
      if (i >= phonics.length) {
        if (onComplete) onComplete();
        return;
      }
      if (highlightCb) highlightCb(i);
      speak(phonics[i], 0.7, () => {
        i++;
        setTimeout(next, 350);
      });
    };
    next();
  }, [speak]);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, speakPhonics, cancel };
}
