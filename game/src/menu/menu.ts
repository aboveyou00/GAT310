import { GameObject, GameScene, GameEvent, GraphicsAdapter } from 'engine';

export type MenuItemT = {
    text: string,
    handler: () => void,
    isLocked?: () => boolean
};

export abstract class MenuObject extends GameObject {
    constructor(name: string, private lockedPostfix: string = ' - Locked') {
        super(name, {
            renderCamera: 'none'
        });
    }
    
    addToScene(scene: GameScene) {
        super.addToScene(scene);
        this.initItems();
    }
    abstract initItems(): void;
    
    private items: MenuItemT[] = [];
    private currentSelection = 0;
    private lastSelection = 0;
    addMenuItem(item: MenuItemT) {
        this.items.push(item);
    }
    
    handleEvent(evt: GameEvent) {
        //TODO: handle click based on mouse click, not just space and enter
        let currentItem = this.items[this.currentSelection];
        if (currentItem && !currentItem.isLocked || !currentItem.isLocked()) {
            if (evt.type === 'keyTyped' && this.items.length && (evt.code === 'Enter' || evt.code === 'Space')) {
                let currentItem = this.items[this.currentSelection];
                currentItem.handler();
                return true;
            }
        }
        
        let prevSelection = this.currentSelection;
        switch (evt.type) {
        case 'keyTyped':
            if (evt.code === 'ArrowUp' || evt.code === 'ArrowLeft') this.currentSelection--;
            else if (evt.code === 'ArrowRight' || evt.code === 'ArrowDown') this.currentSelection++;
            if (this.currentSelection < 0) this.currentSelection = this.items.length - 1;
            if (this.currentSelection >= this.items.length) this.currentSelection = 0;
            break;
        case 'mouseMoved':
            //TODO: set currentSelection based on mouse position
            break;
        }
        return this.currentSelection !== prevSelection;
    }
    
    protected renderImpl(adapter: GraphicsAdapter) {
        if ((<any>adapter).context instanceof CanvasRenderingContext2D) this.renderImplContext2d((<any>adapter).context);
        else throw new Error(`Not implemented!`);
    }
    protected renderImplContext2d(context: CanvasRenderingContext2D) {
        let [canvasWidth, canvasHeight] = this.game.canvasSize;
        context.textBaseline = 'top';
        context.textAlign = 'left';
        context.font = '24px cambria';
        for (let q = 0; q < this.items.length; q++) {
            let item = this.items[q];
            let locked = (item.isLocked ? item.isLocked() : false);
            context.fillStyle =        locked ? 'gray' :
                  this.currentSelection === q ? 'orange' :
                                                'white';
            context.fillText(item.text + (locked ? this.lockedPostfix : ''), 35, 20 + (30 * q));
        }
        
        context.textAlign = 'right';
        if (this.items.length) {
            context.fillStyle = 'orange';
            context.fillText('\u203a', 30, 20 + (30 * this.currentSelection));
        }
    }
}
