import { Camera, GameScene, GravityForceGenerator } from 'engine';
import { BallSelectObject } from '../objects/ball-select';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

const BALL_COUNT = 12;

export class MomentumMassScene extends StackScene {
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
        
        let physicsController = new PhysicsControllerObject(`Click a ball to select it.
Right click and drag to change the velocity of the selected ball.
Use the mouse wheel to increase or decrease the selected ball's mass.
Press P to toggle preserving momentum.`, true);
        physicsController.createMore = false;
        physicsController.displayPreserveMass = true;
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        this.addForceGenerator(new GravityForceGenerator(98));
        
        for (let q = 0; q < BALL_COUNT; q++) {
            let obj = new BallSelectObject();
            obj.x = bounds.left + obj.radius + Math.random() * (bounds.right - bounds.left - obj.radius * 2);
            obj.y = bounds.bottom + obj.radius + Math.random() * (bounds.top - bounds.bottom - obj.radius * 2);
            this.addObject(obj);
        }
    }
}
