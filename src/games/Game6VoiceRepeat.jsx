import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS, getPhClass } from '../data/words';

export default function Game6VoiceRepeat({ onExit }) {
  const { state, addXP, markLearned, markMastered } = useGame();
  const { speak, speakPhonics, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const loadNewWord = useCallback(() => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    
    setTimeout(() => {
      speak(nextWord.word);
    }, 300);
  }, [state.level, speak]);

  useEffect(() => {
    loadNewWord();
    return () => cancel();
  }, [loadNewWord, cancel]);

  const handleRepeated = () => {
    // In a real app we'd use Speech Recognition. Here we trust the user.
    addXP(15);
    markLearned(currentWord.word);
    markMastered(currentWord.word); // Mark as mastered since they "spoke" it
    setScore(s => s + 1);
    
    if (round < 4) {
      setRound(r => r + 1);
      loadNewWord();
    } else {
      onExit();
    }
  };

  const handleNext = () => {
    if (round < 4) {
      setRound(r => r + 1);
      loadNewWord();
    } else {
      onExit();
    }
  };

  if(!currentWord) return null;

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '520px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp}</span></div>
          <div className="hud-chip"><span className="ic">🎤</span><span>{score}/5</span></div>
        </div>
      </div>

      <div className="voice-card" style={{ marginTop: '20px' }}>
        <div style={{ fontFamily: 'var(--font)', fontSize: '0.95rem', color: 'var(--text-lt)', marginBottom: '14px' }}>
          🎤 Listen, then say the word out loud!
        </div>
        <div className="voice-word-big">{currentWord.word}</div>
        <div style={{ height: '12px' }}></div>
        <div className="phonics-row">
          {currentWord.phonics.map((ph, i) => (
             <div key={i} className={`ph-block ${getPhClass(ph)}`}>{ph}</div>
          ))}
        </div>
        <div className="voice-sentence">{currentWord.sentence}</div>
        <div style={{ height: '16px' }}></div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="listen-btn" onClick={() => speak(currentWord.word)}>
            <span className="speaker-icon">🔊</span> Listen
          </button>
          <button className="listen-btn" style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }} onClick={() => speakPhonics(currentWord.phonics)}>
            🔤 Phonics
          </button>
        </div>
        <div style={{ height: '14px' }}></div>
        <div>
          <button className="btn btn-coral" style={{ width: '100%', fontSize: '1rem', padding: '14px' }} onClick={handleRepeated}>
            🎤 I Said It! ✓
          </button>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-lt)', fontWeight: 600, marginTop: '6px', textAlign: 'center' }}>
            Say the word out loud, then tap the button
          </div>
        </div>
        <div style={{ height: '10px' }}></div>
        <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleNext}>Next Word →</button>
      </div>

      <div className="progress-dots" style={{ marginTop: '12px' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`dot ${i < round ? 'done' : ''} ${i === round ? 'active' : ''}`}></div>
        ))}
      </div>
    </div>
  );
}
