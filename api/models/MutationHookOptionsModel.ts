export interface MutationHookOptionsModel<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown> {
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => Promise<unknown>
    onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<unknown>
}
