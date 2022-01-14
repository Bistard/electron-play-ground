
/**
 * @description A {@link Sash} is 
 */
 export class Sash {

    private element: HTMLElement | undefined;
    private parentElement: HTMLElement;

    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
    }

    public create(): void {
        if (this.element) {
            return;
        }
        
        // render
        this.element = document.createElement('div');
        this.element.classList.add('sash');
        this.parentElement.append(this.element);
    }

    public registerListeners(): void {
        if (this.element === undefined) {
            return;
        }

        this.element.addEventListener('mousedown', (e) => {this._initDrag(e)});
    }

    /***************************************************************************
     * Private Helper Functions
     **************************************************************************/

    private startCoordinate: number = 0;
    private startDimention: number = 0;

    private _initDrag(event: MouseEvent): void {
        
        this.startCoordinate = event.clientX;
        this.startDimention = parseInt(document.defaultView!.getComputedStyle(this.element!).left, 10);

        const doDragHelper = (event: MouseEvent) => {
            this.element!.style.left = (this.startDimention + event.clientX - this.startCoordinate) + 'px';
        };

        const stopDragHelper = () => {
            document.documentElement.removeEventListener('mousemove', doDragHelper, false);
            document.documentElement.removeEventListener('mouseup', stopDragHelper, false);
        }

        document.documentElement.addEventListener('mousemove', doDragHelper, false);
        document.documentElement.addEventListener('mouseup', stopDragHelper, false);
    
    }

}
