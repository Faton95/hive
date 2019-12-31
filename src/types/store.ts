import { ReducersMapObject } from 'redux'

export type ITodo = {
    text: string;
    isCompleted: boolean;
};
export type ITodoState = {
    list: ITodo[];
};

export type IState = {
    todo: ITodoState;
};

export type IReducers = ReducersMapObject<IState>;
export type AsyncReducers = Partial<IReducers>;
