import { IListViewRenderer } from "src/base/browser/secondary/listView/listRenderer";
import { ListItemType } from "src/base/browser/secondary/listView/listView";
import { IListMouseEvent, ListWidget } from "src/base/browser/secondary/listWidget/listWidget";
import { IScrollableWidgetExtensionOpts } from "src/base/browser/secondary/scrollableWidget/scrollableWidgetOptions";
import { SplitView } from "src/base/browser/secondary/splitView/splitView";
import { Priority } from "src/base/common/event";
import { IListItemProvider } from "./base/browser/secondary/listView/listItemProvider";
import { Orientation } from "src/base/common/dom";
import { ISampleView, SampleView } from "src/sample/sampleView";

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
const nodeCount = 80;
const colors = buildColors([255, 255, 0], [0, 255, 255], nodeCount);
let testNodeIndex = 0;

export class TestNode {

    public index: number;
    public color: string;
    public type: any = testItemType;
    
    constructor(index: number) {
        this.index = index;
        this.color = 'rgb(' + colors[testNodeIndex++]!.join(',') + ')';
    }

}

export class TestRenderer implements IListViewRenderer<TestNode> {

    readonly type: ListItemType = testItemType;

    constructor() { /* empty */ }

    public render(element: HTMLElement): void {
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

export class TestListItemProvider implements IListItemProvider<TestNode> {

    getSize(data: TestNode): number {
        return 50; // the height of each list node
    }

    getType(data: TestNode): number {
        return testItemType;
    }

}

// [SplitView Test Code Block]

const documentContainer = document.createElement('div');
documentContainer.className = 'container';
document.body.appendChild(documentContainer);

const listWidgetContainer = document.createElement('div');
listWidgetContainer.className = 'list-widget-container';

const sampleViews: ISampleView[] = [];
for (let i = 0; i < 20; i++) {
    sampleViews.push(new SampleView({}));
}

let cnt = 0;
const getNextSampleView = () => {
    return sampleViews[cnt++]!.element;
}

const nestedSampleView1 = new SampleView({ number: false });
const nestedSampleView2 = new SampleView({ number: false });

const outerSplitView = new SplitView(documentContainer, { 
    orientation: Orientation.Horizontal, 
    viewOpts: [{
        element: getNextSampleView(),
        minimumSize: 300,
        maximumSize: 1200,
        initSize: 300,
        priority: Priority.Low
    }, {
        element: nestedSampleView1.element,
        minimumSize: 100,
        maximumSize: Number.POSITIVE_INFINITY,
        initSize: 300,
        priority: Priority.Low
    }, {
        element: nestedSampleView2.element,
        minimumSize: 0,
        maximumSize: Number.POSITIVE_INFINITY,
        initSize: 0,
        priority: Priority.High
    }]}
);

const nestedSplitView1 = new SplitView(nestedSampleView1.element, {
    orientation: Orientation.Vertical,
    viewOpts: [
        {
            element: getNextSampleView(),
            minimumSize: 100,
            maximumSize: 300,
            initSize: 200,
            priority: Priority.Low
        }, {
            element: getNextSampleView(),
            minimumSize: 100,
            maximumSize: 300,
            initSize: 200,
            priority: Priority.Low
        }, {
            element: getNextSampleView(),
            minimumSize: 100,
            maximumSize: Number.POSITIVE_INFINITY,
            initSize: 200,
            priority: Priority.High
        }, {
            element: getNextSampleView(),
            minimumSize: 100,
            maximumSize: Number.POSITIVE_INFINITY,
            initSize: 200,
            priority: Priority.Normal
        }
    ]
});

const nestedSplitView2 = new SplitView(nestedSampleView2.element, { 
    orientation: Orientation.Vertical, 
    viewOpts: [{
        element: listWidgetContainer,
        minimumSize: 300,
        maximumSize: 1200,
        initSize: 300,
        priority: Priority.Low
    }, {
        element: getNextSampleView(),
        minimumSize: 100,
        maximumSize: Number.POSITIVE_INFINITY,
        initSize: 100,
        priority: Priority.Low
    }, {
        element: getNextSampleView(),
        minimumSize: 0,
        maximumSize: Number.POSITIVE_INFINITY,
        initSize: 0,
        priority: Priority.High
}]});

// [end]

const extensionOpts: IScrollableWidgetExtensionOpts = {
    mouseWheelScrollSensibility: 0.5
};

// [ListWidget Test Code Block]

const listWidget = new ListWidget<TestNode>(
    listWidgetContainer, 
    [new TestRenderer()], 
    new TestListItemProvider(),
    {
        transformOptimization: true,
        mouseWheelScrollSensitivity: 0.5,
        // dnd support
        dragAndDropProvider: {
            getDragData: () => null,
        }
    },
);

const items: TestNode[] = [];
for (let i = 0; i < nodeCount; i++) {
    items.push(new TestNode(i));
}

listWidget.splice(0, 0, items);

// this is how to use focus and selections support in ListWidget
listWidget.onClick((event: IListMouseEvent<TestNode>): void => {
    if (event.browserEvent.ctrlKey) {
        listWidget.toggleSelection(event.index);
    } else {
        listWidget.toggleFocus(event.index);
    }
});

listWidget.onDidChangeFocus(res => {
    if (res) {
        console.log('focus');
    } else {
        console.log('blur');
    }
});

// [ListView Test Code Block]

// const listView = new ListView<TestNode>(
//     listWidgetContainer, 
//     [new TestRenderer()], 
//     {
//         transformOptimization: true,
//         mouseWheelScrollSensitivity: 0.5
//     }
// );

// const items: TestNode[] = [];
// for (let i = 0; i < nodeCount; i++) {
//     items.push(new TestNode(i));
// }

// listView.splice(0, 0, items);

// listView.onClick((e) => {
//     const index = listView.renderIndexAt(e.clientY);
//     const item = listView.getItem(index);
//     console.log(item);
//     console.log(listView.getItemRenderTop(index));
// });

// [End]