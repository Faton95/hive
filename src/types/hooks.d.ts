import { Merge, TGetDataFromState, THistory } from './index'

export type TUseFetchListParams = {
    stateName: string;
    action: (params) => (dispatch, store) => Promise<void>;
    mapper?: (history: THistory, pickparams: Array<string>) => void;
    pickParams?: Array<string>;
}
export type TUseFetchItemParams = {
    stateName: string;
    action: (params) => (dispatch, store) => Promise<void>;
    key?: string | any;
}
export type TUseModalParams = {
    autoClose?: boolean;
    key?: string | any;
    onSubmit?: (event: Event, onClose?: () => void) => Promise<void>;
}
export type TUseTableActionsParams = {
    fields: Array<string>;
    mapValues?: (values: object) => object;
    mapInitValues?: (values) => void;
}
export type TUseCreateParams = {
    action: (params) => (dispatch, store) => Promise<void>;
    stateName: string;
    redirectUrl?: string;
    onSuccess?: (data, values) => void;
    serializer?: (values) => void;
}
export type TUseUpdateParams = {
    stateName: string;
    action: (id, params) => (dispatch, store) => Promise<void>;
    redirectUrl?: string;
    initialValues?: object;
    key?: string | any;
    onSuccess?: (data, values) => void;
    serializer?: (values: object) => void;
}

export type TUseDeleteParams = {
    stateName: string;
    action: (id) => (dispatch, store) => Promise<void>;
    successAction?: (params) => void;
    idKey?: string | any;
    redirectUrl?: string;
    initialValues?: object;
    key?: string | any;
    onSuccess?: () => void;
    serializer?: (values: object) => void;
    toastParams?: any;
    modalParams?: any;
}

type TExtraUpdate = {
    onSubmit: TOnSubmit;
    initialValues?: object;
    id: any;
    isUpdate: boolean;
}
export type TUseUpdate = Merge<TGetDataFromState<any | null>, TExtraUpdate>
export type TOnSubmit = (action: any) => Promise<void | Pick<any, string | number | symbol>>
export type TUseDelete = Merge<TGetDataFromState<any | null>, {onSubmit: TOnSubmit}>

export type A = any
