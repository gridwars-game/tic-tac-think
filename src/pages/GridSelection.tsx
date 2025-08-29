import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GridSelection = () => {
  const navigate = useNavigate();

  const handleGridSelection = (size: string) => {
    sessionStorage.setItem('gridSize', size);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="text-center">
        {/* Grid Options */}
        <div className="space-y-8 mb-16">
          <Button
            onClick={() => handleGridSelection('3x3')}
            className="block mx-auto px-16 py-6 text-4xl font-bold bg-transparent border-2 border-game-red text-game-red hover:bg-game-red hover:text-black transition-colors"
          >
            3x3
          </Button>
          
          <Button
            onClick={() => handleGridSelection('5x5')}
            className="block mx-auto px-16 py-6 text-4xl font-bold bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            5x5
          </Button>
          
          <Button
            onClick={() => handleGridSelection('9x9')}
            className="block mx-auto px-16 py-6 text-4xl font-bold bg-transparent border-2 border-game-blue text-game-blue hover:bg-game-blue hover:text-black transition-colors"
          >
            9x9
          </Button>
        </div>
      </div>

      {/* Top Right - Leaderboard */}
      <div className="absolute top-8 right-8">
        <Button
          onClick={() => navigate('/leaderboard')}
          className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black"
        >
          Leaderboard
        </Button>
      </div>

      {/* Bottom Right - Settings and History */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <Button
          onClick={() => navigate('/settings')}
          className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black"
        >
          Settings
        </Button>
        <Button
          onClick={() => navigate('/history')}
          className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black"
        >
          History
        </Button>
      </div>
    </div>
  );
};

export default GridSelection;