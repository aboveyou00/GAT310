import { GameScene, Camera } from 'engine';
import { StackScene } from './stack-scene';
import { MenuObject } from '../menu/menu';

export class MenuScene extends StackScene {
    constructor(private menu: MenuObject, parentScene: GameScene | null) {
        super(parentScene);
    }
    
    private initialized = false;
    
    start() {
        super.start();
        
        if (this.initialized) return;
        this.initialized = true;
        
        this.addObject(this.menu);
        
        let camera = this.camera = new Camera(this);
        camera.clearColor = 'black';
    }
}
