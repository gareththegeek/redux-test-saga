export default interface TestSaga {
    result: (value: any) => TestSaga
    put: (expected: any) => TestSaga
    call: (expectedFn: (...args: any[]) => any, ...expected: any[]) => TestSaga
    // TODO apply cps putResolve fork spawn join cancel select actionChannel flush cancelled
    // TODO setContext getContext delay throttle debounce retry
    // TODO race all ?
    done: () => void
}
