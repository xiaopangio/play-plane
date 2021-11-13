//根组件
import { defineComponent, h, computed, ref } from "_@vue_runtime-core@3.2.21@@vue/runtime-core";
import startPage from "./page/startPage";
import gamePage from "./page/gamePage";
import endPage from "./page/endPage";
export default defineComponent({
    setup(props, ctx) {
        const currentPageName = ref("startPage");
        // const currentPageName = ref("endPage");
        const currentPage = computed(() => {
            if (currentPageName.value === "startPage") {
                return startPage
            } else if (currentPageName.value === "gamePage") {
                return gamePage
            } else if (currentPageName.value === "endPage") {
                return endPage
            }
        })
        return {
            currentPageName, currentPage
        }
    },

    render(ctx) {
        //创建虚拟节点
        // <rect x=100,y=100>我的头发是真的</rect>
        // const vnode = h('rect', { x: 100, y: 100 }, "我的头发是真的");
        // const vnode = h('rect', { x: 100, y: 100 }, ["我的头发是真的", h(circle)]);
        // console.log(vnode);
        // return vnode
        return h("Container", [h(ctx.currentPage, {
            onChangePage(page) {
                ctx.currentPageName = page
            }
        })])
        // return h("Container", [h(gamePage)])
    }
})