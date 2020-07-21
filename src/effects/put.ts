import * as effects from 'redux-saga/effects'
import Context from '../Context'
import { next } from '../next'

export const put = (context: Context, expected: any) => {
    const { expectFn } = context
    expectFn(next(context).value).toStrictEqual(effects.put(expected))
    return undefined
}
