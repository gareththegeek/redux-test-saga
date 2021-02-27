import * as effects from 'redux-saga/effects'
import Context from '../Context'
import { next } from '../next'

export const take = (context: Context, expectedAction: string | string[]): undefined => {
    const { expectFn } = context
    expectFn(next(context).value).toStrictEqual(effects.take(expectedAction))
    return undefined
}
