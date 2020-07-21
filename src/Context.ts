export default interface Context {
    expectFn: jest.Expect
    generator: Generator
    previousResult: any
}
