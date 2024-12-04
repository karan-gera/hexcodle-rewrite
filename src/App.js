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
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getColorName = (hex) => {
    const colorNames = {
      '#000000': 'black',
      '#000080': 'navy',
      '#00008B': 'darkblue',
      '#0000CD': 'mediumblue',
      '#0000FF': 'blue',
      '#006400': 'darkgreen',
      '#008000': 'green',
      '#008080': 'teal',
      '#008B8B': 'darkcyan',
      '#00BFFF': 'deepskyblue',
      '#00CED1': 'darkturquoise',
      '#00FA9A': 'mediumspringgreen',
      '#00FF00': 'lime',
      '#00FF7F': 'springgreen',
      '#00FFFF': 'cyan',
      '#191970': 'midnightblue',
      '#1E90FF': 'dodgerblue',
      '#20B2AA': 'lightseagreen',
      '#228B22': 'forestgreen',
      '#2E8B57': 'seagreen',
      '#2F4F4F': 'darkslategray',
      '#32CD32': 'limegreen',
      '#3CB371': 'mediumseagreen',
      '#40E0D0': 'turquoise',
      '#4169E1': 'royalblue',
      '#4682B4': 'steelblue',
      '#483D8B': 'darkslateblue',
      '#48D1CC': 'mediumturquoise',
      '#4B0082': 'indigo',
      '#556B2F': 'darkolivegreen',
      '#5F9EA0': 'cadetblue',
      '#6495ED': 'cornflowerblue',
      '#663399': 'rebeccapurple',
      '#66CDAA': 'mediumaquamarine',
      '#696969': 'dimgray',
      '#6A5ACD': 'slateblue',
      '#6B8E23': 'olivedrab',
      '#708090': 'slategray',
      '#778899': 'lightslategray',
      '#7B68EE': 'mediumslateblue',
      '#7CFC00': 'lawngreen',
      '#7FFF00': 'chartreuse',
      '#7FFFD4': 'aquamarine',
      '#800000': 'maroon',
      '#800080': 'purple',
      '#808000': 'olive',
      '#808080': 'gray',
      '#87CEEB': 'skyblue',
      '#87CEFA': 'lightskyblue',
      '#8A2BE2': 'blueviolet',
      '#8B0000': 'darkred',
      '#8B008B': 'darkmagenta',
      '#8B4513': 'saddlebrown',
      '#8FBC8F': 'darkseagreen',
      '#90EE90': 'lightgreen',
      '#9370DB': 'mediumpurple',
      '#9400D3': 'darkviolet',
      '#98FB98': 'palegreen',
      '#9932CC': 'darkorchid',
      '#9ACD32': 'yellowgreen',
      '#A0522D': 'sienna',
      '#A52A2A': 'brown',
      '#A9A9A9': 'darkgray',
      '#ADD8E6': 'lightblue',
      '#ADFF2F': 'greenyellow',
      '#AFEEEE': 'paleturquoise',
      '#B0C4DE': 'lightsteelblue',
      '#B0E0E6': 'powderblue',
      '#B22222': 'firebrick',
      '#B8860B': 'darkgoldenrod',
      '#BA55D3': 'mediumorchid',
      '#BC8F8F': 'rosybrown',
      '#BDB76B': 'darkkhaki',
      '#C0C0C0': 'silver',
      '#C71585': 'mediumvioletred',
      '#CD5C5C': 'indianred',
      '#CD853F': 'peru',
      '#D2691E': 'chocolate',
      '#D2B48C': 'tan',
      '#D3D3D3': 'lightgray',
      '#D8BFD8': 'thistle',
      '#DA70D6': 'orchid',
      '#DAA520': 'goldenrod',
      '#DB7093': 'palevioletred',
      '#DC143C': 'crimson',
      '#DCDCDC': 'gainsboro',
      '#DDA0DD': 'plum',
      '#DEB887': 'burlywood',
      '#E0FFFF': 'lightcyan',
      '#E6E6FA': 'lavender',
      '#E9967A': 'darksalmon',
      '#EE82EE': 'violet',
      '#EEE8AA': 'palegoldenrod',
      '#F08080': 'lightcoral',
      '#F0E68C': 'khaki',
      '#F0F8FF': 'aliceblue',
      '#F0FFF0': 'honeydew',
      '#F0FFFF': 'azure',
      '#F4A460': 'sandybrown',
      '#F5DEB3': 'wheat',
      '#F5F5DC': 'beige',
      '#F5F5F5': 'whitesmoke',
      '#F5FFFA': 'mintcream',
      '#F8F8FF': 'ghostwhite',
      '#FA8072': 'salmon',
      '#FAEBD7': 'antiquewhite',
      '#FAF0E6': 'linen',
      '#FAFAD2': 'lightgoldenrodyellow',
      '#FDF5E6': 'oldlace',
      '#FF0000': 'red',
      '#FF00FF': 'magenta',
      '#FF1493': 'deeppink',
      '#FF4500': 'orangered',
      '#FF6347': 'tomato',
      '#FF69B4': 'hotpink',
      '#FF7F50': 'coral',
      '#FF8C00': 'darkorange',
      '#FFA07A': 'lightsalmon',
      '#FFA500': 'orange',
      '#FFB6C1': 'lightpink',
      '#FFC0CB': 'pink',
      '#FFD700': 'gold',
      '#FFDAB9': 'peachpuff',
      '#FFDEAD': 'navajowhite',
      '#FFE4B5': 'moccasin',
      '#FFE4C4': 'bisque',
      '#FFE4E1': 'mistyrose',
      '#FFEBCD': 'blanchedalmond',
      '#FFEFD5': 'papayawhip',
      '#FFF0F5': 'lavenderblush',
      '#FFF5EE': 'seashell',
      '#FFF8DC': 'cornsilk',
      '#FFFACD': 'lemonchiffon',
      '#FFFAF0': 'floralwhite',
      '#FFFAFA': 'snow',
      '#FFFF00': 'yellow',
      '#FFFFE0': 'lightyellow',
      '#FFFFF0': 'ivory',
      '#FFFFFF': 'white'
    };
    
    return colorNames[hex.toUpperCase()] || null;
  };

  const getFeedback = (guessColor, targetColor) => {
    const guess = hexToRgb(guessColor);
    const target = hexToRgb(targetColor);
    
    if (!guess || !target) return { r: null, g: null, b: null };

    const getFeedbackSymbol = (guessVal, targetVal) => {
      const diff = Math.abs(guessVal - targetVal);
      if (guessVal === targetVal) return '✓';
      if (diff <= 5) return guessVal < targetVal ? '↑' : '↓';
      if (diff <= 15) return guessVal < targetVal ? '↑↑' : '↓↓';
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
    
    setGuessHistory(prev => [{
      color: newHexColor,
      feedback: newFeedback
    }, ...prev]);
    
    setInputValue('');

    if (newHexColor === targetColor) {
      setGameOver(true);
      setGuessesLeft(prev => prev - 1);
    } else if (guessesLeft <= 1) {
      setGameOver(true);
      setGuessesLeft(0);
    } else {
      setGuessesLeft(prev => prev - 1);
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
    setGuessesLeft(6);
    setGameOver(false);
    setGuessHistory([]);
  };

  return (
    <div className="App">
      <h1 className="game-title">HEXCURRODLE</h1>
      <button 
        className="instructions-button"
        onClick={() => setShowInstructions(true)}
      >
        ?
      </button>

      {showInstructions && (
        <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>How to Play</h2>
            <ul>
              <li>Try to guess the target color in 6 tries or less</li>
              <li>Enter hex color codes (e.g., ff0000 for red)</li>
              <li>After each guess, you'll get feedback for RGB values:</li>
              <li className="symbol">✓ = Exact match</li>
              <li className="symbol">↑ = Increase by 1-5</li>
              <li className="symbol">↑↑ = Increase by 6-15</li>
              <li className="symbol">↑↑↑ = Increase by 16+</li>
              <li className="divider">or</li>
              <li className="symbol">↓ = Decrease by 1-5</li>
              <li className="symbol">↓↓ = Decrease by 6-15</li>
              <li className="symbol">↓↓↓ = Decrease by 16+</li>
            </ul>
            <button 
              className="modal-close"
              onClick={() => setShowInstructions(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="game-info">
        <div className="guesses-left">Guesses Left: {guessesLeft}</div>
        {gameOver && (
          <div className={`game-over ${hexColor === targetColor ? 'win' : 'lose'}`}>
            {hexColor === targetColor 
              ? `You won with ${6 - guessesLeft} ${6 - guessesLeft === 1 ? 'guess' : 'guesses'}!${
                  getColorName(targetColor) ? ` You found ${getColorName(targetColor)}!` : ''
                }` 
              : `Game Over! The color was ${targetColor}${
                  getColorName(targetColor) ? ` (${getColorName(targetColor)})` : ''
                }`
            }
          </div>
        )}
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
                  animationDelay: `${index * 50}ms`,
                  borderColor: guess.color
                }}
              >
                <div 
                  className="history-color" 
                  style={{ backgroundColor: guess.color }}
                />
                <span className="history-hex">{guess.color}</span>
                <div className="history-feedback">
                  <span>{guess.feedback.r}</span>
                  <span>{guess.feedback.g}</span>
                  <span>{guess.feedback.b}</span>
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
