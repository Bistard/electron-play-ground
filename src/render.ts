import { IListViewRenderer } from "src/base/browser/secondary/listView/listRenderer";
import { ListView, ViewItemType } from "src/base/browser/secondary/listView/listView";
import { IScrollableWidgetExtensionOpts } from "src/base/browser/secondary/scrollableWidget/scrollableWidgetOptions";

// [test]

const buildColors = function(start: number[], end: number[], count: number): number[][] {
    //Distance between each color
    var steps = [
      (end[0]! - start[0]!) / count,  
      (end[1]! - start[1]!) / count,  
      (end[2]! - start[2]!) / count  
    ]!;
    
    //Build array of colors
    var colors = [start];
    for(var ii = 0; ii < count - 1; ++ii) {
      colors.push([
        Math.floor(colors[ii]![0]! + steps[0]!),
        Math.floor(colors[ii]![1]! + steps[1]!),
        Math.floor(colors[ii]![2]! + steps[2]!)
      ]);
    }
    colors.push(end); 
   
    return colors;
};

const testItemType = 0;
const nodeCount = 20;
const colors = buildColors([255, 255, 0], [0, 255, 255], nodeCount);
let testNodeIndex = 0;

export class TestNode {

    public index: number;
    public size: number;
    public color: string;
    public type: any = testItemType;
    
    constructor(index: number, size?: number) {
        this.index = index;
        this.size = size ?? 100;
        this.color = 'rgb(' + colors[testNodeIndex++]!.join(',') + ')';
    }

}

export class TestRenderer implements IListViewRenderer {

    readonly type: ViewItemType = testItemType;

    constructor() { /* empty */ }

    public render(element: HTMLElement, node: TestNode): void {
        element.style.height = node.size + 'px';

        const numberElement = document.createElement('div');
        numberElement.className = 'test-node-number';
        
        element.appendChild(numberElement);
    }

    public update(element: HTMLElement, index: number, node: TestNode): void {
        element.style.background = node.color;
        (element.firstChild as HTMLElement).innerHTML = index.toString();
    }

    public dispose(element: HTMLElement): void {
        
    }
}   

// [basic]

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// [end]

const extensionOpts: IScrollableWidgetExtensionOpts = {
    mouseWheelScrollSensibility: 0.5
};

const listView = new ListView<TestNode>(
    container, 
    [new TestRenderer()], 
    {
        transformOptimization: true,
        mouseWheelScrollSensitivity: 0.5
    }
);

const items: TestNode[] = [];
for (let i = 0; i < nodeCount; i++) {
    items.push(new TestNode(i));
}

listView.splice(0, 0, items);

listView.onClick((e) => {
    const index = listView.renderIndexAt(e.clientY);
    const item = listView.getItem(index);
    console.log(item);
    console.log(listView.getItemRenderTop(index));
});
