import { THistory } from './index'

export type TUseFetchListParams = {
    stateName: string;
    action: (params) => {};
    mapper: (history: THistory, pickparams: Array<string>) => {};
    key: string;
    pickParams: Array<string>;
}
