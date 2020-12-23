import * as effects from 'redux-saga/effects'
import Context from '../Context'
import { next } from '../next'

export const select = (context: Context, expectedFn: (...args: any[]) => any, ...expectedArgs: any[]): undefined => {
    const { expectFn } = context
    expectFn(next(context).value).toStrictEqual(effects.select(expectedFn, ...expectedArgs))
    return undefined
}
