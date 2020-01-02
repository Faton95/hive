import {curry, path, pathOr} from "ramda";
import {TGetDataFromState} from '../types'
export const getDataFromState = curry((name, state): TGetDataFromState => ({
    loading: path([name, 'loading'], state),
    failed: path([name, 'failed'], state),
    data: path([name, 'data'], state),
    results: pathOr([], [name, 'data', 'results'], state)
}))

export const getter = (name, state): TGetDataFromState => {
    const loading: boolean = path([name, 'loading'], state)
    const failed: boolean = path([name, 'failed'], state)
    const data: object = path([name, 'data'], state)
    const results: Array<object> = pathOr([], [name, 'data', 'results'], state)
    return {
        loading,
        failed,
        data,
        results
    }
}
