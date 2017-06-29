import { GameObject, GameEvent } from 'engine';

export class PhysicsControllerObject extends GameObject {
    constructor() {
        super('PhysicsController', {
            shouldRender: false
        });
    }
    
    handleEvent(evt: GameEvent) {
        if (evt.type === 'keyPressed' && evt.code === 'F3') {
            this.game.renderPhysics = !this.game.renderPhysics;
            return true;
        }
        return false;
    }
}
