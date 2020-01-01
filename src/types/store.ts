import {ReducersMapObject, Store} from 'redux'

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
    asyncReducers?: AsyncReducers
}
export type IReducers = ReducersMapObject<IStore>;
export type AsyncReducers = Partial<IReducers>;
