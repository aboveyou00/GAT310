import { GameObject, GameEvent, GameScene, GraphicsAdapter, MouseButton, fillText, DragForceGenerator } from 'engine';
import { BoulderObject } from './boulder';
import { BowlingBallObject } from './bowling-ball';
import { GolfBallObject } from './golf-ball';

export class PhysicsControllerObject extends GameObject {
    constructor(private message: string, private updatePositions = false) {
        super('PhysicsController', {
            renderCamera: 'none'
        });
    }
    
    addToScene(scene: GameScene) {
        super.addToScene(scene);
        this.game.renderPhysics = true;
    }
    
    createMore = true;
    displayPreserveMass = false;
    
    preserveMomentum = true;
    dragForce: DragForceGenerator | null = null;
    
    handleEvent(evt: GameEvent) {
        if (evt.type === 'keyPressed' && evt.code === 'F3') {
            this.game.renderPhysics = !this.game.renderPhysics;
            return true;
        }
        else if (evt.type === 'keyPressed' && evt.code === 'KeyP') {
            this.preserveMomentum = !this.preserveMomentum;
            return true;
        }
        else if (this.createMore && evt.type === 'mouseButtonPressed' && evt.button === MouseButton.Left) {
            let chance = Math.floor(Math.random() * 3);
            let obj = chance === 0 ? new BoulderObject() :
                      chance === 1 ? new BowlingBallObject() :
                                     new GolfBallObject();
            (<any>obj.mask).updatePositions = this.updatePositions;
            let mousePos = this.events.mousePosition;
            [obj.x, obj.y] = this.scene.camera.transformPixelCoordinates(mousePos.x, mousePos.y);
            this.scene.addObject(obj);
            return true;
        }
        else if (evt.type === 'keyPressed' && evt.code === 'KeyD' && this.dragForce) {
            this.dragForce.enabled = !this.dragForce.enabled;
            return true;
        }
        else if (evt.type === 'keyPressed' && evt.code === 'KeyL' && this.dragForce) {
            this.dragForce.k1 = +window.prompt(`Enter the new low speed`);
            return true;
        }
        else if (evt.type === 'keyPressed' && evt.code === 'KeyH' && this.dragForce) {
            this.dragForce.k2 = +window.prompt(`Enter the new high speed`);
            return true;
        }
        return false;
    }
    
    render(adapter: GraphicsAdapter) {
        if ((<any>adapter).context instanceof CanvasRenderingContext2D) this.renderContext2d((<any>adapter).context);
        else throw new Error('Not implemented');
    }
    renderContext2d(context: CanvasRenderingContext2D) {
        let [canvasWidth, canvasHeight] = this.game.canvasSize;
        
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = '20px Cambria';
        fillText(context, this.message, 20, 20);
        
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.textBaseline = 'top';
        context.font = '20px Cambria';
        
        let yy = 20;
        if (this.displayPreserveMass) {
            fillText(context, `Preserve momentum: ${this.preserveMomentum ? 'Enabled' : 'Disabled'}`, canvasWidth - 20, yy);
            yy += 30;
        }
        
        if (this.dragForce) {
            fillText(context, `Drag (D): ${this.dragForce.enabled ? 'Enabled' : 'Disabled'}`, canvasWidth - 20, yy);
            yy += 30;
            fillText(context, `Drag lowSpeed (L): ${this.dragForce.k1}`, canvasWidth - 20, yy);
            yy += 30;
            fillText(context, `Drag highSpeed (H): ${this.dragForce.k2}`, canvasWidth - 20, yy);
            yy += 30;
        }
    }
}
