import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Player {
  name: string;
  race: string;
  dob: string;
}

const PlayerSetup = () => {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState<Player>({ name: "", race: "", dob: "" });
  const [player2, setPlayer2] = useState<Player>({ name: "", race: "", dob: "" });

  const handleStart = () => {
    // Store player data in sessionStorage for now
    sessionStorage.setItem('player1', JSON.stringify({ ...player1, symbol: 'X', color: 'red' }));
    sessionStorage.setItem('player2', JSON.stringify({ ...player2, symbol: 'O', color: 'blue' }));
    navigate('/grid-selection');
  };

  const isFormValid = player1.name && player1.race && player1.dob && 
                     player2.name && player2.race && player2.dob;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Player 1 (X - Red) */}
          <div className="bg-black border-2 border-game-red p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-game-red mb-2">X</div>
              <div className="text-2xl font-bold text-game-red">Player 1</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-game-red font-medium mb-2">Name:</label>
                <Input
                  value={player1.name}
                  onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
                  className="bg-input border-game-red text-white placeholder:text-gray-400"
                  placeholder="Enter name"
                />
              </div>
              
              <div>
                <label className="block text-game-red font-medium mb-2">Race:</label>
                <Input
                  value={player1.race}
                  onChange={(e) => setPlayer1({ ...player1, race: e.target.value })}
                  className="bg-input border-game-red text-white placeholder:text-gray-400"
                  placeholder="Enter race"
                />
              </div>
              
              <div>
                <label className="block text-game-red font-medium mb-2">DOB:</label>
                <Input
                  type="date"
                  value={player1.dob}
                  onChange={(e) => setPlayer1({ ...player1, dob: e.target.value })}
                  className="bg-input border-game-red text-white"
                />
              </div>
            </div>
          </div>

          {/* Player 2 (O - Blue) */}
          <div className="bg-black border-2 border-game-blue p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-game-blue mb-2">O</div>
              <div className="text-2xl font-bold text-game-blue">Player 2</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-game-blue font-medium mb-2">Name:</label>
                <Input
                  value={player2.name}
                  onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
                  className="bg-input border-game-blue text-white placeholder:text-gray-400"
                  placeholder="Enter name"
                />
              </div>
              
              <div>
                <label className="block text-game-blue font-medium mb-2">Race:</label>
                <Input
                  value={player2.race}
                  onChange={(e) => setPlayer2({ ...player2, race: e.target.value })}
                  className="bg-input border-game-blue text-white placeholder:text-gray-400"
                  placeholder="Enter race"
                />
              </div>
              
              <div>
                <label className="block text-game-blue font-medium mb-2">DOB:</label>
                <Input
                  type="date"
                  value={player2.dob}
                  onChange={(e) => setPlayer2({ ...player2, dob: e.target.value })}
                  className="bg-input border-game-blue text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleStart}
            disabled={!isFormValid}
            className="px-12 py-3 text-xl font-bold bg-game-red hover:bg-red-600 text-white disabled:opacity-50"
          >
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;