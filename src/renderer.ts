import { Widget } from "src/base/browser/basic/widget";
import { SmoothScrollableWidget } from "src/base/browser/secondary/scrollableWidget/scrollableWidget";
import { DOMSize } from "src/base/common/dom";
import { Scrollable } from "src/base/common/scrollable";

// [basic]

const scrollableElement = document.createElement('div');
scrollableElement.className = 'container';
document.body.appendChild(scrollableElement);

const scrollbarElement = document.createElement('div');
scrollableElement.appendChild(scrollbarElement);

// [end]

const scrollable = new Scrollable(125);
scrollable.setDimension({
    height: DOMSize.getContentHeight(scrollableElement),
    scrollHeight: DOMSize.getContentHeight(scrollableElement) * 2,
});
const smoothScrollableWidget = new SmoothScrollableWidget(scrollable, {});
smoothScrollableWidget.render(scrollableElement);

scrollableElement.onwheel = (e: WheelEvent)=> {
    e.preventDefault();

    smoothScrollableWidget.setScrollPosition({scrollTop: e.deltaY});
}