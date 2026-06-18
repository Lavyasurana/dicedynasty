import GameCover from './GameCover'
import { heroGames } from '../data/siteData'

function HeroMosaic() {
  return (
    <div className="relative h-full min-h-svh w-full scale-[1.04] sm:scale-110">
      {heroGames.map((game, index) => (
        <GameCover
          className="h-[220px] w-[152px] sm:h-[clamp(220px,22vw,330px)] sm:w-[clamp(152px,15vw,230px)]"
          floating
          game={game}
          index={index}
          key={game.title}
        />
      ))}
    </div>
  )
}

export default HeroMosaic
