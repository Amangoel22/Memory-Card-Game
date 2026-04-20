import { GameHeader } from './components/GameHeader'
import { Card } from './components/Card'
import { WinMessage } from './components/Win';
import { GameLogic } from './hooks/GameLogic';

const cardValues = [
  "🚀",
  "🏎",
  "🚑",
  "🚓",
  "🚕",
  "🚙",
  "🚜",
  "🛺",
  "🚀",
  "🏎",
  "🚑",
  "🚓",
  "🚕",
  "🚙",
  "🚜",
  "🛺",

]

function App() {

  const{cards, score, moves, isGameWon, handleCardClick, initializeCards} = GameLogic(cardValues);
  
  return <div className="app">
    <GameHeader score={score} moves={moves} onReset={initializeCards} />

    {isGameWon && <WinMessage moves={moves} />}

    <div className="cards-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </div>

  </div>
}

export default App
