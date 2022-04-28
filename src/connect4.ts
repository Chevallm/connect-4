export class Connect4 {

    grid: number[][] = [];
    private readonly ROWS = 6;
    private readonly COLS = 7;
    private player = 1;

  constructor() {      
    this.grid = [];
    for (let row = 0; row < this.ROWS; row++) {
      let row = [];
      for (let col = 0; col < this.COLS; col++) {
        row.push(0);
      }
      this.grid.push(row);
    }
  }

  play(column: number): string{
    const nextAvailableRowForColumn = this.getNextAvailableRowForColumn(column);
    if (nextAvailableRowForColumn < 0) {
        return STRINGS.COLUMN_FULL;
    }
    this.dropToken(column, nextAvailableRowForColumn);
    const consequence = this.getConsequences(nextAvailableRowForColumn, column);
    return '';
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
    const isCellAvailable = this.grid[row+1][column] > 0;
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
  private dropToken(column: number, row: number): void {
      this.grid[row][column] = this.player;
  }

  /**
   * Look over the grid, to know if the dropped token have a impact on the game.
   * It can be one of the strings available in STRINGS
   * @param dropedTokenRow 
   * @param dropedTokenColumn
   * @returns a phrase describing the consequences
   */
  private getConsequences(droppedTokenRow: number, droppedTokenColumn: number): STRINGS {
      for (let direction of DIRECTIONS) {
        for (let it = 0; it < 4; it++) {
            const nextRow = droppedTokenRow + (direction[0] * it);
            const nextColumn = droppedTokenColumn + (direction[1] * it);
            if (this.isCellInbound(direction[0], direction[1])) {
            
            }
            continue;
        }
      }

    return STRINGS.COLUMN_FULL;
  }

  /**
   * Return if the column is in the grid
   * @param row 
   * @param column 
   * @returns true if the column is in the grid else false
   */
  private isCellInbound(row: number, column: number): boolean {
    return (row < 0 || row > this.ROWS) || (column < 0 || column > this.COLS);
  }

  /**
   * Change the player, new turn. If the player was 1, change to 2, else change to 1.
   */
  private changePlayer(): void {
      this.player = this.player === 1 ? 2 : 1;
  }
}

new Connect4().play(0);