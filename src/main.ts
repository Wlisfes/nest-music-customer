import '@/style/index.scss'
import App from '@/App.vue'
import { divineMounte } from '@/utils/utils-common'
import { useResizeRemer } from '@/utils/utils-resize'
import { createBootstrap } from '@/utils/utils-app'

async function bootstrap() {
    const { app } = createBootstrap(App)
    return divineMounte(async () => {
        await useResizeRemer()
        app.mount('#app')
    })
}
bootstrap()
