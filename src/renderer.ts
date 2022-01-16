import { Scrollable } from "src/base/browser/basic/scrollable/scrollable";
import { requestAnimationFrame } from "src/base/common/animation";

// [basic]

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// [end]

const scrollable = new Scrollable(125);

let count = 0;
requestAnimationFrame(() => {console.log(window || self || 'undefine')});