import { GameObject, GraphicsAdapter, DefaultGraphicsAdapter, GameEvent, GravityForceGenerator } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

const FIXED_BALL_RADIUS = 64;

export class FixedBallObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('FixedBall', merge(opts, {
            color: 'grey',
            radius: FIXED_BALL_RADIUS
        }));
    }
    
    attachTo: GameObject;
    angle: number = 0;
    angleChangeSpeed: number = 0;
    distance: number = 0;
    
    handleEvent(e: GameEvent) {
        if (super.handleEvent(e)) return true;
        
        if (e.type === 'keyPressed' && (e.code === 'Space' || e.code === 'Enter') && this.attachTo) {
            let forceGenerators = this.attachTo.mask.forceGenerators;
            for (let forceGen of forceGenerators) {
                if (!(forceGen instanceof GravityForceGenerator)) continue;
                this.mask.addForceGenerator(forceGen);
            }
            [this.hspeed, this.vspeed] = [this.attachTo.hspeed, this.attachTo.vspeed];
            this.attachTo = null;
            if (!this.angleChangeSpeed) return false;
            let perpAngle = this.angle + (Math.PI / 2) * Math.sign(this.angleChangeSpeed);
            let magnitude = (this.distance * 2 * this.angleChangeSpeed) / Math.PI;
            this.hspeed += Math.sin(perpAngle) * magnitude;
            this.vspeed += Math.cos(perpAngle) * magnitude;
        }
        
        return false;
    }
    
    tick(delta: number) {
        super.tick(delta);
        if (!this.attachTo) return;
        
        this.angle += delta *= this.angleChangeSpeed;
        [this.x, this.y] = [
            this.attachTo.x + Math.sin(this.angle) * this.distance,
            this.attachTo.y + Math.cos(this.angle) * this.distance
        ];
    }
    
    render(adapter) {
        if (this.attachTo) {
            if (adapter instanceof DefaultGraphicsAdapter) this.renderAttachmentContext2d(adapter);
            else throw new Error(`Not implemented`);
        }
        super.render(adapter);
    }
    
    renderAttachmentContext2d(adapter: DefaultGraphicsAdapter) {
        let context = adapter.context;
        context.strokeStyle = 'blue';
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.attachTo.x, this.attachTo.y);
        context.stroke();
    }
}
