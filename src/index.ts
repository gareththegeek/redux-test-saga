/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'redux'
import TestSaga from './TestSaga'
import { result } from './result'
import { done } from './done'
import { put } from './effects/put'
import { call } from './effects/call'

export const testSaga = (saga: (action: Action) => Generator, action: Action, expectFn = expect): TestSaga => {
    const context = {
        previousResult: undefined,
        generator: saga(action),
        expectFn,
    }

    const impurify = (func: Function) => (...args: any[]) => {
        context.previousResult = func(context, ...args)
        return api
    }

    const api = {
        result: impurify(result),
        put: impurify(put),
        call: impurify(call),
        done: impurify(done),
    }

    return api
}
