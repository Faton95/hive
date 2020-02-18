import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useFilterActions,
  useDelete
} from '../../../hooks'
import { outsourceListFetch, outsourceDeleteAction } from '../action/actions'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import OutsourceList from '../components/OutsourceList'
import { fields } from '../components/OutsourceListFilterForm'
import { DEFAULT_PICK_PARAMS } from '../../../utils/isEquals'
import * as ROUTES from '../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'tags',
]
const OutsourceListContainer = props => {
  const data = useFetchList({
    action: outsourceListFetch,
    stateName: stateNames.OUTSOURCE_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.OUTSOURCE_DELETE,
    action: outsourceDeleteAction,
    successAction: outsourceListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.OUTSOURCE_UPDATE_URL, id))
  return (
      <OutsourceList
        data={data}
        filterAction={filterAction}
        onEdit={onEdit}
        deleteData={deleteData}
      />
  )
}

export default OutsourceListContainer
