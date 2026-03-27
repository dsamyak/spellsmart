import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../store/GameContext';
import { useTTS } from '../hooks/useTTS';
import { WORDS } from '../data/words';

export default function Game2DragDrop({ onExit }) {
  const { state, addXP, onCorrect, onWrong, markLearned } = useGame();
  const { speak, cancel } = useTTS();
  
  const [currentWord, setCurrentWord] = useState(null);
  const [tiles, setTiles] = useState([]); // { id, char, type }
  const [slots, setSlots] = useState([]); // { expected, currentTileId, status }
  const [score, setScore] = useState(0);
  const [totalRounds] = useState(5);
  const [round, setRound] = useState(0);
  const [draggedId, setDraggedId] = useState(null);

  const loadNewWord = useCallback(() => {
    const wordList = WORDS[state.level];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    
    const chars = nextWord.word.split('');
    const newSlots = chars.map(c => ({ expected: c, currentTileId: null, status: 'empty' }));
    
    // Create jumbled tiles
    const newTiles = chars.map((c, i) => ({
      id: `tile-${i}`,
      char: c,
      type: ['A','E','I','O','U'].includes(c) ? 'vowel' : 'consonant'
    })).sort(() => Math.random() - 0.5);
    
    setSlots(newSlots);
    setTiles(newTiles);
    
    setTimeout(() => {
      speak(nextWord.word);
    }, 300);
  }, [state.level, speak]);

  useEffect(() => {
    loadNewWord();
    return () => cancel();
  }, [loadNewWord, cancel]);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small timeout to allow the drag visual to capture the element before ghosting
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggedId(null);
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('over');
  };

  const handleDropSlot = (e, slotIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('over');
    if (!draggedId) return;

    // Check if slot already has a tile
    if (slots[slotIndex].currentTileId) {
      // Return that tile to pool (handled by swapping logic if needed, but for simplicity we swap or prevent)
      // Let's just simply place the new one and remove the old one back to pool by updating state.
    }
    
    setSlots(prev => {
      const newSlots = [...prev];
      // remove from old slot if dragged from another slot
      const oldSlotIndex = newSlots.findIndex(s => s.currentTileId === draggedId);
      if (oldSlotIndex !== -1) {
         newSlots[oldSlotIndex].currentTileId = newSlots[slotIndex].currentTileId;
      }
      newSlots[slotIndex].currentTileId = draggedId;
      newSlots[slotIndex].status = 'filled';
      return newSlots;
    });
  };

  const handleDropPool = (e) => {
    e.preventDefault();
    if (!draggedId) return;
    // remove from slot
    setSlots(prev => {
      const newSlots = [...prev];
      const oldSlotIndex = newSlots.findIndex(s => s.currentTileId === draggedId);
      if (oldSlotIndex !== -1) {
        newSlots[oldSlotIndex].currentTileId = null;
        newSlots[oldSlotIndex].status = 'empty';
      }
      return newSlots;
    });
  };

  const handleCheck = () => {
    let allFilled = slots.every(s => s.currentTileId);
    if (!allFilled) return;

    let allCorrect = true;
    const newSlots = slots.map(slot => {
      const tile = tiles.find(t => t.id === slot.currentTileId);
      if (tile && tile.char === slot.expected) {
        return { ...slot, status: 'correct-slot' };
      } else {
        allCorrect = false;
        return { ...slot, status: 'wrong-slot' };
      }
    });

    setSlots(newSlots);

    if (allCorrect) {
      onCorrect();
      addXP(15 + state.streak * 2);
      markLearned(currentWord.word);
      setScore(s => s + 1);
      
      setTimeout(() => {
        if (round < totalRounds - 1) {
          setRound(r => r + 1);
          loadNewWord();
        } else {
          onExit();
        }
      }, 1200);
    } else {
      onWrong();
      // Reset after a moment
      setTimeout(() => {
        setSlots(slots.map(s => ({ ...s, status: s.currentTileId ? 'filled' : 'empty' })));
      }, 800);
    }
  };

  const handleReset = () => {
    setSlots(slots.map(s => ({ ...s, currentTileId: null, status: 'empty' })));
  };

  const handleSkip = () => {
    if (round < totalRounds - 1) {
      setRound(r => r + 1);
      loadNewWord();
    } else {
      onExit();
    }
  };

  if (!currentWord) return null;

  return (
    <div className="screen active" style={{ width: '100%', maxWidth: '600px' }}>
      <div className="hud">
        <button className="btn btn-ghost" onClick={() => { cancel(); onExit(); }}>← Back</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="hud-chip"><span className="ic">⭐</span><span>{state.xp}</span></div>
          <div className="hud-chip"><span className="ic">🎯</span><span>{score}/{totalRounds}</span></div>
        </div>
      </div>
      
      <div className="game-arena">
        <div style={{ textAlign: 'center', fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--text-lt)', marginBottom: '6px' }}>
          🔀 Arrange the letters to spell:
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '8px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="listen-btn" onClick={() => speak(currentWord.word)}><span className="speaker-icon">🔊</span> Hear It</button>
          <div className="word-hint">{currentWord.hint}</div>
        </div>
        
        <div style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text-lt)', textAlign: 'center', marginBottom: '8px' }}>Drop letters here:</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', minHeight: '64px' }}>
          {slots.map((slot, i) => {
            const tile = slot.currentTileId ? tiles.find(t => t.id === slot.currentTileId) : null;
            return (
              <div 
                key={i} 
                className={`drop-slot ${slot.status}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDropSlot(e, i)}
              >
                {tile && (
                  <div 
                    className="letter-tile" 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, tile.id)}
                    onDragEnd={handleDragEnd}
                    data-type={tile.type}
                  >
                    {tile.char}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{ borderTop: '2px dashed var(--border)', margin: '16px 0' }}></div>
        <div style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text-lt)', textAlign: 'center', marginBottom: '8px' }}>Letter tiles:</div>
        
        <div 
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', minHeight: '64px', padding: '10px', background: '#FAFAFA', borderRadius: '14px' }}
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={handleDropPool}
        >
          {tiles.map(tile => {
            const isPlaced = slots.some(s => s.currentTileId === tile.id);
            if (isPlaced) return <div key={tile.id} style={{ width: 52, height: 52 }} />; // Placeholder to maintain layout
            return (
              <div 
                key={tile.id}
                className="letter-tile" 
                draggable 
                onDragStart={(e) => handleDragStart(e, tile.id)}
                onDragEnd={handleDragEnd}
                data-type={tile.type}
              >
                {tile.char}
              </div>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-teal" onClick={handleCheck}>Check ✓</button>
          <button className="btn btn-outline" onClick={handleReset}>Reset 🔄</button>
          <button className="btn btn-outline" onClick={handleSkip}>Skip →</button>
        </div>
      </div>
    </div>
  );
}
