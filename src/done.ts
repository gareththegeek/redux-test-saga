import Context from './Context'
import { next } from './next'

export const done = (context: Context) => {
    const { expectFn } = context
    expectFn(next(context).done).toBe(true)
    return undefined
}
