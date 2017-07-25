import { GameObject, GameObjectOptions, GameEvent, pointDistance2, MouseButton, clamp, degToRad, ForceGenerator, CollisionMask } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const MOVEMENT_AMT = 300;

class PcBallForceGenerator extends ForceGenerator {
    constructor(private ball: PcBallObject) {
        super();
    }
    
    updateCollider(collider: CollisionMask, delta: number) {
        let events = this.ball.events;
        let fx = (events.isKeyDown('ArrowLeft') && -1) + (events.isKeyDown('ArrowRight') && 1);
        let fy = (events.isKeyDown('ArrowUp') && -1) + (events.isKeyDown('ArrowDown') && 1);
        let method = events.isKeyDown('KeyI') ? 'addImpulse' : 'addForce';
        collider[method](fx * MOVEMENT_AMT * delta, fy * MOVEMENT_AMT * delta);
    }
}

export class PcBallObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('PcBall', merge(opts, {
            color: 'orange',
            radius: 64
        }));
        this.mask.addForceGenerator(new PcBallForceGenerator(this));
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
