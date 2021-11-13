import { createRenderer } from "@vue/runtime-core";
import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'
const renderer = createRenderer({
    createElement(type) {
        // console.log(type);
        // pixi绘制矩形
        let element
        switch (type) {
            case "Container":
                element = new Container()
                break
            case "Sprite":
                element = new Sprite()
                break
        }
        return element;
    },
    patchProp(el, key, preValue, nextValue) {
        switch (key) {
            case "texture":
                el.texture = Texture.from(nextValue);
                break
            case 'onClick':
                el.on("pointertap", nextValue);
            default:
                el[key] = nextValue;
        }
    },
    setElementText(node, text) {
        const cText = new Text(text);
        node.addChild(cText);
    },
    createText(text) {
        return new Text(text);
    },
    insert(el, parent) {
        // console.log(el);
        // console.log(parent);
        parent.addChild(el);
    },
    createComment() { },
    parentNode() { },
    nextSibling() { },
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    }
});
export function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
};