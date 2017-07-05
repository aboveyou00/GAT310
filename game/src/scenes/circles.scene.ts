import { Camera, GameScene } from 'engine';
import { BoulderObject } from '../objects/boulder';
import { BowlingBallObject } from '../objects/bowling-ball';
import { GolfBallObject } from '../objects/golf-ball';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

const BALL_COUNT = 2;

export class CirclesScene extends StackScene {
    constructor(parent: GameScene) {
        super(parent);
    }
    
    private initialized = false;
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        let camera = this.camera = new Camera(this);
        camera.clearColor = 'black';
        
        let physicsController = new PhysicsControllerObject('Press enter to execute a single physics step. Click anywhere on the screen to place a random ball.');
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        
        for (let q = 0; q < BALL_COUNT; q++) {
            let chance = Math.floor(Math.random() * 3);
            let obj = chance === 0 ? new BoulderObject() :
                      chance === 1 ? new BowlingBallObject() :
                                     new GolfBallObject();
            // obj.x = q * 20;
            obj.x = -20 + Math.random() * 40;
            obj.y = -20 + Math.random() * 40;
            // obj.x = bounds.left + Math.random() * (bounds.right - bounds.left);
            // obj.y = bounds.bottom + Math.random() * (bounds.top - bounds.bottom);
            this.addObject(obj);
        }
    }
}
