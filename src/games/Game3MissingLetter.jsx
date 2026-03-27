import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS } from '../data/words';

export default function Game3MissingLetter({ onExit }) {
  const { state, addXP, onCorrect, onWrong, markLearned } = useGame();
  const { speak, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [missingIndex, setMissingIndex] = useState(-1);
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [round, setRound] = useState(0);

  const loadNewWord = useCallback(() => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    
    const chars = nextWord.word.split('');
    const mIdx = Math.floor(Math.random() * chars.length);
    setMissingIndex(mIdx);
    
    const correctChar = chars[mIdx];
    // Generate some random letters for choices
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let options = [correctChar];
    while(options.length < 4) {
      const randChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      if(!options.includes(randChar)) {
        options.push(randChar);
      }
    }
    options.sort(() => Math.random() - 0.5);
    
    setChoices(options);
    setSelectedChoice(null);
    setFeedback({ text: '', type: '' });
    
    setTimeout(() => {
      speak(nextWord.word);
    }, 300);
  }, [state.level, speak]);

  useEffect(() => {
    loadNewWord();
    return () => cancel();
  }, [loadNewWord, cancel]);

  const handleSelect = (choice) => {
    if (selectedChoice) return; // Prevent multiple clicks
    setSelectedChoice(choice);
    
    const correctChar = currentWord.word[missingIndex];
    if(choice === correctChar) {
      setFeedback({ text: 'Excellent! ✨', type: 'correct' });
      markLearned(currentWord.word);
      onCorrect();
      addXP(15 + state.streak * 2);
      
      setTimeout(() => {
        if (round < 4) {
          setRound(r => r + 1);
          loadNewWord();
        } else {
          onExit();
        }
      }, 1200);
    } else {
      setFeedback({ text: 'Oops! Try again ❌', type: 'wrong' });
      onWrong();
      
      setTimeout(() => {
        setFeedback({ text: '', type: '' });
        setSelectedChoice(null);
      }, 1000);
    }
  };

  if(!currentWord) return null;

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '600px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp} XP</span></div>
          <div className="hud-chip"><span className="ic">🔥</span><span>{state.streak}</span></div>
        </div>
      </div>

      <div className={`game-arena ${feedback.type === 'correct' ? 'correct-glow' : ''} ${feedback.type === 'wrong' ? 'wrong-shake' : ''}`}>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--text-lt)', marginBottom: '6px' }}>
          🔡 Fill in the missing letter!
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '8px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="listen-btn" onClick={() => speak(currentWord.word)}>
            <span className="speaker-icon">🔊</span> Hear It
          </button>
          <div className="word-hint">{currentWord.hint}</div>
        </div>

        <div className="word-blanks">
          {currentWord.word.split('').map((char, index) => {
            if (index === missingIndex) {
              return (
                <div key={index} className={`wl-char blank ${feedback.type === 'wrong' ? 'filled-wrong' : ''} ${feedback.type === 'correct' ? 'filled-correct' : 'active'}`}>
                  {selectedChoice ? selectedChoice : '?'}
                </div>
              );
            }
            return <div key={index} className="wl-char" style={{ background: 'var(--card)', border: '2px solid var(--border)' }}>{char}</div>;
          })}
        </div>

        <div className="letter-choices">
          {choices.map((choice, index) => {
            let extraClass = '';
            if (selectedChoice) {
              if (choice === currentWord.word[missingIndex]) extraClass = 'correct';
              else if (choice === selectedChoice) extraClass = 'wrong';
              else extraClass = 'used';
            }
            return (
              <button 
                key={index} 
                className={`choice-btn ${extraClass}`}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedChoice}
              >
                {choice}
              </button>
            );
          })}
        </div>

        <div style={{ height: '28px', marginTop: '10px', textAlign: 'center', fontWeight: 800, fontSize: '0.95rem', color: feedback.type === 'correct' ? 'var(--mint)' : 'var(--coral)' }}>
          {feedback.text}
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
