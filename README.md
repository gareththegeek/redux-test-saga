# redux-test-saga

## Easy redux saga testing with jest

### Installation
```bash
npm install --save-dev redux-test-saga
```
or
```bash
yarn add --dev redux-test-saga
```

### Usage example

```typescript
export function* fetchWossnamesSaga(action: Action) {
    yield put(fetchWossnamesStart())

    try {
        const { success, error, wossnames } = yield call(fetchWossnames)
        if (success) {
            yield put(fetchWossnamesSuccess(wossnames))
        } else {
            yield put(fetchWossnamesFailure(error))
        }
    } catch (e) {
        yield put(fetchWossnamesFailure(e.message))
    }
}
```

```typescript
import { testSaga } from 'redux-test-saga'
import { fetchWossnames } from './actions'
//etc.

describe('fetchWossnameSaga', () => {
    it('handles happy path', () => {
        const wossnames = [{ foo: 'bar' }]

        testSaga(fetchWossnamesSaga, fetchWossnames())
            .put(fetchWossnamesStart())
            .call(fetchWossnames)
            .result({ success: true, wossnames })
            .put(fetchWossnamesSuccess(wossnames))
            .done()
    })

    it('handles unexpeced errors', () => {
        testSaga(fetchWossnamesSaga, fetchWossnames())
            .put(fetchWossnamesStart())
            .call(fetchWossnames)
            .throw(new Error('Oh no'))
            .put(fetchWossnamesFailure('Oh no'))
            .done()
    })
})
```