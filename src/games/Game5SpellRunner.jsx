import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS } from '../data/words';

export default function Game5SpellRunner({ onExit }) {
  const { state, addXP, onCorrect, onWrong, markLearned } = useGame();
  const { speak, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [lives, setLives] = useState(3);
  const [distance, setDistance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100); // Percentage
  const [isGameOver, setIsGameOver] = useState(false);
  
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const loadNewWord = useCallback(() => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    setInputValue('');
    if (inputRef.current) inputRef.current.focus();
    
    // Add some time back on correct answer, max 100
    setTimeLeft(prev => Math.min(prev + 30, 100));
    
    setTimeout(() => {
      speak(nextWord.word, 1.1); // Speak a bit faster since it's a speed run
    }, 100);
  }, [state.level, speak]);

  useEffect(() => {
    loadNewWord();
    
    // Start interval
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setIsGameOver(true);
          return 0;
        }
        return prev - 2; // Decrease 2% every tick (fast!)
      });
      // also increase distance slowly
      setDistance(d => d + 1);
    }, 250);

    return () => {
      clearInterval(timerRef.current);
      cancel();
    };
  }, [loadNewWord, cancel]);

  const handleCheck = () => {
    if (isGameOver || !currentWord) return;
    
    if (inputValue.toUpperCase() === currentWord.word) {
      onCorrect();
      addXP(10);
      markLearned(currentWord.word);
      loadNewWord();
    } else {
      onWrong();
      setLives(l => l - 1);
      setInputValue(''); // Clear input for retry
      
      if (lives <= 1) {
        setIsGameOver(true);
        clearInterval(timerRef.current);
        setTimeout(() => onExit(), 2000);
      }
    }
  };

  if (isGameOver && lives > 0) {
    // Game over due to time
    setTimeout(() => onExit(), 2000);
  }

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '620px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp}</span></div>
          <div className="hud-chip"><span className="ic">📏</span><span>{distance}m</span></div>
          <div className="hud-chip">
            <div className="lives-row">
              {['❤️','❤️','❤️'].map((heart, i) => (
                <span key={i} className={`life ${i >= lives ? 'lost' : ''}`}>{heart}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="runner-arena">
        <div className="runner-sky">
          <div className="runner-cloud">☁️</div>
          <div className="runner-cloud">🌤️</div>
        </div>
        <div className="runner-ground-strip"></div>
        <div className="runner-lane"></div>
        <div className="runner-char" style={{ animationName: isGameOver ? 'none' : 'runBob' }}>🏃</div>
        {/* We can animate an obstacle later, keeping it simple for now */}
      </div>
      
      <div className="runner-timer">
        <div 
          className="runner-timer-fill" 
          style={{ 
            width: `${timeLeft}%`, 
            background: timeLeft < 25 ? 'var(--coral)' : 'linear-gradient(90deg,var(--mint),var(--teal))' 
          }}
        ></div>
      </div>

      <div style={{ textAlign: 'center', fontFamily: 'var(--font)', fontSize: '1.1rem', color: isGameOver ? 'var(--coral)' : 'var(--purple)', margin: '6px 0' }}>
        {isGameOver ? 'Game Over!' : 'Spell the word!'}
      </div>

      <div className="runner-type-area">
        <input 
          ref={inputRef}
          className="runner-input" 
          placeholder="Spell it!" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={isGameOver}
          autoComplete="off" autoCorrect="off" spellCheck="false" 
        />
        <button className="btn btn-coral" onClick={handleCheck} style={{ borderRadius: '50px', padding: '0 20px' }} disabled={isGameOver}>
          Go!
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
         <button className="listen-btn" onClick={() => speak(currentWord?.word)} disabled={isGameOver}>
            <span className="speaker-icon">🔊</span> Listen Again
         </button>
      </div>
    </div>
  );
}
