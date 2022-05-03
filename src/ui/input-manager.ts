import { UIManager } from "./ui-manager";

export class InputManager {

    uiManager: UIManager | undefined;

    constructor() {

    }

    handleInput() {
        if (!this.uiManager) { throw new Error('Aucune instance de UIManager attachée.') }
        const elements = document.querySelectorAll<HTMLButtonElement>('.drop-token');
        elements.forEach((element) => {
            element.addEventListener('click', () => {
                const column = parseInt(element.dataset.column!, 10);
                this.uiManager?.game?.play(column);
            })
        })
    }
}