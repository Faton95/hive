import { useHistory } from 'react-router-dom'
import { join } from 'ramda'
import { nextOrderingParams, replaceParamsRoute } from '../utils/route'
import { getSelectedFromHistory, getOrderingFromHistory } from '../utils/get'

const useTableActions = () => {
  const history = useHistory()
  const onSort = (keyValue: string): void => {
    const params = nextOrderingParams(history.location.search, keyValue)
    replaceParamsRoute(params, history)
  }

  const onSelect = (keys: Array<string>): void => {
    const selected = join('-', keys)
    replaceParamsRoute({ selected }, history)
  }

  return {
    onSelect,
    onSort,
    initialSelected: getSelectedFromHistory(history),
    initialSorting: getOrderingFromHistory(history)
  }
}

export default useTableActions
