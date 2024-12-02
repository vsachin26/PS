import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import QuizGame from './components/QuizGame';
import EnterNamePage from './components/EnterNamePage';
import LoginPage from './components/LoginPage';
import About from './components/About';
import AnalysisPage from './components/AnalysisPage';
import FileUpload from './components/FileUpload';
import './App.css';

// Component to conditionally show Navbar based on the route
function ConditionalNavbar() {
  const location = useLocation();
  const showNavbar = location.pathname === '/'; // Show Navbar only on the LandingPage
  return showNavbar ? <Navbar /> : null;
}

function App() {
  const [playerName, setPlayerName] = useState(''); // Store the player's name
  const [isPlaying, setIsPlaying] = useState(false); // Store whether the quiz is active

  const handlePlayNow = () => {
    setIsPlaying(true); // Redirect to EnterNamePage
  };

  return (
    <Router>
      <div className="app">
        <ConditionalNavbar />
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={<LandingPage onPlayNow={handlePlayNow} />}
          />
          
          {/* Enter Name Route */}
          <Route
            path="/enter-name"
            element={isPlaying ? (
              <EnterNamePage setPlayerName={setPlayerName} />
            ) : (
              <Navigate to="/" replace />
            )}
          />

          {/* Quiz Game Route */}
          <Route
            path="/quiz"
            element={playerName ? (
              <QuizGame playerName={playerName} />
            ) : (
              <div className="error-message">Please enter your name first.</div>
            )}
          />

          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* About Page Route */}
          <Route path="/about" element={<About />} />

          {/* Analysis Page Route */}
          <Route path="/analysis" element={<AnalysisPage />} />

          {/* Fallback for 404 Not Found */}
          <Route path="*" element={<div className="error-page">404 - Page Not Found</div>} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
