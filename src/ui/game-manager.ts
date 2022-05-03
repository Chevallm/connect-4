import { Connect4 } from "../core/connect4";
import { InputManager } from "./input-manager";
import { UIManager } from "./ui-manager";

export class GameManager {
    

    inputManager = new InputManager();
    uiManager = new UIManager();
    game = new Connect4();

    constructor() {
        this.inputManager.uiManager = this.uiManager;
        this.uiManager.game = this.game;
    }

    start() {
        this.game.start();
    }
}