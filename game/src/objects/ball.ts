import { GameObject, GameObjectOptions, CircleCollisionMask, GraphicsAdapter, GameEvent } from 'engine';

export type BallOptions = GameObjectOptions & {
    radius: number,
    color: string,
    useGravity?: boolean
};

export class BallObject extends GameObject {
    constructor(name: string, opts: BallOptions) {
        super(name, opts);
        this.radius = opts.radius;
        this.color = opts.color;
        this.mask = new CircleCollisionMask(this, this.radius);
        if (opts.useGravity) this.gravity = 9.8;
    }
    
    private radius: number;
    private color: string;
    private gravity: number = 0;
    
    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        
        if (evt.type === 'keyPressed' && evt.code === 'Enter') (<any>this.mask).updatePositions = 'once';
        
        return false;
    }
    
    tick(delta: number) {
        super.tick(delta);
        if (this.gravity) {
            this.vspeed += this.gravity * delta;
            let bounds = this.scene.camera.bounds;
            if (this.y + this.radius > bounds.top) {
                this.y = bounds.top - this.radius;
                if (this.vspeed > 0) this.vspeed *= -.8;
            }
            if (this.x + this.radius > bounds.right) {
                this.x = bounds.right - this.radius;
                if (this.hspeed > 0) this.hspeed *= -1;
            }
            if (this.x - this.radius < bounds.left) {
                this.x = bounds.left + this.radius;
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
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(0, 0, this.radius, this.radius, 0, 0, 2 * Math.PI);
        context.fill();
    }
}
