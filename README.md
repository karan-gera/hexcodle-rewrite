# Hexcurrodle

A color guessing game where you try to match the target hex color in 6 tries or less. Think Wordle, but for hex colors!

## How to Play

1. Try to guess the target color in 6 tries or less
2. Enter hex color codes (e.g., ff0000 for red)
3. After each guess, you'll get feedback for RGB values:
   - ✓ = Exact match
   - ↑ = Increase by 1-5
   - ↑↑ = Increase by 6-15
   - ↑↑↑ = Increase by 16+
   - ↓ = Decrease by 1-5
   - ↓↓ = Decrease by 6-15
   - ↓↓↓ = Decrease by 16+

## Development

This project was built with React. To run it locally:

1. Clone the repository
2. Run `npm install`
3. Run `npm start`