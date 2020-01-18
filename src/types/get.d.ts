export type TGetDataFromState<T> = {
    loading: boolean;
    failed: boolean;
    data: T;
}
