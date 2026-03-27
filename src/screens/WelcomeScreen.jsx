import React from 'react';

export default function WelcomeScreen({ onNavigate }) {
  return (
    <div className="screen active" id="welcome-screen">
      <div style={{ height: '32px' }}></div>
      <div style={{ fontSize: '3.5rem' }}>📚</div>
      <div className="logo" style={{ marginTop: '10px' }}>SpellSmart</div>
      <div className="subtitle">Learn Spelling with Phonics & Voice 🔊</div>
      <div style={{ height: '24px' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%', maxWidth: '320px' }}>
        <button className="btn btn-coral" style={{ width: '100%', fontSize: '1.15rem' }} onClick={() => onNavigate('level-screen')}>🚀 Start Playing</button>
        <button className="btn btn-purple" style={{ width: '100%', fontSize: '1.05rem' }} onClick={() => onNavigate('learn-screen')}>📘 Learn Words</button>
        <button className="btn btn-teal" style={{ width: '100%', fontSize: '1.05rem' }} onClick={() => onNavigate('dashboard-screen')}>📊 My Progress</button>
      </div>
      <div style={{ marginTop: '28px', fontSize: '0.85rem', color: 'var(--text-lt)', fontWeight: 600, textAlign: 'center' }}>
        🎯 Hear · Spell · Practice · Master!
      </div>
    </div>
  );
}
