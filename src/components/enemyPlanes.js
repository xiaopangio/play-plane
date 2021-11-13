import { defineComponent, h, reactive, watch, toRefs } from '@vue/runtime-core'
import { game } from '../game.js'
import enemyImg from '../../src/assets/enemy.png'
export default defineComponent({
    props: ["x", "y"],
    setup(props, ctx) {
        console.log(props);
        const { x, y } = toRefs(props)
        return {
            x, y
        }
    },
    render(ctx) {
        return h('Container', { x: ctx.x, y: ctx.y }, [
            h('Sprite', { texture: enemyImg }),
        ])
    }
})