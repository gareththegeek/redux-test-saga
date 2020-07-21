import * as effects from 'redux-saga/effects'
import Context from '../Context'
import { next } from '../next'

export const call = (context: Context, expectedFn: (...args: any[]) => any, expectedArgs: any[]) => {
    const { expectFn } = context
    expectFn(next(context).value).toStrictEqual(effects.call(expectedFn, expectedArgs))
    return undefined
}
