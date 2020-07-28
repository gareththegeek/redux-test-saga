import Context from './Context'
import PreviousResult from './PreviousResult'

export const result = (_: Context, value: any): PreviousResult => {
    return { result: value }
}
