export interface Action<T> {
    payload: T;
    type: string;
}