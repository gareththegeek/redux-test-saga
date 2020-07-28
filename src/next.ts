import Context from './Context'

export const next = (context: Context): IteratorResult<unknown, any> => {
    if (!context.previousResult) {
        return context.generator.next()
    }
    if (!!context.previousResult.throw) {
        return context.generator.throw(context.previousResult.throw)
    }
    return context.generator.next(context.previousResult.result)
}
