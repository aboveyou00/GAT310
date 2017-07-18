import { GameObject, GameObjectOptions, GameEvent, pointDistance2, MouseButton, clamp, degToRad, ForceGenerator, CollisionMask } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const MOVEMENT_AMT = 300;

export class PcBallObject extends BallObject implements ForceGenerator {
    constructor(opts?: Partial<BallOptions>) {
        super('PcBall', merge(opts, {
            color: 'orange',
            radius: 64
        }));
        this.mask.addForceGenerator(this);
    }
    
    updateCollider(collider: CollisionMask, delta: number) {
        let fx = (this.events.isKeyDown('ArrowLeft') && -1) + (this.events.isKeyDown('ArrowRight') && 1);
        let fy = (this.events.isKeyDown('ArrowUp') && -1) + (this.events.isKeyDown('ArrowDown') && 1);
        let method = this.events.isKeyDown('KeyI') ? 'addImpulse' : 'addForce';
        collider[method](fx * MOVEMENT_AMT * delta, fy * MOVEMENT_AMT * delta);
    }
    
    protected renderImplContext2d(context: CanvasRenderingContext2D) {
        super.renderImplContext2d(context);
        
        if (this.game.renderPhysics) {
            context.save();
            context.rotate(-degToRad(this.direction + 90));
            context.lineCap = 'arrow';
            context.lineWidth = 3;
            context.strokeStyle = 'green';
            context.beginPath();
            context.moveTo(3, 0);
            context.lineTo(3, this.speed * .5);
            context.stroke();
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(-3, 0);
            context.lineTo(-3, this.speed * .0001 * this.mask.mass);
            context.stroke();
            context.restore();
        }
    }
}
