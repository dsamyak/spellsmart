import React from 'react';
import { useGame } from '../store/GameContext';

export default function MenuScreen({ onNavigate, onStartGame }) {
  const { state, xpForNext } = useGame();
  
  const xpPercent = Math.min((state.xp / xpForNext) * 100, 100);

  const getLevelBadge = () => {
    if (state.level === 'beginner') return { bg: '#FFF0F0', border: '#FFCDD2', color: 'var(--coral)', text: '🌱 Beginner' };
    if (state.level === 'advanced') return { bg: '#E6FAF8', border: '#C2F0EA', color: '#00B894', text: '🌳 Advanced' };
    return { bg: '#F3F0FF', border: '#DDD6FE', color: 'var(--purple)', text: '🌿 Intermediate' };
  };
  const badgeStyle = getLevelBadge();

  return (
    <div className="screen active" id="menu-screen">
      <div style={{ width: '100%', maxWidth: '780px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div className="logo" style={{ fontSize: '1.6rem' }}>📚 SpellSmart</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp} XP</span></div>
            <div className="hud-chip"><span className="ic">🏅</span>Lv.<span>{state.playerLevel}</span></div>
            <div className="hud-chip"><span className="ic">🔥</span><span>{state.streak}</span></div>
            <div className="hud-chip" style={{ background: badgeStyle.bg, borderColor: badgeStyle.border, color: badgeStyle.color }}>
              {badgeStyle.text}
            </div>
          </div>
        </div>
        
        <div className="xp-wrap" style={{ maxWidth: '100%', marginBottom: '18px' }}>
          <div className="xp-fill" style={{ width: `${xpPercent}%` }}></div>
        </div>
        
        <div style={{ fontFamily: 'var(--font)', fontWeight: 400, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '10px' }}>
          🎮 Choose a Game:
        </div>
        
        <div className="games-grid">
          <div className="game-card" onClick={() => onStartGame(1)}>
            <div className="gc-icon">🎧</div><h4>Hear &amp; Type</h4>
            <div className="gc-tag" style={{ background: '#E3F5FF', color: '#0984E3' }}>Listen · Type</div>
          </div>
          <div className="game-card" onClick={() => onStartGame(2)}>
            <div className="gc-icon">🔀</div><h4>Drag the Letters</h4>
            <div className="gc-tag" style={{ background: '#FFF0F0', color: 'var(--coral)' }}>Drag · Drop</div>
          </div>
          <div className="game-card" onClick={() => onStartGame(3)}>
            <div className="gc-icon">🔡</div><h4>Missing Letter</h4>
            <div className="gc-tag" style={{ background: '#F3F0FF', color: 'var(--purple)' }}>Fill Blanks</div>
          </div>
          <div className="game-card" onClick={() => onStartGame(4)}>
            <div className="gc-icon">🧱</div><h4>Phonics Builder</h4>
            <div className="gc-tag" style={{ background: '#E6FAF8', color: '#00B894' }}>Build Words</div>
          </div>
          <div className="game-card" onClick={() => onStartGame(5)}>
            <div className="gc-icon">🏃</div><h4>Spell Runner</h4>
            <div className="gc-tag" style={{ background: '#FFFBEE', color: '#E17055' }}>Speed Run</div>
          </div>
          <div className="game-card" onClick={() => onStartGame(6)}>
            <div className="gc-icon">🎤</div><h4>Voice Repeat</h4>
            <div className="gc-tag" style={{ background: '#FFF0F7', color: 'var(--pink)' }}>Say It!</div>
          </div>
          <div className="game-card" style={{ borderColor: 'var(--yellow)' }} onClick={() => onNavigate('learn-screen')}>
            <div className="gc-icon">📖</div><h4>Learn Mode</h4>
            <div className="gc-tag" style={{ background: '#FFFBEE', color: '#E17055' }}>Practice</div>
          </div>
        </div>
        
        <div style={{ height: '16px' }}></div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" onClick={() => onNavigate('dashboard-screen')}>📊 Dashboard</button>
          <button className="btn btn-outline" onClick={() => onNavigate('level-screen')}>🎚️ Change Level</button>
        </div>
      </div>
    </div>
  );
}
