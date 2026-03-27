import React from 'react';
import { useGame } from '../store/GameContext';
import { ACHIEVEMENTS } from '../data/achievements';

export default function DashboardScreen({ onNavigate }) {
  const { state, accuracy } = useGame();

  return (
    <div className="screen active" id="dashboard-screen">
      <div style={{ width: '100%', maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={() => onNavigate('menu-screen')}>← Back</button>
          <div style={{ fontFamily: 'var(--font)', fontSize: '1.5rem', color: 'var(--text)' }}>📊 My Progress</div>
        </div>
        <div className="dash-grid">
          <div className="dash-card">
            <div className="dash-big">{state.xp}</div>
            <div className="dash-lbl">⭐ Total XP</div>
          </div>
          <div className="dash-card">
            <div className="dash-big">{state.playerLevel}</div>
            <div className="dash-lbl">🏆 Level</div>
          </div>
          <div className="dash-card">
            <div className="dash-big">{accuracy}%</div>
            <div className="dash-lbl">🎯 Accuracy</div>
          </div>
          <div className="dash-card">
            <div className="dash-big">{state.bestStreak}</div>
            <div className="dash-lbl">🔥 Best Streak</div>
          </div>
          <div className="dash-card">
            <div className="dash-big">{state.learnedWords.size}</div>
            <div className="dash-lbl">📚 Words Practiced</div>
          </div>
          <div className="dash-card">
            <div className="dash-big">{state.masteredWords.size}</div>
            <div className="dash-lbl">✅ Mastered</div>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--text-lt)', margin: '18px 0 8px' }}>
          🏅 Achievements:
        </div>
        <div className="badge-grid">
          {ACHIEVEMENTS.map(ach => {
            const earned = ach.check(state);
            return (
              <div key={ach.id} className={`badge ${earned ? 'earned' : ''}`} title={ach.desc}>
                {ach.icon} {ach.label}
              </div>
            );
          })}
        </div>
        <div style={{ height: '14px' }}></div>
        <button className="btn btn-coral" style={{ width: '100%' }} onClick={() => onNavigate('menu-screen')}>Back to Menu</button>
      </div>
    </div>
  );
}
