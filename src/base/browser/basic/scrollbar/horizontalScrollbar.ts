import { AbstractScrollbar } from "src/base/browser/basic/scrollbar/abstractScrollbar";
import { ScrollBarStatus } from "src/base/browser/basic/scrollbar/scrollbarStatus";
import { IScrollEvent, Scrollable } from "src/base/common/scrollable";

export class HorizontalScrollbar extends AbstractScrollbar {

    constructor(scrollable: Scrollable, size: number) {
        const dimension = scrollable.getDimension();
        const position = scrollable.getPosition();
        super({
            scrollable: scrollable,
            status: new ScrollBarStatus(
                size,
                dimension.width,
                dimension.scrollWidth,
                position.scrollLeft
            )
        });

    }

    // [methods]

    public onDidScroll(event: IScrollEvent): boolean {
        return false;
    }

    // [override abstract methods]

    protected __renderScrollbar(size: number): void {
        const element = this._element!;
        element.classList.add('scroll-bar', 'horizontal');
        element.style.height = size + 'px';
    }

    protected override __updateSlider(size: number, position: number): void {
        const slider = this._slider;
        slider.style.width = size + 'px';
        slider.style.left = position + 'px';
    }
    
}