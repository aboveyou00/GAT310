import { Camera, GameScene, GravityForceGenerator, DragForceGenerator } from 'engine';
import { BallSelectObject } from '../objects/ball-select';
import { PcBallObject } from '../objects/pc-ball';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

const BALL_COUNT = 6;

export class RestingContactScene extends StackScene {
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
Move the orange ball using a force generator with the arrow keys.
Press F3 to render physics debug information.`, true);
        physicsController.createMore = false;
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        this.addForceGenerator(new GravityForceGenerator(98));
        this.addForceGenerator(physicsController.dragForce = new DragForceGenerator(.002, .002));
        // physicsController.dragForce.enabled = false;
        
        for (let q = 0; q < BALL_COUNT; q++) {
            let obj = new BallSelectObject();
            obj.radius = 48;
            obj.x = (bounds.right + bounds.left) / 2;
            obj.y = bounds.top - obj.radius - ((obj.radius * 2) + 2) * q;
            this.addObject(obj);
        }
        
        let obj = new PcBallObject();
        obj.x = (bounds.right + bounds.left * 3) / 4;
        obj.y = bounds.top + obj.radius * 2;
        this.addObject(obj);
        
        this.game.renderPhysics = false;
    }
}
