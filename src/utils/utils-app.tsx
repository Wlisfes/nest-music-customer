import { createApp } from 'vue'
import { setupRouter } from '@/router'

export function createBootstrap(RootComponent: Parameters<typeof createApp>['0']) {
    const app = createApp(RootComponent)
    setupRouter(app)
    return { app }
}
