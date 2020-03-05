import { MENU_KEYS } from 'constants/menus'
import React, { FunctionComponent } from 'react'
import {prop, map, pathOr, propOr, path} from 'ramda'
import {TUseDelete, TGetDataFromState, TData, Merge} from 'types'
import { TClientItem } from 'types/models'
import { TTimeSheetItem } from 'types/models/fee'
import {
  TUseCreateModal,

  TUseCustomModal,
  TUseCreate
} from 'types/hooks'
import ClockWatch from 'components/ClockWatch/ClockWatch'
import moment from 'moment'
import { Menu } from '../../../components/Menu'
import Pagination from '../../../components/Pagination'
import {
  Table,
  TableActions,
  TableRow,
  TableHeader,
  TableCol,
  TableBody
} from '../../../components/Table'
import { Box, Dropdown, DropdownItem } from '../../../components/UI'
import { ButtonSmall } from '../../../components/UI/Buttons'
import OutsourceListFilterForm from './OutsourceListFilterForm'
import TimeSheetCreateModal from './TimeSheetCreateModal'
import TimeSheetUpdateModal from './TimeSheetUpdateModal'
import styled from "styled-components";


const Assignment = styled.div`
  font-weight: 500;
  line-height: 120%;
`
type Props = {
  data: TGetDataFromState<TData<TClientItem>>;
  filterAction: any;
  deleteData: TUseDelete;
  createModal: TUseCreateModal<any>;
  updateAction: TUseCreate;
  updateTimeSheet: Merge<TUseCustomModal, {initialValues: object}>;
  onStatusChange: (id) => Promise<void>;
}
const EMPTY = []
const ZERO = 0

const timeSheetType = {
  stop: 'Finished',
  play: 'Stop',
  paused: 'Play'
}
const getTimeDifference = (start) => {
  const startTime = moment(start, 'YYYY-MM-DDTHH:mm:ss').valueOf()
  const currTime = moment().valueOf()
  return Math.round(((currTime - startTime) / 1000) / 60)
}
const TimeSheetList: FunctionComponent<Props> = props => {
  const {
    data,
    filterAction,
    deleteData,
    createModal,
    updateAction,
    updateTimeSheet,
    onStatusChange
  } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TTimeSheetItem[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)
  const filterForm = (<OutsourceListFilterForm />)
  const actions = (
    <TableActions
      onCreate={createModal.onOpen}
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )

  return (
    <div>
      <Menu title="Client" module={MENU_KEYS.CONTRACT} active={MENU_KEYS.CONTRACT} />
      <Box>
        <Table list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={23}>Task</TableCol>

              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TTimeSheetItem) => {
              const id = prop('id', item)
              const type = timeSheetType[item.type]
              const totalDuration: number = propOr(0, 'totalDuration', item)
              const start = propOr(moment().format('YYYY-MM-DDTHH:mm:ss'), 'startTime', item)
              const assignment = path(['assignment', 'name'], item)
              const description = prop('description', item)
              const total = getTimeDifference(start) + totalDuration

              return (
                <TableRow key={id} align="center">
                  <TableCol span={18}>
                    <Assignment>{assignment}</Assignment>
                    {description}
                  </TableCol>
                  <TableCol span={3}>
                    <ClockWatch status={item.type} totalDuration={total} />
                  </TableCol>
                  <TableCol span={2}>
                    <ButtonSmall onClick={() => onStatusChange(id)}>{type}</ButtonSmall>
                  </TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => updateTimeSheet.onOpen(id)}>
                        Изменить
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Удалить
                      </DropdownItem>
                    </Dropdown>
                  </TableCol>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Pagination count={count} />
      <TimeSheetCreateModal createModal={createModal} />
      <TimeSheetUpdateModal modal={updateTimeSheet} updateAction={updateAction} />
    </div>
  )
}

export default TimeSheetList
