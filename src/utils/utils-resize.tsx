import _ from 'lodash'
import { divineMounte, divineHandler } from '@/utils/utils-common'

export function useResizeRemer() {
    async function onResizeRemer() {
        const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
        const fontSize = (clientWidth >= 1280 ? 1280 : clientWidth) / 100 + 'px'
        return (document.documentElement.style.fontSize = fontSize)
    }

    const debounce = _.debounce(onResizeRemer, 300)

    async function done() {
        return await divineHandler(useResizeRemer.prototype.instance, {
            handler: async () => {
                useResizeRemer.prototype.instance = undefined
                window.addEventListener('resize', debounce)
            }
        })
    }

    divineMounte(async () => {
        await onResizeRemer()
        return await divineHandler(!useResizeRemer.prototype.instance, {
            handler: async () => {
                useResizeRemer.prototype.instance = onResizeRemer
                window.addEventListener('resize', onResizeRemer)
            }
        })
    })

    return { done }
}
