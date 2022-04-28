enum STRINGS {
    PLAYER_N_WINS = 'Player {n} wins!',
    COLUMN_FULL = 'Column full!',
    GAME_FINISHED = 'Game has finished!',
    NEXT_TURN = 'Player {n} has a turn'
};

const DIRECTIONS = [
    [-1, 0], // UP
    [-1, 1], // UP_RIGHT
    [0, 1], // RIGHT
    [1, 1], // DOWN_RIGHT
    [1, 0], // DOWN
    [1, -1], // DOWN_LEFT
    [0, -1], // LEFT
    [-1 , -1] // UP_LEFT
];