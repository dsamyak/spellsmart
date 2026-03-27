import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [state, setState] = useState({
    level: 'intermediate',
    xp: 0,
    playerLevel: 1,
    streak: 0,
    bestStreak: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    learnedWords: new Set(),
    masteredWords: new Set(),
  });

  const accuracy = state.totalAnswered === 0 ? 0 : Math.round((state.totalCorrect / state.totalAnswered) * 100);
  const xpForNext = state.playerLevel * 150;

  const addXP = (amount) => {
    setState(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.playerLevel;
      // Loop to handle multiple level-ups at once
      while (newXp >= newLevel * 150) {
        newXp -= newLevel * 150;
        newLevel++;
      }
      return { ...prev, xp: newXp, playerLevel: newLevel };
    });
  };

  const onCorrect = () => {
    setState(prev => {
      const newStreak = prev.streak + 1;
      return {
        ...prev,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        totalCorrect: prev.totalCorrect + 1,
        totalAnswered: prev.totalAnswered + 1
      };
    });
  };

  const onWrong = () => {
    setState(prev => ({
      ...prev,
      streak: 0,
      totalAnswered: prev.totalAnswered + 1
    }));
  };

  const markLearned = (word) => {
    setState(prev => {
      const next = new Set(prev.learnedWords);
      next.add(word);
      return { ...prev, learnedWords: next };
    });
  };

  const markMastered = (word) => {
    setState(prev => {
      const next = new Set(prev.masteredWords);
      next.add(word);
      return { ...prev, masteredWords: next };
    });
  };

  const setLevel = (level) => {
    setState(prev => ({ ...prev, level }));
  };

  const resetStreak = () => {
    setState(prev => ({ ...prev, streak: 0 }));
  }

  const value = {
    state,
    accuracy,
    xpForNext,
    addXP,
    onCorrect,
    onWrong,
    markLearned,
    markMastered,
    setLevel,
    resetStreak
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
