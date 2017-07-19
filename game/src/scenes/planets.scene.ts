import { Camera, GameScene, GravityForceGenerator } from 'engine';
import { PlanetObject } from '../objects/planet';
import { SunObject } from '../objects/sun';
import { PhysicsControllerObject } from '../objects/physics-controller';
import { StackScene } from './stack-scene';

export class PlanetsScene extends StackScene {
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
        
        // let physicsController = new PhysicsControllerObject('', true);
        // this.addObject(physicsController);
        
        let bounds = this.camera.bounds;
        let [centerx, centery] = [(bounds.left + bounds.right) / 2, (bounds.bottom + bounds.top) / 2];
        
        let sun = new SunObject();
        sun.x = centerx;
        sun.y = centery;
        this.addObject(sun);
        
        let planet = new PlanetObject({ openWorld: true });
        planet.x = centerx - 400;
        planet.y = centery;
        planet.mask!.addForce(0, 700);
        planet.mask!.addForceGenerator(new GravityForceGenerator(sun.mask));
        this.addObject(planet);
    }
}
