import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Player {
  name: string;
  race: string;
  dob: string;
  symbol: string;
  color: string;
}

const GameBoard = () => {
  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);

  useEffect(() => {
    // Load game data from sessionStorage
    const savedGridSize = sessionStorage.getItem('gridSize');
    const savedPlayer1 = sessionStorage.getItem('player1');
    const savedPlayer2 = sessionStorage.getItem('player2');

    if (!savedGridSize || !savedPlayer1 || !savedPlayer2) {
      navigate('/setup');
      return;
    }

    const size = parseInt(savedGridSize.split('x')[0]);
    setGridSize(size);
    setPlayer1(JSON.parse(savedPlayer1));
    setPlayer2(JSON.parse(savedPlayer2));

    // Initialize empty board
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(''));
    setBoard(newBoard);
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Skip turn when timer expires
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, gameOver]);

  const checkWinner = (board: string[][], row: number, col: number, symbol: string): boolean => {
    const size = board.length;
    
    // Check row
    let count = 0;
    for (let c = 0; c < size; c++) {
      if (board[row][c] === symbol) count++;
      else break;
    }
    if (count === size) return true;

    // Check column
    count = 0;
    for (let r = 0; r < size; r++) {
      if (board[r][col] === symbol) count++;
      else break;
    }
    if (count === size) return true;

    // Check main diagonal
    if (row === col) {
      count = 0;
      for (let i = 0; i < size; i++) {
        if (board[i][i] === symbol) count++;
        else break;
      }
      if (count === size) return true;
    }

    // Check anti-diagonal
    if (row + col === size - 1) {
      count = 0;
      for (let i = 0; i < size; i++) {
        if (board[i][size - 1 - i] === symbol) count++;
        else break;
      }
      if (count === size) return true;
    }

    return false;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col] !== '') return;

    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Check for winner
    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setGameOver(true);
      const winnerPlayer = currentPlayer === 'X' ? player1 : player2;
      setWinner(winnerPlayer?.name || currentPlayer);
    } else {
      // Switch turns
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setTimer(10);
    }
  };

  const getCellContent = (symbol: string) => {
    if (symbol === 'X') {
      return <span className="text-game-red text-4xl font-bold">X</span>;
    } else if (symbol === 'O') {
      return <span className="text-game-blue text-4xl font-bold">O</span>;
    }
    return null;
  };

  if (!player1 || !player2) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Player Info */}
      <div className="flex justify-between w-full max-w-4xl mb-8">
        <div className={`text-xl font-bold ${currentPlayer === 'X' ? 'text-game-red' : 'text-white'}`}>
          P1: {player1.name}
        </div>
        <div className={`text-xl font-bold ${currentPlayer === 'O' ? 'text-game-blue' : 'text-white'}`}>
          P2: {player2.name}
        </div>
      </div>

      {/* Game Board */}
      <div className="mb-8">
        <div 
          className="grid gap-1"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: `${Math.min(400, gridSize * 60)}px`,
            height: `${Math.min(400, gridSize * 60)}px`
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="bg-transparent border border-white flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{ 
                  width: `${Math.min(60, 400 / gridSize)}px`,
                  height: `${Math.min(60, 400 / gridSize)}px`
                }}
              >
                {getCellContent(cell)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Timer */}
      <div className="text-2xl font-bold text-white mb-8">
        Timer: {timer}s
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-4">
            Game Over! {winner} Wins!
          </div>
          <button
            onClick={() => navigate('/grid-selection')}
            className="px-6 py-3 bg-game-red text-white font-bold rounded hover:bg-red-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;