import { Connect4 } from "../core/connect4";

export class UIManager {

    game: Connect4 | undefined;

    constructor() {

    }

    draw() {
        if (!this.game) {
            throw Error('Please bind a Connect4 instance to this UiManager.')
        }
    }
}