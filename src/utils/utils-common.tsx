import dayjs from 'dayjs'

/**时间格式化**/
export const moment = dayjs

/**事件默认**/
export function prevent(e: Event, handler?: Function) {
    e.preventDefault()
    return handler?.(e)
}

/**事件阻止**/
export async function stop(e: Event, handler: Function = Function) {
    e.preventDefault()
    e.stopPropagation()
    return await handler(e)
}

/**即时函数**/
export async function divineMounte(handler: Function) {
    return await handler()
}

/**条件函数执行**/
export async function divineHandler<R = Record<string, never>>(
    value: boolean | Function,
    option: { handler: Function; callback?: Function; data?: R }
): Promise<R | void> {
    if (typeof value === 'boolean' && value) {
        return await option.handler(option.data)
    } else if (typeof value === 'function' && value()) {
        return await option.handler(option.data)
    } else if (typeof option.callback === 'function') {
        return await option.callback(option.data)
    } else {
        return option.data
    }
}
