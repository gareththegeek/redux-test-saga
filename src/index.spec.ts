import { put, call, select } from 'redux-saga/effects'
import { testSaga } from '.'
import { Action } from 'redux'

describe('testSaga', () => {
    let expectMock: jest.Expect | jest.Mock
    let toStrictEqual: jest.Mock
    let toBe: jest.Mock

    beforeEach(() => {
        toStrictEqual = jest.fn()
        toBe = jest.fn()
        expectMock = jest.fn().mockReturnValue({
            toStrictEqual,
            toBe,
        })
    })

    it('correctly expects a put effect', () => {
        // Arrange
        const expected = { type: 'bar' }
        const saga = function* () {
            yield put(expected)
        }

        // Act
        testSaga(saga, { type: 'foo' }, expectMock as jest.Expect).put(expected)

        // Assert
        expect(toStrictEqual).toBeCalledWith(put(expected))
    })

    type Fn = (...args: any[]) => any
    it('correctly expects a call effect', () => {
        // Arrange
        const expectedFn: Fn = (_: number, __: string) => {
            /* STUB */
        }
        const saga = function* () {
            yield call(expectedFn, 1, 'a')
        }

        // Act
        testSaga(saga, { type: 'foo' }, expectMock as jest.Expect).call(expectedFn, 1, 'a')

        // Assert
        expect(toStrictEqual).toBeCalledWith(call(expectedFn, 1, 'a'))
    })

    it('correctly expects a select effect', () => {
        // Arrange
        const expectedFn: Fn = (_: number, __: string) => {
            /* STUB */
        }
        const saga = function* () {
            yield call(expectedFn)
        }

        // Act
        testSaga(saga, { type: 'foo' }, expectMock as jest.Expect).select(expectedFn)

        // Assert
        expect(toStrictEqual).toBeCalledWith(select(expectedFn))
    })

    it('correctly expects that the saga is done', () => {
        // Arrange
        const saga = function* () {
            yield put({ type: 'bar' })
        }

        // Act
        testSaga(saga, { type: 'foo' }, expectMock as jest.Expect)
            .put({ type: 'bar' })
            .done()

        // Assert
        expect(toBe).toBeCalledWith(true)
    })

    interface MockedSaga {
        saga: jest.Mock
        next: jest.Mock
    }

    const buildMockSaga = (): MockedSaga => {
        const next = jest.fn()
        return {
            saga: jest.fn().mockReturnValue({
                next,
            }),
            next,
        }
    }

    it("expects the saga's next value to match the specified expectation", () => {
        // Arrange
        const expected = put({ type: 'bar' })
        const fixture = buildMockSaga()
        fixture.next.mockReturnValue({ value: expected })

        // Act
        testSaga(fixture.saga, { type: 'type' }, expectMock as jest.Expect).put({ type: 'bar' })

        // Assert
        expect(fixture.next).toBeCalledWith()
        expect(expectMock).toBeCalledWith(expected)
    })

    it('passes the specified result into the subsequent call to saga.next', () => {
        // Arrange
        const expected = { success: true }
        const fixture = buildMockSaga()
        fixture.next.mockReturnValue({ value: put({ type: 'bar' }) })

        // Act
        testSaga(fixture.saga, { type: 'type' }, expectMock as jest.Expect)
            .result(expected)
            .put({ type: 'bar' })

        // Assert
        expect(fixture.next).toBeCalledWith(expected)
    })

    it('uses the specified result for subsequent call only', () => {
        // Arrange
        const unexpected = { success: true }
        const fixture = buildMockSaga()
        fixture.next.mockReturnValue({ value: put({ type: 'bar' }) })

        // Act
        testSaga(fixture.saga, { type: 'type' }, expectMock as jest.Expect)
            .put({ type: 'foo' })
            .result(unexpected)
            .put({ type: 'foo' })
            .put({ type: 'bar' })

        // Assert
        expect(fixture.next).toHaveBeenCalledWith()
        expect(fixture.next).toHaveBeenCalledWith(unexpected)
        expect(fixture.next).toHaveBeenCalledWith()
    })

    it('throws specified error into saga', () => {
        const expected = new Error('Oh noes')

        const callFn = () => {/* stub */}
        const saga = function* (action: Action) {
            try {
                yield call(callFn)
                yield put({ type: 'SUCCESS' })
            } catch (e) {
                yield put({ type: 'ERROR', payload: { e } })
            }
        }

        testSaga(saga, { type: 'foo' })
            .call(callFn)
            .throw(expected)
            .put({ type: 'ERROR', payload: { e: expected } } as Action)
    })
})
