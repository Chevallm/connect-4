import { DIRECTIONS, STRINGS, GameState } from './constants';
import { Direction, TokenLocation } from './types';

export class Connect4 {

    private readonly ROWS = 6;
    private readonly COLS = 7;
    private _grid: number[][] = [];
    private player = 1;
    private gameState = GameState.NOT_BEGAN;

  constructor() {      
    
  }

  get grid() {
    return this._grid;
  }
  
  start(): void {
    this._grid = [];
    for (let row = 0; row < this.ROWS; row++) {
      let row = [];
      for (let col = 0; col < this.COLS; col++) {
        row.push(0);
      }
      this._grid.push(row);
    }
    this.gameState = GameState.IN_PROGRESS;
  }

  play(column: number): string {
    if (this.gameState === GameState.FINISHED) {
      this.printGrid();
      console.log(STRINGS.GAME_FINISHED);
      return STRINGS.GAME_FINISHED;
    }
    const nextAvailableRowForColumn = this.getNextAvailableRowForColumn(column);
    if (nextAvailableRowForColumn < 0) {      
        this.printGrid();
        console.log(STRINGS.COLUMN_FULL);
        return STRINGS.COLUMN_FULL;
    }
    this.dropToken({row: nextAvailableRowForColumn, column});
    const consequence = this.getConsequences({row: nextAvailableRowForColumn, column});
    this.printGrid();
    console.log(consequence);
    return consequence;
  }

  /**
   * Return the row where is the last available cell for a column
   * @param column The tested column
   * @param row The cursor
   * @returns -1 if the column is full or a positive integer between 0 and COLS
   */
  private getNextAvailableRowForColumn(column: number, row = -1): number {
    const isTheLastCell = row+1 >= this.ROWS;
    if (isTheLastCell) {
        return row;
    }
    const isCellAvailable = this._grid[row+1][column] > 0;
    if (isCellAvailable) {
        return row;
    }
    return this.getNextAvailableRowForColumn(column, row + 1);
  }

  /**
   * Drop a token in the grid
   * @param column the column where the token is dropped
   * @param row the last row available for the column
   */
  private dropToken(location: TokenLocation): void {
    const {row, column} = location;
      this._grid[row][column] = this.player;
  }

  /**
   * Look over the grid, to know if the dropped token have a impact on the game.
   * It can be one of the strings available in STRINGS
   * @param dropedTokenRow 
   * @param dropedTokenColumn
   * @returns a phrase describing the consequences
   */
  private getConsequences(location: TokenLocation): string {
    for (let direction of DIRECTIONS) {
      if (this.hasFourInARow(location, direction)) {
        return this.end(this.player);
      }
    }
    if (this.isGridFull()) {
      this.end(0);
      return STRINGS.DRAW;
    } else {
      this.changePlayer();
      return STRINGS.NEXT_TURN.replace(STRINGS.PLAYER_TOKEN, (this.player).toString());
    }
  }

  /**
   * Return if the column is in the grid
   * @param row 
   * @param column 
   * @returns true if the column is in the grid else false
   */
  private isCellInbound(location: TokenLocation): boolean {
    const {row, column} = location;
    return (row >= 0 && row < this.ROWS) && (column >= 0 && column < this.COLS);
  }

  private hasFourInARow(location: TokenLocation, direction: Direction, chain = 0): boolean {
    if (chain === 4) {
      return true;
    }
    if (this.isCellInbound(location)) {
      if (this.currentPlayerOwnToken(location)) {
        chain++;
        const nextTokenLocation = this.getNextTokenLocation(location, direction);
        return this.hasFourInARow(nextTokenLocation, direction, chain);
      } else {
        return false;
      }
    }
    return false;
  }

  private currentPlayerOwnToken(location: TokenLocation): boolean {
    const {row, column} = location;
    return this._grid[row][column] === this.player;
  } 

  private getNextTokenLocation(location: TokenLocation, direction: Direction): TokenLocation {
    return {
      row: location.row + direction[0],
      column: location.column + direction[1]
    };
  }

  /**
   * Change the player, new turn. If the player was 1, change to 2, else change to 1.
   */
  private changePlayer(): void {
      this.player = this.player === 1 ? 2 : 1;
  }

  private isGridFull(): boolean {
    for (let column = 0; column < this.COLS; column++) {
      if (this.getNextAvailableRowForColumn(column) > -1) {
        return false;
      }
    }
    return true;
  }

  private end(winner: number): string {
    this.gameState = GameState.FINISHED;
    if (winner > 0) {
      console.log(STRINGS.PLAYER_N_WINS.replace(STRINGS.PLAYER_TOKEN, (this.player).toString()))
      return STRINGS.PLAYER_N_WINS.replace(STRINGS.PLAYER_TOKEN, (this.player).toString());
    } else {
      console.log(STRINGS.DRAW)
      return STRINGS.DRAW;
    }
  }

  private printGrid() {
    let string = '';
    for (let row of this._grid) {
      for (let col of row) {
        string += col > 0 ? col+'' : '-'
      }
      string += '\n';
    }
    console.log(string);
  }
}