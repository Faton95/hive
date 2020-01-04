import { ReducersMapObject, Store } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from '../etc/reducers'

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

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>
export type ThunkDispatchR = ThunkDispatch<any, any, any>
