import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 4) {
        setStep(step + 1);
      } else {
        // Auto-navigate to player setup after animation
        setTimeout(() => navigate("/setup"), 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, navigate]);

  const TicTacToeBoard = () => (
    <div className="relative w-24 h-24 mx-4">
      {/* Vertical lines in red */}
      <div className="absolute left-8 top-0 w-0.5 h-24 bg-game-red"></div>
      <div className="absolute right-8 top-0 w-0.5 h-24 bg-game-red"></div>
      
      {/* Horizontal lines */}
      <div className="absolute top-8 left-0 w-24 h-0.5 bg-white"></div>
      <div className="absolute bottom-8 left-0 w-24 h-0.5 bg-white"></div>
      
      {/* Winning horizontal line in red (middle row) */}
      <div className="absolute top-1/2 left-0 w-24 h-1 bg-game-red transform -translate-y-1/2"></div>
      
      {/* O's in the middle row (white) */}
      <div className="absolute top-1/2 left-2 w-4 h-4 rounded-full border-2 border-white transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-2 w-4 h-4 rounded-full border-2 border-white transform -translate-y-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold space-y-4">
          {step >= 1 && (
            <div className="text-white animate-fade-in">THINK</div>
          )}
          {step >= 2 && (
            <div className="text-white animate-fade-in">OUTSIDE</div>
          )}
          {step >= 3 && (
            <div className="flex items-center justify-center animate-fade-in">
              <span className="text-white">T</span>
              <span className="text-white">H</span>
              <span className="text-white">E</span>
              <TicTacToeBoard />
              <span className="text-white">B</span>
              <span className="text-white">O</span>
              <span className="text-white">X</span>
            </div>
          )}
          {step >= 4 && (
            <div className="text-white animate-fade-in">BOX</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;