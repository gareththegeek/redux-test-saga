import { Action } from 'redux'

export default interface TestSaga {
    result: (value: any) => TestSaga
    put: (expected: Action) => TestSaga
    call: (expectedFn: (...args: any[]) => any, ...expected: any[]) => TestSaga
    select: (expectedFn: (...args: any[]) => any) => TestSaga
    throw: (error: Error) => TestSaga
    // TODO apply cps putResolve fork spawn join cancel actionChannel flush cancelled
    // TODO setContext getContext delay throttle debounce retry
    // TODO race all ?
    done: () => void
}
