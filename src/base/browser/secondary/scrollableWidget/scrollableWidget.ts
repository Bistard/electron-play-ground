import { AbstractScrollbar } from "src/base/browser/basic/scrollbar/abstractScrollbar";
import { HorizontalScrollbar } from "src/base/browser/basic/scrollbar/horizontalScrollbar";
import { VerticalScrollbar } from "src/base/browser/basic/scrollbar/verticalScrollbar";
import { IWidget, Widget } from "src/base/browser/basic/widget";
import { IScrollableWidgetCreationOpts, IScrollableWidgetOpts, resolveScrollableWidgetOpts, ScrollbarType } from "src/base/browser/secondary/scrollableWidget/scrollableWidgetOptions";
import { INewScrollDimension, INewScrollPosition, IScrollDimension, IScrollEvent, IScrollPosition, Scrollable } from "src/base/common/scrollable";

export interface IAbstractScrollableWidget extends IWidget {

    getScrollDimension(): IScrollDimension;
    getScrollPosition(): IScrollPosition;

    setScrollDimension(update: INewScrollDimension): void;

    render(element: HTMLElement): void;

}

export abstract class AbstractScrollableWidget extends Widget implements IAbstractScrollableWidget {

    // [fields]

    private _opts: IScrollableWidgetOpts;

    protected _scrollable: Scrollable;

    protected _scrollbar: AbstractScrollbar;

    // [constructor]

    constructor(scrollable: Scrollable, opts: IScrollableWidgetCreationOpts) {
        super();

        this._opts = resolveScrollableWidgetOpts(opts);

        this._scrollable = scrollable;

        // create scrollbar
        if (this._opts.scrollbarType === ScrollbarType.vertical) {
            this._scrollbar = new VerticalScrollbar(scrollable, this._opts.scrollbarSize);
        } else {
            this._scrollbar = new HorizontalScrollbar(scrollable, this._opts.scrollbarSize);
        }

        this._scrollable.onDidScroll((e: IScrollEvent) => {
            this._onDidScroll(e);
        })

    }

    // [methods - get]

    public getScrollDimension(): IScrollDimension {
        return this._scrollable.getDimension();
    }

    public getScrollPosition(): IScrollPosition {
        return this._scrollable.getPosition();
    }

    // [methods - set]

    public setScrollDimension(update: INewScrollDimension): void {
        this._scrollable.setDimension(update);
    }

    // [methods]

    public override render(element: HTMLElement): void {
        super.render(element);
        const scrollbarElement = document.createElement('div');
        this._scrollbar.render(scrollbarElement);
        element.appendChild(scrollbarElement);
    }

    // [private helper methods]

    /**
     * @description Invokes when scroll happens.
     * @param event The standard scroll event.
     */
    private _onDidScroll(event: IScrollEvent): void {
        this._scrollbar.onDidScroll(event);
        this._rerender();
    }

    /**
     * @description Rerenders the scrollbar and its slider.
     */
    private _rerender(): void {
        this._scrollbar.rerender();
    }

}

export class SmoothScrollableWidget extends AbstractScrollableWidget {

    constructor(scrollable: Scrollable, opts: IScrollableWidgetCreationOpts) {
        super(scrollable, opts);
    }

    public setScrollPosition(update: INewScrollPosition): void {
        this._scrollable.setScrollPositionSmoothly(update);
    }

}

