import { GameScene, GameEvent } from 'engine';

export class StackScene extends GameScene {
    constructor(private _parentScene: GameScene | null) {
        super();
    }
    
    get parentScene() {
        return this._parentScene;
    }
    
    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        
        if (evt.type === 'keyPressed' && evt.code === 'Escape' && !!this.parentScene) {
            this.game.changeScene(this.parentScene);
            return true;
        }
        return false;
    }
}
