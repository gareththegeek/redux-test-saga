import Context from './Context'

export const next = (context: Context): IteratorResult<unknown, any> => context.generator.next(context.previousResult)
