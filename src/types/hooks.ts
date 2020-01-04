import { THistory, ThunkResult } from './index'

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
    autoClose: boolean;
    key?: string | any;
    onSubmit?: (event: Event, onClose?: () => void) => Promise<void>;
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
    initialValues: object;
    key?: string | any;
    props?: object;
    onSuccess?: (data, values) => void;
    serializer?: (values: object) => void;
}
