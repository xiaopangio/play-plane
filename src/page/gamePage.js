import { defineComponent, h, reactive, onMounted, onUnmounted } from '@vue/runtime-core'
import map from '../components/map.js';
import plane from '../components/plane.js';
import enemyPlane from '../components/enemyPlanes.js'
import bullet from '../components/bullet.js';
import { game } from '../game.js';
import { hitTestObject } from '../utils/index.js';
export default defineComponent({

    setup(props, ctx) {
        // 我方飞机
        const { planeInfo } = useCreatePlane();
        // 敌方飞机
        const { enemyPlanes } = useCreateEnemyPlanes();
        // 我方子弹
        const { bullets, addBullet } = useCreateBullets();
        useFighting(enemyPlanes, bullets, planeInfo, ctx);
        //子弹的发射
        const onAttack = (bulletInfo) => {
            addBullet(bulletInfo);
        }
        return {
            planeInfo,
            enemyPlanes,
            bullets,
            onAttack
        }
    },
    render(ctx) {
        const createEnemyPlane = () => {
            return ctx.enemyPlanes.map(info => {
                return h(enemyPlane, { x: info.x, y: info.y })
            })
        }
        const createBullet = () => {
            return ctx.bullets.map(info => {
                return h(bullet, { x: info.x, y: info.y })
            })
        }
        return h('Container', [
            h(map), h(plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }),
            ...createEnemyPlane(), ...createBullet()])
    },

})
function useFighting(enemyPlanes, bullets, planeInfo, ctx) {
    const handleTicker = () => {
        enemyPlanes.forEach(enemyInfo => {
            enemyInfo.y++;
        });
        bullets.forEach(bulletInfo => {
            bulletInfo.y--;
        });
        //我方飞机与敌方飞机的碰撞检测
        enemyPlanes.forEach(enemyInfo => {
            if (hitTestObject(enemyInfo, planeInfo)) {
                ctx.emit("changePage", "endPage");
            }
        });
        // 我方子弹与对方飞机的碰撞
        bullets.forEach((bulletInfo, bulletIndex) => {
            enemyPlanes.forEach((enemyInfo, enemyIndex) => {
                if (hitTestObject(enemyInfo, bulletInfo)) {
                    bullets.splice(bulletIndex, 1);
                    enemyPlanes.splice(enemyIndex, 1);
                }
            });
        });
    };
    onMounted(() => {
        game.ticker.add(handleTicker);
    });
    onUnmounted(() => {
        game.ticker.remove(handleTicker);
    });
}

function useCreatePlane() {
    const planeInfo = reactive({
        x: 150, y: 800, width: 258, height: 364
    })
    const speed = 15;
    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowUp":
                planeInfo.y -= speed;
                break
            case "ArrowDown":
                planeInfo.y += speed;
                break
            case "ArrowLeft":
                planeInfo.x -= speed;
                break
            case "ArrowRight":
                planeInfo.x += speed;
                break
        }
    })
    return { planeInfo }
}
function useCreateEnemyPlanes() {
    const enemyPlanes = reactive([{ x: 50, y: 0, width: 308, height: 207 }])

    return { enemyPlanes }
}
function useCreateBullets() {
    const bullets = reactive([{ x: 900, y: 900, width: 61, height: 99 }])
    function addBullet(info) {
        bullets.push({ ...info, width: 61, height: 99 })
    }
    return { bullets, addBullet }
}