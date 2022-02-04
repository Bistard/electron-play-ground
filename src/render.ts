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

const nodeCount = 10;
const colors = buildColors([255, 255, 0], [0, 255, 255], nodeCount);
let testNodeIndex = 0;

export class TestNode {

    public index: number;
    public size: number;
    public color: string;
    
    constructor(index: number, size?: number) {
        this.index = index;
        this.size = size ?? 100;
        this.color = 'rgb(' + colors[testNodeIndex++]!.join(',') + ')';
    }

}

export class TestRenderer implements IListViewRenderer {

    readonly type: ViewItemType = -1;

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

const scrollableElement = document.createElement('div');
scrollableElement.className = 'container';
document.body.appendChild(scrollableElement);

// [end]

const extensionOpts: IScrollableWidgetExtensionOpts = {
    mouseWheelScrollSensibility: 0.5
};

const listView = new ListView<TestNode>(
    scrollableElement, 
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