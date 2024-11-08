export type QueryHookOptionsModel<TData, TResultData> = {
    select?: (data: TData) => TResultData
    enabled?: boolean
}
