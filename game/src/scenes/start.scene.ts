import { GameScene, Camera } from 'engine';
import { BoulderObject } from '../objects/boulder';
import { GolfBallObject } from '../objects/golf-ball';

const BALL_COUNT = 10;

export class StartScene extends GameScene {
    constructor() {
        super();
    }
    
    private initialized = false;
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        let camera = this.camera = new Camera(this);
        camera.clearColor = 'black';
        
        let bounds = this.camera.bounds;
        
        for (let q = 0; q < BALL_COUNT; q++) {
            let obj = Math.random() < .5 ? new BoulderObject() : new GolfBallObject();
            obj.x = bounds.left + Math.random() * (bounds.right - bounds.left);
            obj.y = bounds.bottom + Math.random() * (bounds.top - bounds.bottom);
            this.addObject(obj);
        }
    }
}
