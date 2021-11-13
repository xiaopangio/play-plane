import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../../src/assets/end_page.jpg'
import restartBtnImg from '../../src/assets/restartBtn.png'
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
            h('Sprite', { texture: endPageImg }),
            h('Sprite', {
                texture: restartBtnImg,
                x: 226,
                y: 513,
                interactive: true,
                onClick: ctx.onClick
            })])
    }
})