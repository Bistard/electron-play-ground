import { ListView } from "src/base/browser/secondary/listView/listView";
import { IScrollableWidgetCreationOpts, IScrollableWidgetExtensionOpts } from "src/base/browser/secondary/scrollableWidget/scrollableWidgetOptions";
import { DOMSize } from "src/base/common/dom";
import { groupIntersect, IRange, IRangedGroup, Range, RangeMap } from "src/base/common/range";

// [basic]

const scrollableElement = document.createElement('div');
scrollableElement.className = 'container';
document.body.appendChild(scrollableElement);

const scrollbarElement = document.createElement('div');
scrollableElement.appendChild(scrollbarElement);

// [end]

const creationOpts: IScrollableWidgetCreationOpts = {
    viewportSize: DOMSize.getContentHeight(scrollableElement),
    scrollSize: DOMSize.getContentHeight(scrollableElement) * 10,
    scrollPosition: 0,
};

const extensionOpts: IScrollableWidgetExtensionOpts = {
    mouseWheelScrollSensibility: 0.5
};

const listView = new ListView(scrollableElement, true);

/**
 * 
 */

const r1: IRange = {start: 0, end: 100};
const r2: IRange = {start: 50, end: 150};
const r3: IRange = {start: 0, end: 50};
const r4: IRange = {start: 50, end: 200};

const rg1: IRangedGroup = {
    range: r1,
    size: 10
};

const rg2: IRangedGroup = {
    range: r2,
    size: 5
};

const rg3: IRangedGroup = {
    range: r3,
    size: 20
};

/**
 * @function Range.intersect()
 * @description Simply calculate the union of two ranges.
 */
// console.log(Range.intersect(r1, r2));
// console.log(Range.intersect(r1, r3));
// console.log(Range.intersect(r1, r4));
// console.log(Range.intersect(r2, r3));
// console.log(Range.intersect(r2, r4));
// console.log(Range.intersect(r3, r4));

/**
 * @function groupIntersect()
 * @description Compares the given range to each of the RangedGroup, if they 
 * intersect, push the result intersection with the rangedGroup size into an 
 * array.
 */
// console.log(groupIntersect(r1, [rg1, rg2]));
