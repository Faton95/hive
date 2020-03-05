import React from 'react'
import { sprintf } from 'sprintf-js'
import { DEFAULT_PICK_PARAMS } from 'utils/isEquals'
import { usePromiseDispatch } from 'etc/reducers'
import useCreate from 'hooks/useCreate'
import { useUpdateTimeSheet } from 'modules/billing/hooks'
import { pathOr } from 'ramda'
import {
  useFetchList,
  useFilterActions,
  useDelete,
  useCreateModal,
  useCustomModal
} from '../../../hooks'
import {
  timeSheetListFetch,
  timeSheetDeleteAction,
  timeSheetCreateAction,
  timeSheetUpdateAction, timeSheetChangeStatusAction
} from '../action/actions'
import { createSerializer, updateSerializer, startStopSerializer } from '../serializers/timeSheetSerializer'
import * as stateNames from '../../../constants/stateNames'
import TimeSheetList from '../components/TimeSheetList'
import { fields } from '../components/OutsourceListFilterForm'
import * as ROUTES from '../../../constants/routes'

export const UPDATE_MODAL = 'updateModal'
const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'tags',
]
const TimeSheetListContainer = props => {
  const dispatch = usePromiseDispatch()
  const data = useFetchList({
    action: timeSheetListFetch,
    stateName: stateNames.TIME_SHEET_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.TIME_SHEET_DELETE,
    action: timeSheetDeleteAction,
    successAction: timeSheetListFetch
  })

  const createModal = useCreateModal({
    action: timeSheetCreateAction,
    key: 'createModal',
    serializer: createSerializer,
    stateName: stateNames.TIME_SHEET_CREATE,
    onSuccess: _ => dispatch(timeSheetListFetch({}))
  })

  const list = pathOr([], ['data', 'results'], data)
  const updateTimeSheet = useUpdateTimeSheet(list)

  const updateAction = useCreate({
    serializer: updateSerializer,
    action: timeSheetUpdateAction,
    stateName: stateNames.TIME_SHEET_LIST,
    onSuccess: _ => dispatch(timeSheetListFetch({})).then(() => updateTimeSheet.onClose())
  })

  const onStatusChange = (id) => dispatch(timeSheetChangeStatusAction(id))
    .then(() => dispatch(timeSheetListFetch({})))

  const filterAction = useFilterActions({ fields })

  return (
    <TimeSheetList
      data={data}
      filterAction={filterAction}
      updateTimeSheet={updateTimeSheet}
      deleteData={deleteData}
      createModal={createModal}
      onStatusChange={onStatusChange}
      updateAction={updateAction}
    />
  )
}

export default TimeSheetListContainer
