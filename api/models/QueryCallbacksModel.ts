export interface QueryCallbacksModel<Data = unknown, Error = unknown> {
    onSuccess?: (data: Data) => void,
    onError?: (error: Error) => void
}

export interface MutationCallbacksModel<Data = unknown, Variables = unknown, Error = unknown> {
    onSuccess?: (data: Data, variables: Variables, context: unknown) => void,
    onError?: (error: Error) => void
}
