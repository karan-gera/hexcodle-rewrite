import { useState } from 'react';
import './App.css';

function App() {
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };

  const [hexColor, setHexColor] = useState('#000000');
  const [inputValue, setInputValue] = useState('');
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [feedback, setFeedback] = useState({ r: null, g: null, b: null });
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getFeedback = (guessColor, targetColor) => {
    const guess = hexToRgb(guessColor);
    const target = hexToRgb(targetColor);
    
    if (!guess || !target) return { r: null, g: null, b: null };

    const getFeedbackSymbol = (guessVal, targetVal) => {
      const diff = Math.abs(guessVal - targetVal);
      if (guessVal === targetVal) return '✓';
      if (diff <= 5) return guessVal < targetVal ? '↑' : '↓';
      if (diff <= 10) return guessVal < targetVal ? '↑↑' : '↓↓';
      return guessVal < targetVal ? '↑↑↑' : '↓↓↓';
    };

    return {
      r: getFeedbackSymbol(guess.r, target.r),
      g: getFeedbackSymbol(guess.g, target.g),
      b: getFeedbackSymbol(guess.b, target.b)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver || guessesLeft <= 0) return;

    const newHexColor = `#${inputValue}`;
    setHexColor(newHexColor);
    const newFeedback = getFeedback(newHexColor, targetColor);
    setFeedback(newFeedback);
    setGuessesLeft(prev => prev - 1);
    
    setGuessHistory(prev => [{
      color: newHexColor,
      feedback: newFeedback
    }, ...prev]);
    
    setInputValue('');

    if (newHexColor === targetColor || guessesLeft === 1) {
      setGameOver(true);
    }
  };

  const handleInputChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setInputValue(cleaned);
  };

  const handleNewColor = () => {
    setTargetColor(generateRandomColor());
    setHexColor('#000000');
    setInputValue('');
    setFeedback({ r: null, g: null, b: null });
    setGuessesLeft(5);
    setGameOver(false);
    setGuessHistory([]);
  };

  return (
    <div className="App">
      <h1 className="game-title">HEXCURRODLE</h1>
      <div className="game-info">
        <div className="guesses-left">Guesses Left: {guessesLeft}</div>
        {gameOver && <div className="game-over">
          {hexColor === targetColor ? "You won!" : `Game Over! The color was ${targetColor}`}
        </div>}
      </div>

      <div className="squares-container">
        <div className="square-wrapper">
          <div className="square-label">Target</div>
          <div
            className="color-square"
            style={{ backgroundColor: targetColor }}
          />
        </div>
        <div className="square-wrapper">
          <div className="square-label">Your Guess</div>
          <div
            className="color-square"
            style={{ backgroundColor: hexColor }}
          />
        </div>
      </div>
      
      <div className="feedback-container">
        <div className="feedback-item">
          <span className="channel">R</span>
          <span className="value">{feedback.r || '-'}</span>
        </div>
        <div className="feedback-item">
          <span className="channel">G</span>
          <span className="value">{feedback.g || '-'}</span>
        </div>
        <div className="feedback-item">
          <span className="channel">B</span>
          <span className="value">{feedback.b || '-'}</span>
        </div>
      </div>

      <form className="color-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="hex-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="ff0000"
          disabled={gameOver}
        />
        <button type="submit" className="submit-button" disabled={gameOver}>
          Submit
        </button>
      </form>

      {guessHistory.length > 0 && (
        <div className="guess-history">
          <h3>Previous Guesses</h3>
          <div className="history-list">
            {guessHistory.map((guess, index) => (
              <div 
                key={index} 
                className="history-item"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div 
                  className="history-color" 
                  style={{ backgroundColor: guess.color }}
                />
                <span className="history-hex">{guess.color}</span>
                <div className="history-feedback">
                  <span>R: {guess.feedback.r}</span>
                  <span>G: {guess.feedback.g}</span>
                  <span>B: {guess.feedback.b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleNewColor} className="reload-button">
        New Color
      </button>
    </div>
  );
}

export default App;
