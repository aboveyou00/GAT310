import { Camera, GameScene, GravityForceGenerator, SpringForceGenerator, DragForceGenerator } from 'engine';
import { BallSelectObject } from '../objects/ball-select';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

export class SpringScene extends StackScene {
    constructor(parent: GameScene, private BALL_COUNT = 2) {
        super(parent);
    }
    
    private initialized = false;
    private firstBall: BallSelectObject;
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        let camera = this.camera = new Camera(this);
        camera.clearColor = 'black';
        
        let physicsController = new PhysicsControllerObject(`Click and drag any ball. After you select one:
L + mouse wheel to change the spring length;
S + mouse wheel to change the spring constant;
Mouse wheel to change the ball radius/mass`, true);
        physicsController.createMore = false;
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        // this.addForceGenerator(new GravityForceGenerator(98));
        
        let balls: BallSelectObject[] = [];
        for (let q = 0; q < this.BALL_COUNT; q++) {
            let obj = new BallSelectObject();
            obj.mask.addForceGenerator(new DragForceGenerator(.1, .5));
            obj.x = bounds.left + obj.radius + Math.random() * (bounds.right - bounds.left - obj.radius * 2);
            obj.y = bounds.bottom + obj.radius + Math.random() * (bounds.top - bounds.bottom - obj.radius * 2);
            this.addObject(obj);
            balls.push(obj);
        }
        this.firstBall = balls[0];
        
        for (let q = 0; q < this.BALL_COUNT - 1; q++) {
            let one = balls[q];
            let two = balls[q + 1];
            let spring = new SpringForceGenerator(one.mask, 25, (one.radius + two.radius) * 2);
            two.mask.addForceGenerator(spring);
            two.controlSpring = spring;
            if (q === 0) spring.modifyOther = false;
        }
    }
}
