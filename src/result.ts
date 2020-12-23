import Context from './Context'
import PreviousResult from './PreviousResult'

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const result = (_: Context, value: any): PreviousResult => {
    return { result: value }
}
