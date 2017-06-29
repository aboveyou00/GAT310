import { GameObject, GameScene, GameEvent } from 'engine';

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
    
    renderImpl(context: CanvasRenderingContext2D) {
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
    //The following three methods are optimizations that are currently not being used
    //They are quckly becoming outdated
    // saveUnrenderFrameState() {
    //     this.lastSelection = this.currentSelection;
    // }
    // unrenderFrame(context: CanvasRenderingContext2D) {
    //     if (this.lastSelection !== this.currentSelection) {
    //         let wid = this.game.canvasSize[0];
    //         context.fillStyle = 'black';
    //         context.fillRect(20, 20 + (30 * this.lastSelection), wid - 40, 30);
    //         context.fillRect(20, 20 + (30 * this.currentSelection), wid - 40, 30);
    //     }
    // }
    // renderFrame(context: CanvasRenderingContext2D) {
    //     if (this.lastSelection !== this.currentSelection) {
    //         context.fillStyle = 'white';
    //         context.fillText(this.items[this.lastSelection].text, 20, 20 + (30 * this.lastSelection));
    //         context.fillStyle = 'orange';
    //         context.fillText(this.items[this.currentSelection].text, 20, 20 + (30 * this.currentSelection));
    //     }
    // }
}
