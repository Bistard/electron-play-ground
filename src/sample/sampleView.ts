
export interface ISampleViewOpts {
    
    readonly element?: HTMLElement;

    /**
     * If displays a number in the middle of the view.
     */
    readonly number?: boolean;
}

export interface ISampleView {

    readonly element: HTMLElement;

}

export class SampleView implements ISampleView {

    // [fields]

    private static count = 0;
    private _colors?: string[];
    private _element: HTMLElement;
    private _index: number;
    
    // [constructor]

    constructor(opts: ISampleViewOpts) {
        
        this._index = SampleView.count;

        if (opts?.element) {
            this._element = this.element;
            this._index = SampleView.count;
            SampleView.count++;
            return;
        }

        this._element = document.createElement('div');
        this._element.className = 'sample-view';
        this._element.style.background = this.__getNextColor();

        if (opts.number === undefined || opts.number === true) {
            const numberElement = document.createElement('div');
            numberElement.className = 'sample-view-number';
            numberElement.textContent = SampleView.count.toString();
            SampleView.count++;
            this._element.appendChild(numberElement);
        }
    }

    // [public methods]

    get element(): HTMLElement {
        return this._element;
    }

    // [private helper methods]

    private __getNextColor(): string {
        const totalColor = 10;

        if (this._colors === undefined) {
            this._colors = [];
            this.__buildColors([50, 255, 50], [255, 0, 255], totalColor).map(c => this._colors?.push(`rgb(${c.join(',')})`));
        }

        return this._colors[this._index % totalColor]!;
    }

    private __buildColors(start: number[], end: number[], count: number): number[][] {
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

}