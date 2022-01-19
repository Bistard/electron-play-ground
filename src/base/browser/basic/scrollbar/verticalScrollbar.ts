import { AbstractScrollbar } from "src/base/browser/basic/scrollbar/abstractScrollbar";
import { ScrollBarStatus } from "src/base/browser/basic/scrollbar/scrollbarStatus";
import { IScrollEvent, Scrollable } from "src/base/common/scrollable";

export class VerticalScrollbar extends AbstractScrollbar {

    constructor(scrollable: Scrollable, scrollbarSize: number) {

        const dimension = scrollable.getDimension();
        const position = scrollable.getPosition();
        super({
            scrollable: scrollable,
            status: new ScrollBarStatus(
                scrollbarSize,
                dimension.height,
                dimension.scrollHeight,
                position.scrollTop
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
        element.classList.add('scroll-bar', 'vertical');
        element.style.width = size + 'px';
    }

    protected override __updateSlider(size: number, position: number): void {
        const slider = this._slider;
        slider.style.height = size + 'px';
        slider.style.top = position + 'px';
    }
    
}