import { AbstractScrollableWidget } from "src/base/browser/secondary/scrollableWidget/scrollableWidget";
import { IScrollableWidgetCreationOpts, IScrollableWidgetExtensionOpts } from "src/base/browser/secondary/scrollableWidget/scrollableWidgetOptions";
import { DOMSize } from "src/base/common/dom";

class TestSmoothScrollableWidget extends AbstractScrollableWidget {

    constructor(opts: IScrollableWidgetCreationOpts, extensionOpts: IScrollableWidgetExtensionOpts) {
        super(opts, extensionOpts);
    }

    protected override __rerender(): void {}

}

// [basic]

const scrollableElement = document.createElement('div');
scrollableElement.className = 'container';
document.body.appendChild(scrollableElement);

const scrollbarElement = document.createElement('div');
scrollableElement.appendChild(scrollbarElement);

// [end]

const creationOpts: IScrollableWidgetCreationOpts = {
    viewportSize: DOMSize.getContentHeight(scrollableElement),
    scrollSize: DOMSize.getContentHeight(scrollableElement) * 2,
    scrollPosition: 0,
};

const extensionOpts: IScrollableWidgetExtensionOpts = {
    
};

const smoothScrollableWidget = new TestSmoothScrollableWidget(creationOpts, extensionOpts);
smoothScrollableWidget.render(scrollableElement);
