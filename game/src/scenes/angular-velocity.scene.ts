import { Camera, GameScene, GravityForceGenerator, GameEvent } from 'engine';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';
import { FixedBallObject } from '../objects/fixed-ball';
import { PcBallObject } from '../objects/pc-ball';

const BALL_COUNT = 6;

export class AngularVelocityScene extends StackScene {
    constructor(parent: GameScene) {
        super(parent);
    }
    
    private initialized = false;
    
    handleEvent(e: GameEvent) {
        if (super.handleEvent(e)) return true;
        
        if (e.type === 'keyPressed' && e.code === 'KeyR') {
            this.game.changeScene(new AngularVelocityScene(this.parentScene));
            return true;
        }
        
        return false;
    }
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        let camera = this.camera = new Camera(this);
        camera.clearColor = 'black';
        
        let physicsController = new PhysicsControllerObject('Press space to cut the ball ties.\r\nPress R to restart the simulation', true);
        physicsController.createMore = false;
        this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        let gravity = new GravityForceGenerator(98);
        
        let pcObj = new PcBallObject({ openWorld: true });
        pcObj.x = (bounds.left + bounds.right) / 2;
        pcObj.y = (bounds.top + bounds.bottom) / 2;
        pcObj.mask.addForceGenerator(gravity);
        this.addObject(pcObj);
        
        let angle = 0;
        let angleChangeSpeed = Math.PI / 2;
        let dist = 256;
        let angleAdd = (2 * Math.PI) / BALL_COUNT;
        for (let q = 0; q < BALL_COUNT; q++) {
            let chance = Math.floor(Math.random() * 3);
            let obj = new FixedBallObject({ openWorld: true });
            obj.attachTo = pcObj;
            obj.angle = angle;
            obj.angleChangeSpeed = angleChangeSpeed;
            obj.distance = dist;
            angle += angleAdd;
            this.addObject(obj);
        }
    }
}
