import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS, getPhClass } from '../data/words';

export default function Game1HearType({ onExit }) {
  const { state, addXP, onCorrect, onWrong, markLearned } = useGame();
  const { speak, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [lives, setLives] = useState(3);
  const [showPhonics, setShowPhonics] = useState(false);
  const [dots, setDots] = useState([false, false, false, false, false]); // 5 rounds per session
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  
  const inputRef = useRef(null);

  useEffect(() => {
    loadNewWord();
    return () => cancel();
  }, []);

  const loadNewWord = () => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    setInputValue('');
    setShowPhonics(false);
    setFeedback({ text: '', type: '' });
    if (inputRef.current) inputRef.current.focus();
    setTimeout(() => {
      speak(nextWord.word);
    }, 300);
  };

  const handleCheck = () => {
    if (!currentWord || !inputValue.trim()) return;
    
    if (inputValue.toUpperCase() === currentWord.word) {
      // Correct
      setFeedback({ text: 'Awesome! ✨', type: 'correct' });
      markLearned(currentWord.word);
      onCorrect();
      addXP(10 + state.streak * 2);
      
      const newDots = [...dots];
      newDots[round] = true;
      setDots(newDots);
      
      setTimeout(() => {
        if (round < 4) {
          setRound(r => r + 1);
          loadNewWord();
        } else {
          // Finished session
          onExit();
        }
      }, 1000);
    } else {
      // Wrong
      setFeedback({ text: 'Oops, try again! ❌', type: 'wrong' });
      onWrong();
      setLives(l => l - 1);
      
      if (lives <= 1) {
        // Game over logic optionally...
        setTimeout(() => onExit(), 1500);
      } else {
        setTimeout(() => {
          setFeedback({ text: '', type: '' });
          if (inputRef.current) inputRef.current.focus();
        }, 1000);
      }
    }
  };

  const handleSkip = () => {
    if (round < 4) {
      setRound(r => r + 1);
      loadNewWord();
    } else {
      onExit();
    }
  };

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '620px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp}</span></div>
          <div className="hud-chip"><span className="ic">🔥</span><span>{state.streak}</span></div>
          <div className="hud-chip">
            <div className="lives-row">
              {['❤️','❤️','❤️'].map((heart, i) => (
                <span key={i} className={`life ${i >= lives ? 'lost' : ''}`}>{heart}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`game-arena ${feedback.type === 'correct' ? 'correct-glow' : ''} ${feedback.type === 'wrong' ? 'wrong-shake' : ''}`}>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--text-lt)', marginBottom: '10px' }}>
          🎧 Listen and spell the word!
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '10px 0', flexWrap: 'wrap' }}>
          <button className="listen-btn" onClick={() => speak(currentWord?.word)}>
            <span className="speaker-icon">🔊</span> Listen Again
          </button>
          <button className="listen-btn" style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }} onClick={() => setShowPhonics(true)}>
            📖 Phonics Hint
          </button>
        </div>
        
        {showPhonics && currentWord && (
          <div className="phonics-row" style={{ marginBottom: '10px' }}>
            {currentWord.phonics.map((ph, i) => (
              <div key={i} className={`ph-block ${getPhClass(ph)}`}>{ph}</div>
            ))}
          </div>
        )}
        
        <input 
          ref={inputRef}
          className={`type-input ${feedback.type === 'correct' ? 'correct-inp' : ''} ${feedback.type === 'wrong' ? 'wrong-inp' : ''}`} 
          placeholder="Type the word here..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          autoComplete="off" autoCorrect="off" spellCheck="false" 
        />
        
        <div style={{ textAlign: 'center', marginTop: '14px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-coral" onClick={handleCheck}>Check ✓</button>
          <button className="btn btn-outline" onClick={handleSkip}>Skip →</button>
        </div>
        
        <div style={{ height: '32px', marginTop: '8px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: feedback.type === 'correct' ? 'var(--mint)' : 'var(--coral)' }}>
          {feedback.text}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <div className="progress-dots">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`dot ${i < round ? 'done' : ''} ${i === round ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
