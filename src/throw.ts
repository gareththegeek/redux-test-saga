import Context from './Context'
import PreviousResult from './PreviousResult'

export const throwImpl = (context: Context, error: Error): PreviousResult => {
    return { throw: error }
}
