import { GameObject, GameEvent, GameScene, GraphicsAdapter, MouseButton } from 'engine';
import { BoulderObject } from './boulder';
import { BowlingBallObject } from './bowling-ball';
import { GolfBallObject } from './golf-ball';

export class PhysicsControllerObject extends GameObject {
    constructor(private message: string) {
        super('PhysicsController', {
            renderCamera: 'none'
        });
    }
    
    addToScene(scene: GameScene) {
        super.addToScene(scene);
        this.game.renderPhysics = true;
    }
    
    handleEvent(evt: GameEvent) {
        if (evt.type === 'keyPressed' && evt.code === 'F3') {
            this.game.renderPhysics = !this.game.renderPhysics;
            return true;
        }
        else if (evt.type === 'mouseButtonPressed' && evt.button === MouseButton.Left) {
            let chance = Math.floor(Math.random() * 3);
            let obj = chance === 0 ? new BoulderObject() :
                      chance === 1 ? new BowlingBallObject() :
                                     new GolfBallObject();
            let mousePos = this.events.mousePosition;
            [obj.x, obj.y] = this.scene.camera.transformPixelCoordinates(mousePos.x, mousePos.y);
            this.scene.addObject(obj);
            return true;
        }
        return false;
    }
    
    render(adapter: GraphicsAdapter) {
        if ((<any>adapter).context instanceof CanvasRenderingContext2D) this.renderContext2d((<any>adapter).context);
        else throw new Error('Not implemented');
    }
    renderContext2d(context: CanvasRenderingContext2D) {
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = '20px Cambria';
        context.fillText(this.message, 20, 20);
    }
}
