import {curry, path, pathOr} from "ramda";

export const getDataFromState = curry((name, state) => ({
    loading: path([name, 'loading'], state),
    failed: path([name, 'failed'], state),
    data: path([name, 'data'], state),
    results: pathOr([], [name, 'data', 'results'], state)
}))
