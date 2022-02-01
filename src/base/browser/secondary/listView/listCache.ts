import { IListViewRenderer } from "src/base/browser/secondary/listView/listRenderer";
import { ViewItemType } from "src/base/browser/secondary/listView/listView";
import { IDisposable } from "src/base/common/dispose";
import { removeNodeFromParent } from "src/base/common/dom";

export interface IListViewRow {
	dom: HTMLElement;
	type: ViewItemType;
}

/**
 * @class Storage to store all the DOM elements that are not displaying on the 
 * DOM tree.
 */
export class ListViewCache<T> implements IDisposable {

    private cache: Map<ViewItemType, IListViewRow[]>;
    private renderers: Map<ViewItemType, IListViewRenderer>;

    constructor(
        renderers: Map<ViewItemType, IListViewRenderer>
    ) {
        this.cache = new Map();
        this.renderers = renderers;
    }

    public dispose(): void {
        this.cache.forEach((cache, type) => {
            const renderer = this.renderers.get(type)!;
            cache.forEach(row => {
                renderer.dispose(row.dom);
            });
        });

        this.cache.clear();
    }

    /**
     * @description Creates a new `row` or reusing a previously released `row` 
     * which shares the same type.
     * @param type The type of the row.
     * @returns {IListViewRow}
     */
    public get(type: ViewItemType): IListViewRow {
        let cache = this.__getCache(type);
        let row = cache.pop();

        if (row === undefined) {
            const dom = document.createElement('list-view-item');
            
            // const renderer = this.renderers.get(type);
            // if (renderer === undefined) {
            //     throw new Error(`no renderer provided for the given type: ${type}`);
            // }
            // renderer.render(dom, );
            row = { dom: dom, type: type };
        }

        return row;
    }

    /**
     * @description Releases an existed row for essentially reuse purpose. The 
     * HTMLElement will be removed from the DOM tree and still exists in the 
     * cache.
     * @param row The row about to be released.
     */
    public release(row: IListViewRow): void {
        removeNodeFromParent(row.dom);
        const cache = this.__getCache(row.type);
        cache.push(row);
    }

    private __getCache(type: ViewItemType): IListViewRow[] {
        let cache = this.cache.get(type);

        if (cache === undefined) {
            cache = [];
            this.cache.set(type, cache);
        }

        return cache;
    }

}