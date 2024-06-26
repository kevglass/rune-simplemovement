import type { RuneClient } from "rune-games-sdk/multiplayer"

const MOVE_SPEED = 3;

export interface GameState {
  y: number;
  up: boolean;
  down: boolean;
}

type GameActions = {
  controls: (params: {up: boolean, down: boolean}) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  updatesPerSecond: 30,
  update: (context) => {
    if (context.game.up) {
      context.game.y -= MOVE_SPEED;
    }
    if (context.game.down) {
      context.game.y += MOVE_SPEED;
    }
  },
  setup: () => ({
    y: 50,
    up: false,
    down: false,
  }),
  actions: {
    controls: ({ up, down }, context) => {
      context.game.up = up;
      context.game.down = down;
    }
  },
})
