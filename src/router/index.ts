import type { App } from 'vue'
import { createRouter, createWebHistory, useRoute as useRouteQuery, type Router } from 'vue-router'
import { client } from '@/router/client'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: client
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}

export default router
