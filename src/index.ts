import { Action } from 'redux'
import TestSaga from './TestSaga'
import { result } from './result'
import { done } from './done'
import { put } from './effects/put'
import { call } from './effects/call'
import { select } from './effects/select'
import { throwImpl } from './throw'
import { take } from './effects/take'

export { TestSaga }

export const testSaga = (saga: (action: Action) => Generator, action: Action, expectFn = expect): TestSaga => {
    const context = {
        previousResult: undefined,
        generator: saga(action),
        expectFn,
    }

    /* eslint-disable-next-line @typescript-eslint/ban-types */
    const impurify = (func: Function) => (...args: any[]) => {
        context.previousResult = func(context, ...args)
        return api
    }

    const api = {
        result: impurify(result),
        put: impurify(put),
        call: impurify(call),
        select: impurify(select),
        take: impurify(take),
        throw: impurify(throwImpl),
        done: impurify(done),
    }

    return api
}
