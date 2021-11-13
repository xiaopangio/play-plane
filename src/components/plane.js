import { defineComponent, h, reactive, watch, toRefs } from '@vue/runtime-core'
import { game } from '../game.js'
import plane from '../../src/assets/plane.png'
export default defineComponent({
    props: ["x", "y"],
    setup(props, ctx) {
        console.log(props);
        // props 是一个只读的响应式对象
        // 方案一
        // const point = reactive({ x: props.x, y: props.y })
        // watch(props, (value) => {
        //     point.x = value.x
        //     point.y = value.y
        // })
        // 方案二
        // props会丢失响应式
        const { x, y } = toRefs(props)
        window.addEventListener('keydown', (e) => {
            if (e.code === "Space") {
                ctx.emit("attack", {
                    x: x.value + 100,
                    y: y.value
                })
            }
        })
        return {
            // point
            x, y
        }
    },
    render(ctx) {
        return h('Container', { x: ctx.x, y: ctx.y }, [
            h('Sprite', { texture: plane }),
        ])
    }
})