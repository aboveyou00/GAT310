import { Camera, GameScene, GravityForceGenerator, SpringForceGenerator, DragForceGenerator } from 'engine';
import { BallSelectObject } from '../objects/ball-select';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

const BALL_COUNT = 5;

export class SpringScene extends StackScene {
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
        
        let physicsController = new PhysicsControllerObject(`Click and drag any ball`, true);
        physicsController.createMore = false;
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        // this.addForceGenerator(new GravityForceGenerator(98));
        
        let balls: BallSelectObject[] = [];
        for (let q = 0; q < BALL_COUNT; q++) {
            let obj = new BallSelectObject();
            obj.mask.addForceGenerator(new DragForceGenerator(.1, .1));
            obj.x = bounds.left + obj.radius + Math.random() * (bounds.right - bounds.left - obj.radius * 2);
            obj.y = bounds.bottom + obj.radius + Math.random() * (bounds.top - bounds.bottom - obj.radius * 2);
            this.addObject(obj);
            balls.push(obj);
        }
        
        for (let q = 0; q < BALL_COUNT - 1; q++) {
            let one = balls[q];
            let two = balls[q + 1];
            let spring = new SpringForceGenerator(two.mask, 25, (one.radius + two.radius) * 2);
            one.mask.addForceGenerator(spring);
        }
    }
}
