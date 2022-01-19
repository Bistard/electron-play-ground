import { ifOrDefault } from "src/base/common/types";

export enum ScrollbarType { 
    vertical,
    horizontal
}

export interface IScrollableWidgetCreationOpts {

    /**
     * @readonly Types of scrollbar that the widget supports.
     * @default ScrollbarType.vertical
     * 
     * @note (right now it cannot support both types at the same time)
     */
    scrollbarType?: ScrollbarType;

    /**
	 * @readonly Makes mouse wheel scrolling smooth.
	 * @default true
	 */
	mouseWheelScrollSmoothly?: boolean;

    /**
     * @readonly A multiplier to be used on the `deltaX` and `deltaY` of mouse 
     * wheel scroll events.
	 * @default 1
     */
    mouseWheelScrollSensibility?: number;

    /**
     * @readonly When the scrollbar is vertical, means the width of the scrollbar.
     * When the scrollbar is horizontal, means the height of the scrollbar (in pixel).
     * @default 10
     */
    scrollbarSize?: number;
}

export interface IScrollableWidgetOpts {

    scrollbarType: ScrollbarType;
    mouseWheelScrollSmoothly: boolean;
    mouseWheelScrollSensibility: number;
    scrollbarSize: number;

}

/**
 * @description Resolves the given possible incompleted option into a complete 
 * option.
 * @param opts An option might not be completed.
 * @returns A resolved {@link IScrollableWidgetOpts}
 */
export function resolveScrollableWidgetOpts(opts: IScrollableWidgetCreationOpts): IScrollableWidgetOpts {

    return {
        scrollbarType:               ifOrDefault(opts.scrollbarType, ScrollbarType.vertical),
        mouseWheelScrollSmoothly:    ifOrDefault(opts.mouseWheelScrollSmoothly, true),
        mouseWheelScrollSensibility: ifOrDefault(opts.mouseWheelScrollSensibility, 1),
        scrollbarSize:               ifOrDefault(opts.scrollbarSize, 10),
    };

}