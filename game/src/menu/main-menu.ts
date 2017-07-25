import { MenuObject } from './menu';
import { CirclesScene } from '../scenes/circles.scene';
import { BouncingCirclesScene } from '../scenes/bouncing-circles.scene';
import { MomentumMassScene } from '../scenes/momentum-mass.scene';
import { ForceGeneratorScene } from '../scenes/force-generator.scene';
import { PlanetsScene } from '../scenes/planets.scene';
import { SpringScene } from '../scenes/spring.scene';

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
            text:"Circle Collision",
            handler: () => {
                this.game.changeScene(new BouncingCirclesScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Mass and Force",
            handler: () => {
                this.game.changeScene(new MomentumMassScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Force Generator",
            handler: () => {
                this.game.changeScene(new ForceGeneratorScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Planets",
            handler: () => {
                this.game.changeScene(new PlanetsScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Single Spring",
            handler: () => {
                this.game.changeScene(new SpringScene(this.scene));
            }
        });
        this.addMenuItem({
            text:"Multiple Springs",
            handler: () => {
                this.game.changeScene(new SpringScene(this.scene, 5));
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
