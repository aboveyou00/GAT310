import { Camera, GameScene, GravityForceGenerator, SpringForceGenerator, DragForceGenerator } from 'engine';
import { BallSelectObject } from '../objects/ball-select';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

export class SpringMeshScene extends StackScene {
    constructor(parent: GameScene, private readonly MESH_WIDTH = 10, private readonly MESH_HEIGHT = 10) {
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
        
        let balls: BallSelectObject[][] = [];
        let count = 0;
        
        for (let q = 0; q < this.MESH_WIDTH; q++) {
            let column: BallSelectObject[] = [];
            balls.push(column);
            
            for (let w = 0; w < this.MESH_HEIGHT; w++) {
                let obj = new BallSelectObject();
                obj.radius = 10;
                obj.mask.addForceGenerator(new DragForceGenerator(.1, .5));
                obj.x = bounds.left + 50 * (q + 1);
                obj.y = bounds.bottom + 50 * (w + 1);
                this.addObject(obj);
                column.push(obj);
                count++;
            }
        }
        
        for (let q = 0; q < this.MESH_WIDTH; q++) {
            let column = balls[q];
            for (let w = 0; w < this.MESH_HEIGHT - 1; w++) {
                let one = column[w];
                let two = column[w + 1];
                let spring = new SpringForceGenerator(one.mask, 50, 50);
                two.mask.addForceGenerator(spring);
            }
        }
        
        for (let q = 0; q < this.MESH_WIDTH - 1; q++) {
            for (let w = 0; w < this.MESH_HEIGHT; w++) {
                let one = balls[q][w];
                let two = balls[q + 1][w];
                let spring = new SpringForceGenerator(one.mask, 50, 50);
                two.mask.addForceGenerator(spring);
            }
        }
    }
}
