/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'redux'
import { put, call } from 'redux-saga/effects'

export interface TestSaga {
    result: (value: any) => TestSaga
    put: (expected: any) => TestSaga
    call: (expectedFn: (...args: any[]) => any, ...expected: any[]) => TestSaga
    // TODO apply cps putResolve fork spawn join cancel select actionChannel flush cancelled
    // TODO setContext getContext delay throttle debounce retry
    // TODO race all ?
    done: () => void
}

export const testSaga = (saga: (action: Action) => Generator, action: Action, expectFn = expect): TestSaga => {
    let previousResult: any = undefined

    const buildChainable = () => ({
        result: (value: any) => {
            previousResult = value
            return buildChainable()
        },
        put: (expected: any) => {
            expectFn(gen.next(previousResult).value).toStrictEqual(put(expected))
            previousResult = undefined
            return buildChainable()
        },
        call: (expectedFn: (...args: any[]) => any, ...expected: any[]) => {
            expectFn(gen.next(previousResult).value).toStrictEqual(call(expectedFn, ...expected))
            previousResult = undefined
            return buildChainable()
        },
        done: () => {
            expectFn(gen.next(previousResult).done).toBe(true)
            previousResult = undefined
        },
    })

    const gen = saga(action)
    return buildChainable()
}
