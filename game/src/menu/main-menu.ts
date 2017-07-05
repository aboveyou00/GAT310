import { MenuObject } from './menu';
import { CirclesScene } from '../scenes/circles.scene';

export class MainMenuObject extends MenuObject {
    constructor() {
        super('MainMenu');
    }
    
    initItems() {
        this.addMenuItem({
            text:"Circle Separation - Step by Step",
            handler: () => {
                this.game.changeScene(new CirclesScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Exit",
            handler: () => {
                window.close();
            }
        });
    }
}
