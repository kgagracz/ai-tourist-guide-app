export interface QueryCallbacksModel<Data = unknown, Error = unknown> {
    onSuccess?: (data: Data) => void,
    onError?: (error: Error) => void
}
