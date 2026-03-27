import React, { useState, useEffect } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS, getPhClass } from '../data/words';

export default function LearnScreen({ onNavigate }) {
  const { state } = useGame();
  const { speak, speakPhonics, cancel } = useTTS();
  const [learnLevel, setLearnLevel] = useState(state.level);
  const [idx, setIdx] = useState(0);

  const wordList = WORDS[learnLevel];
  const currentItem = wordList[idx];

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  const handleLevelChange = (newLevel) => {
    setLearnLevel(newLevel);
    setIdx(0);
    cancel();
  };

  const handlePrev = () => {
    setIdx(prev => (prev > 0 ? prev - 1 : wordList.length - 1));
    cancel();
  };

  const handleNext = () => {
    setIdx(prev => (prev < wordList.length - 1 ? prev + 1 : 0));
    cancel();
  };

  const playWord = () => {
    speak(currentItem.word);
  };

  const playPhonics = () => {
    // Basic phonics highlight simulated simply with audio for now
    speakPhonics(currentItem.phonics);
  };

  return (
    <div className="screen active" id="learn-screen">
      <div style={{ width: '100%', maxWidth: '540px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={() => { cancel(); onNavigate('menu-screen'); }}>← Back</button>
          <div style={{ fontFamily: 'var(--font)', fontSize: '1.3rem', color: 'var(--text)' }}>📖 Learn Words</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className={`btn btn-outline ${learnLevel === 'beginner' ? 'btn-teal' : ''}`} style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => handleLevelChange('beginner')}>🌱</button>
            <button className={`btn btn-outline ${learnLevel === 'intermediate' ? 'btn-teal' : ''}`} style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => handleLevelChange('intermediate')}>🌿</button>
            <button className={`btn btn-outline ${learnLevel === 'advanced' ? 'btn-teal' : ''}`} style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => handleLevelChange('advanced')}>🌳</button>
          </div>
        </div>
        
        <div className="learn-card">
          <div className="learn-word">{currentItem.word}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '12px 0', flexWrap: 'wrap' }}>
            <button className="listen-btn" onClick={playWord}><span className="speaker-icon">🔊</span> Pronounce</button>
            <button className="listen-btn" style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }} onClick={playPhonics}>📖 Phonics</button>
          </div>
          
          <div style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text-lt)', textAlign: 'center', marginBottom: '6px' }}>Phonics breakdown:</div>
          <div className="phonics-row">
            {currentItem.phonics.map((ph, i) => (
              <div key={i} className={`ph-block ${getPhClass(ph)}`}>{ph}</div>
            ))}
          </div>
          
          <div className="learn-sentence">{currentItem.sentence}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-lt)', textAlign: 'center', marginTop: '10px' }}>{currentItem.hint}</div>
        </div>
        
        <div className="learn-nav">
          <button className="btn btn-outline" onClick={handlePrev}>← Prev</button>
          <button className="btn btn-teal" onClick={playWord}>🔊 Play</button>
          <button className="btn btn-outline" onClick={handleNext}>Next →</button>
        </div>
        <div className="learn-idx" style={{ textAlign: 'center' }}>Word {idx + 1} of {wordList.length}</div>
      </div>
    </div>
  );
}
