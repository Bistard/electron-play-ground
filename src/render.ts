
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema, defaultMarkdownSerializer } from "prosemirror-markdown";
import { exampleSetup } from "prosemirror-example-setup";

console.log('hello world');

class ProseMirrorView {

    public view: any;

    constructor(target: HTMLElement, content: string) {
        this.view = new EditorView(target, {
            state: EditorState.create({
                schema: schema,
                plugins: exampleSetup({ schema, menuBar: false, })
            })
        });
    }

    get content() {
        return defaultMarkdownSerializer.serialize(this.view.state.doc);
    }
    focus() { this.view.focus(); }
    destroy() { this.view.destroy(); }
}

const container = document.createElement('div');
container.className = 'container';

document.body.appendChild(container);

const view = new ProseMirrorView(container, 'hello world');
