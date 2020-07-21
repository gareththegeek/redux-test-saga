import Context from './Context'

export const next = (context: Context) => context.generator.next(context.previousResult)
