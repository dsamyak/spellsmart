export const ACHIEVEMENTS = [
  { id: 'first_word',   label: 'First Word',   icon: '🌱', desc: 'Practice your first word',      check: (state) => state.learnedWords.size >= 1 },
  { id: 'ten_words',    label: '10 Words',     icon: '📚', desc: 'Practice 10 different words',   check: (state) => state.learnedWords.size >= 10 },
  { id: 'all_words',    label: 'Word Master',  icon: '🏆', desc: 'Practice all words in a level', check: (state) => state.learnedWords.size >= 20 },
  { id: 'streak_3',     label: 'On Fire!',     icon: '🔥', desc: 'Get a 3-word streak',            check: (state) => state.bestStreak >= 3 },
  { id: 'streak_5',     label: 'Blazing!',     icon: '💥', desc: 'Get a 5-word streak',            check: (state) => state.bestStreak >= 5 },
  { id: 'xp_100',       label: 'XP Hunter',    icon: '⭐', desc: 'Earn 100 XP',                   check: (state) => state.xp >= 100 },
  { id: 'accuracy_80',  label: 'Sharp Mind',   icon: '🎯', desc: 'Reach 80% accuracy',             check: (state) => state.accuracy >= 80 },
  { id: 'level_3',      label: 'Level 3',      icon: '🚀', desc: 'Reach player level 3',           check: (state) => state.playerLevel >= 3 },
  { id: 'mastered_5',   label: '5 Mastered',   icon: '✅', desc: 'Master 5 words in Voice mode',  check: (state) => state.masteredWords.size >= 5 },
];
