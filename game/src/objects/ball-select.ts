import { GameObject, GameObjectOptions, GameEvent, pointDistance2, MouseButton, clamp, degToRad } from 'engine';
import { BallObject, BallOptions } from './ball';
import merge = require('lodash.merge');

export class BallSelectObject extends BallObject {
    constructor(opts?: Partial<BallOptions>) {
        super('Ball', merge(opts, {
            color: 'white',
            radius: 10 + Math.floor(Math.random() * 86)
        }));
        this.refreshColor();
    }
    
    static currentSelection: BallSelectObject;
    static paused = false;
    pausehspeed: number | undefined;
    pausevspeed: number | undefined;
    
    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        if (evt.type === 'mouseButtonPressed' && evt.button === MouseButton.Left) {
            let clickPos = this.scene.camera.transformPixelCoordinates(evt.pageX, evt.pageY);
            if (pointDistance2(this.x, this.y, clickPos[0], clickPos[1]) <= Math.pow(this.radius, 2)) {
                BallSelectObject.currentSelection = this;
                return true;
            }
            else if (BallSelectObject.currentSelection === this) {
                BallSelectObject.currentSelection = null;
                return false;
            }
        }
        else if (BallSelectObject.currentSelection === this) {
            if (evt.type === 'mouseWheel') {
                let delta = (evt.delta > 0 ? -1 : 1) * 4;
                let oldMass = this.mask.mass;
                this.radius = clamp(this.radius + delta, 10, 96);
                let newMass = this.mask.mass;
                let preserveMomentum = (<any>this.scene.findObject('PhysicsController')).preserveMomentum;
                if (preserveMomentum) this.speed = (this.speed / newMass) * oldMass;
                this.refreshColor();
            }
        }
        else if (evt.type === 'mouseButtonPressed' && evt.button === MouseButton.Right) {
            BallSelectObject.paused = true;
        }
        else if (evt.type === 'mouseButtonReleased' && evt.button === MouseButton.Right) {
            BallSelectObject.paused = false;
        }
        return false;
    }
    private refreshColor() {
        let cc = 280 - Math.ceil(this.radius * 2.5);
        this.color = `rgb(${cc}, ${cc}, ${cc})`;
    }
    
    tick(delta: number) {
        if (BallSelectObject.paused) {
            if (typeof this.pausehspeed === 'undefined') {
                this.pausehspeed = this.hspeed;
                this.pausevspeed = this.vspeed;
            }
            else {
                [this.hspeed, this.vspeed] = [this.pausehspeed, this.pausevspeed];
            }
            if (this.events.isKeyDown('KeyA') || BallSelectObject.currentSelection === this) {
                let bounds = this.scene.camera.bounds;
                let mc = this.events.mousePosition;
                let mpc = this.scene.camera.transformPixelCoordinates(mc.x, mc.y);
                [this.pausehspeed, this.pausevspeed] = [this.hspeed, this.vspeed] = [(mpc[0] - this.x) * 2, (mpc[1] - this.y) * 2];
            }
            return;
        }
        else {
            delete this.pausehspeed;
            delete this.pausevspeed;
        }
        super.tick(delta);
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
        
        if (BallSelectObject.currentSelection === this) {
            context.strokeStyle = 'rgba(0, 0, 255, .4)';
            context.lineWidth = 6;
            context.beginPath();
            context.ellipse(0, 0, this.radius + 4, this.radius + 4, 0, 0, 2 * Math.PI);
            context.stroke();
        }
    }
}
