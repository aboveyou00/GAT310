import { Game } from 'engine';
import { MenuScene } from './scenes/menu.scene';
import { MainMenuObject } from './menu/main-menu';

export class PhysicsGame extends Game {
    constructor(framesPerSecond = 30) {
        super({ framesPerSecond: framesPerSecond });
    }

    start() {
        super.start();
        this.changeScene(new MenuScene(new MainMenuObject(), null));
    }
}
