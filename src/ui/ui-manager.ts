import { Connect4 } from "../core/connect4";

export class UIManager {

    game = new Connect4();

    constructor() {

    }

    play(column: number) {
        this.game.play(column);
        this.draw();
    }

    draw() {
        // TODO
    }
}