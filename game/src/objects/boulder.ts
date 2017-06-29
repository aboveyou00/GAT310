import { GameObject, GameObjectOptions, CircleCollisionMask } from 'engine';

const BOULDER_RADIUS = 48;

export class BoulderObject extends GameObject {
    constructor(opts?: GameObjectOptions) {
        super('Boulder', opts);
        this.mask = new CircleCollisionMask(this, BOULDER_RADIUS);
    }
    
    renderImpl(context: CanvasRenderingContext2D) {
        context.fillStyle = 'grey';
        context.beginPath();
        context.ellipse(0, 0, BOULDER_RADIUS, BOULDER_RADIUS, 0, 0, 2 * Math.PI);
        context.fill();
    }
}
