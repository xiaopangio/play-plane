import { defineComponent, h } from '@vue/runtime-core'
import startPageImg from '../../src/assets/start_page.jpg'
import startBtnImg from '../../src/assets/startBtn.png'
export default defineComponent({
    setup(props, ctx) {
        const onClick = () => {
            console.log('click');
            ctx.emit("changePage", "gamePage")
        }
        return {
            onClick
        }
    },
    render(ctx) {
        return h('Container', [
            h('Sprite', { texture: startPageImg }),
            h('Sprite', {
                texture: startBtnImg,
                x: 226,
                y: 513,
                interactive: true,
                onClick: ctx.onClick
            })])
    }
})