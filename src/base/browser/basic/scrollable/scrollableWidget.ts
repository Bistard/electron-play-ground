import { Widget } from "src/base/browser/widget";



export class ScrollableWidget extends Widget {

    constructor(element: HTMLElement) {
        super();

        element.style.overflow = 'hidden';

        // render
        this._element = document.createElement('div');
        this._element.appendChild(element);

    }

}