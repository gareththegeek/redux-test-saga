import * as effects from 'redux-saga/effects'
import Context from '../Context'
import { next } from '../next'
import { Action } from 'redux'

export const put = (context: Context, expected: Action): undefined => {
    const { expectFn } = context
    expectFn(next(context).value).toStrictEqual(effects.put(expected))
    return undefined
}
