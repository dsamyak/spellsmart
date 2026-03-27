import React, { useState } from 'react';
import './App.css';

// We will import screens as we create them. Right now, using placeholders.
import WelcomeScreen from './screens/WelcomeScreen';
import LevelScreen from './screens/LevelScreen';
import MenuScreen from './screens/MenuScreen';
import DashboardScreen from './screens/DashboardScreen';
import LearnScreen from './screens/LearnScreen';

// Games
import Game1HearType from './games/Game1HearType';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome-screen');
  const [currentGame, setCurrentGame] = useState(null);

  const navigate = (screen) => setCurrentScreen(screen);
  const startGame = (gameId) => {
    setCurrentGame(gameId);
    setCurrentScreen(`game${gameId}-screen`);
  };
  const exitGame = () => setCurrentScreen('menu-screen');

  return (
    <div className="app-container">
      {/* FULLSCREEN BUTTON (fixed, always visible) */}
      <button className="fs-btn" onClick={() => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
      }} title="Toggle Fullscreen">
        <svg className="icon-enter" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </button>

      {/* FLOATING LETTERS BG */}
      <div className="bg-letters">
        {/* We will add floating letters later */}
      </div>

      {currentScreen === 'welcome-screen' && <WelcomeScreen onNavigate={navigate} />}
      {currentScreen === 'level-screen' && <LevelScreen onNavigate={navigate} />}
      {currentScreen === 'menu-screen' && <MenuScreen onNavigate={navigate} onStartGame={startGame} />}
      {currentScreen === 'dashboard-screen' && <DashboardScreen onNavigate={navigate} />}
      {currentScreen === 'learn-screen' && <LearnScreen onNavigate={navigate} />}

      {currentScreen === 'game1-screen' && <Game1HearType onExit={exitGame} />}
      {/* We will add Game2, Game3, etc later */}
      
    </div>
  );
}

export default App;
