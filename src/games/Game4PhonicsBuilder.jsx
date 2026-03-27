import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS, getPhClass } from '../data/words';

export default function Game4PhonicsBuilder({ onExit }) {
  const { state, addXP, onCorrect, onWrong, markLearned } = useGame();
  const { speak, speakPhonics, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [pool, setPool] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const loadNewWord = useCallback(() => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    
    // Copy the phonics, add some noise depending on level
    let allPhonics = [...nextWord.phonics];
    if (state.level === 'beginner') {
      // Add 1 random distractor
      allPhonics.push(['A','E','I','O','U'][Math.floor(Math.random() * 5)]);
    } else if (state.level === 'advanced') {
      const distractors = ['SH','CH','TH','WH','PH','EE','OO','EA','OU','IGH'];
      allPhonics.push(distractors[Math.floor(Math.random() * distractors.length)]);
      allPhonics.push(['A','E','I','O','U'][Math.floor(Math.random() * 5)]);
    } else {
      const distractors = ['SH','CH','TH','EE','OO'];
      allPhonics.push(distractors[Math.floor(Math.random() * distractors.length)]);
    }
    
    // Shuffle pool
    setPool(allPhonics.map((ph, i) => ({ id: `ph-${i}`, ph })).sort(() => Math.random() - 0.5));
    setAnswer([]);
    
    setTimeout(() => {
      speak(nextWord.word);
    }, 300);
  }, [state.level, speak]);

  useEffect(() => {
    loadNewWord();
    return () => cancel();
  }, [loadNewWord, cancel]);

  const addToAnswer = (item) => {
    setAnswer([...answer, item]);
    setPool(pool.filter(p => p.id !== item.id));
  };

  const removeFromAnswer = (item) => {
    setPool([...pool, item]);
    setAnswer(answer.filter(a => a.id !== item.id));
  };

  const handleCheck = () => {
    if (answer.length === 0) return;
    
    const assembled = answer.map(a => a.ph).join('');
    if (assembled === currentWord.word) {
      onCorrect();
      addXP(20 + state.streak * 2);
      markLearned(currentWord.word);
      setScore(s => s + 1);
      
      setTimeout(() => {
        if(round < 4) {
          setRound(r => r + 1);
          loadNewWord();
        } else {
          onExit();
        }
      }, 1000);
    } else {
      onWrong();
      // Reset after brief highlight (could add more complex feedback here)
      setTimeout(() => handleReset(), 600);
    }
  };

  const handleReset = () => {
    setPool([...pool, ...answer]);
    setAnswer([]);
  };

  if(!currentWord) return null;

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '600px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp}</span></div>
          <div className="hud-chip"><span className="ic">🎯</span><span>{score}/5</span></div>
        </div>
      </div>

      <div className="game-arena">
        <div style={{ textAlign: 'center', fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--text-lt)', marginBottom: '6px' }}>
          🧱 Click phonics in the right order to build the word!
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '8px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="listen-btn" onClick={() => speak(currentWord.word)}><span className="speaker-icon">🔊</span> Hear Word</button>
          <button className="listen-btn" style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }} onClick={() => speakPhonics(currentWord.phonics)}>📖 Play Phonics</button>
        </div>

        <div style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text-lt)', textAlign: 'center', margin: '8px 0' }}>Your answer:</div>
        <div className="ph-builder-answer">
          {answer.map(item => (
            <div key={item.id} className="ph-clickable ans-item" onClick={() => removeFromAnswer(item)}>
              {item.ph}
            </div>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text-lt)', textAlign: 'center', margin: '12px 0 6px' }}>Available phonics (click to select):</div>
        <div className="ph-builder-pool">
          {pool.map(item => (
            <div key={item.id} className={`ph-clickable pool-item ${getPhClass(item.ph)}`} onClick={() => addToAnswer(item)}>
              {item.ph}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-teal" onClick={handleCheck}>Check ✓</button>
          <button className="btn btn-outline" onClick={handleReset}>Reset 🔄</button>
        </div>
      </div>

      <div className="progress-dots" style={{ marginTop: '14px' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`dot ${i < round ? 'done' : ''} ${i === round ? 'active' : ''}`}></div>
        ))}
      </div>
    </div>
  );
}
