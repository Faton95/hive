import { ReducersMapObject, Store } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../etc/reducers'

export type TData<T extends object> = {
    count: number;
    results: T[];
}
export type ITodo = {
    text: string;
    isCompleted: boolean;
};
export type ITodoState = {
    list: ITodo[];
};

export type IStore = {
    todo: ITodoState;
};

export type InitStore = {

}

export interface AsyncStore extends Store {
    asyncReducers?: AsyncReducers;
}
export type IReducers = ReducersMapObject<IStore>;
export type AsyncReducers = Partial<IReducers>;

type ThunkResult<R> = {
    type: string;
    value: object;
}
export type PromiseThunksResult = (action: any) => Promise<ThunkResult<any>>
