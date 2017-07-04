import { GameObject, GameObjectOptions, CircleCollisionMask, GraphicsAdapter } from 'engine';

type BallOptions = GameObjectOptions & {
    radius: number,
    color: string
};

export class BallObject extends GameObject {
    constructor(name: string, opts: BallOptions) {
        super(name, opts);
        this.radius = opts.radius;
        this.color = opts.color;
        this.mask = new CircleCollisionMask(this, this.radius);
    }
    
    private radius: number;
    private color: string;
    
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
