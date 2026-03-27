import React from 'react';
import { useGame } from '../store/GameContext';

export default function LevelScreen({ onNavigate }) {
  const { state, setLevel } = useGame();

  const handleSelectLevel = (level) => {
    setLevel(level);
  };

  return (
    <div className="screen active" id="level-screen">
      <div style={{ height: '20px' }}></div>
      <button className="btn btn-ghost" onClick={() => onNavigate('welcome-screen')}>← Back</button>
      <div style={{ height: '16px' }}></div>
      <div className="logo" style={{ fontSize: '2rem' }}>Choose Your Level</div>
      <div className="subtitle">Pick the right difficulty for you</div>
      <div className="level-grid">
        <div 
          className={`level-card ${state.level === 'beginner' ? 'selected' : ''}`} 
          onClick={() => handleSelectLevel('beginner')}
        >
          <div className="lc-emoji">🌱</div>
          <h3>Beginner</h3>
          <p>Age 5–7 · Short words<br/>Strong phonics help</p>
        </div>
        <div 
          className={`level-card ${state.level === 'intermediate' ? 'selected' : ''}`} 
          onClick={() => handleSelectLevel('intermediate')}
        >
          <div className="lc-emoji">🌿</div>
          <h3>Intermediate</h3>
          <p>Age 8–10 · Longer words<br/>Moderate hints</p>
        </div>
        <div 
          className={`level-card ${state.level === 'advanced' ? 'selected' : ''}`} 
          onClick={() => handleSelectLevel('advanced')}
        >
          <div className="lc-emoji">🌳</div>
          <h3>Advanced</h3>
          <p>Age 11+ · Complex words<br/>No hints!</p>
        </div>
      </div>
      <div style={{ height: '24px' }}></div>
      <button className="btn btn-coral" style={{ padding: '14px 44px', fontSize: '1.1rem' }} onClick={() => onNavigate('menu-screen')}>
        Let's Go! 🎮
      </button>
    </div>
  );
}
