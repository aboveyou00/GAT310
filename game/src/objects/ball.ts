import { GameObject, GameObjectOptions, CircleCollisionMask, GraphicsAdapter, GameEvent } from 'engine';

export type BallOptions = GameObjectOptions & {
    radius: number,
    color: string
};

export class BallObject extends GameObject {
    constructor(name: string, opts: BallOptions) {
        super(name, opts);
        this._radius = opts.radius;
        this._color = opts.color;
        this.mask = new CircleCollisionMask(this, this._radius);
    }
    
    private _radius: number;
    get radius() {
        return this._radius;
    }
    set radius(val: number) {
        this._radius = val;
        let mask: CircleCollisionMask = <any>this.mask;
        mask.radius = this._radius;
        mask.mass = Math.PI * this.radius * this.radius;
    }
    
    private _color: string;
    get color() {
        return this._color;
    }
    set color(val: string) {
        this._color = val;
    }
    
    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        
        if (evt.type === 'keyTyped' && evt.code === 'Enter' && !(<any>this.mask).updatePositions) (<any>this.mask).updatePositions = 'once';
        
        return false;
    }
    
    tick(delta: number) {
        super.tick(delta);
        if (this.hspeed !== 0 || this.vspeed !== 0) {
            let bounds = this.scene.camera.bounds;
            if (this.y + this._radius > bounds.top) {
                this.y = bounds.top - this._radius;
                if (this.vspeed > 0) this.vspeed *= -.8;
            }
            if (this.x + this._radius > bounds.right) {
                this.x = bounds.right - this._radius;
                if (this.hspeed > 0) this.hspeed *= -1;
            }
            if (this.x - this._radius < bounds.left) {
                this.x = bounds.left + this._radius;
                if (this.hspeed < 0) this.hspeed *= -1;
            }
        }
    }
    
    protected renderImpl(adapter: GraphicsAdapter) {
        if ((<any>adapter).context instanceof CanvasRenderingContext2D) this.renderImplContext2d((<any>adapter).context);
        else throw new Error(`Not implemented!`);
    }
    protected renderImplContext2d(context: CanvasRenderingContext2D) {
        let [canvasWidth, canvasHeight] = this.game.canvasSize;
        context.fillStyle = this._color;
        context.beginPath();
        context.ellipse(0, 0, this._radius, this._radius, 0, 0, 2 * Math.PI);
        context.fill();
    }
}
