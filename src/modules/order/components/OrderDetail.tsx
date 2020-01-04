import React from 'react'
import styled from 'styled-components'
import { path, prop, propOr } from 'ramda'
import dateFormat from '../../../utils/dateFormat'
import { DetailMenu } from '../../../components/Menu'
import { DisplayFlex } from '../../../components/StyledElems'
import {
  DetailTitle,
  LabeledValue,
  DetailDropdown,
  LabelGrid
} from '../../../components/DetailComponents'
import { Box, DropdownItem } from '../../../components/UI'
import {
  TableRow,
  Table,
  TableCol,
  TableBody,
  TableHeader
} from '../../../components/Table'

const StyledTitle = styled(DetailTitle)`
  margin-bottom: 36px;
`

const StyledLabeledVal = styled(LabeledValue)`
  margin-right: 70px;
`

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`

const MainInfo = styled('div')`
//  border-bottom: ${props => props.theme.border};
  margin-bottom: 25px;
  padding-bottom: 25px;
`

const WorkStationDetail = props => {
  const {
    item,
    remove: { onDelete },
    onEdit
  } = props

  const details = prop('data', item)
  const name = prop('name', details)
  const id = prop('id', details)
  const code = prop('code', details)
  const timeEfficiency = prop('timeEfficiency', details)
  const capacity = prop('capacity', details)
  const workTime = path(['workTime', 'name'], details)
  const status = prop('status', details)
  const oee = prop('oee', details)
  const beforeTime = prop('beforeTime', details)
  const afterTime = prop('afterTime', details)

  const manufactory = prop('manufactory', details)
  const equipments: Array<any> = propOr([], 'equipments', details)
  const description = prop('description', details)

  return (
    <DetailMenu title={'Рабочая станция'}>
      <Box padding={'25px'}>
        <Header alignItems={'center'} justifyContent={'flex-end'}>
          <DetailDropdown marginLeft={'50px'}>
            <DropdownItem onClick={() => onEdit(id)} toggleMenu={() => null}>Изменить</DropdownItem>
            <DropdownItem onClick={() => onDelete(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>

        <span data-cy={'code'}>{code}</span>
        <StyledTitle data-cy={'name'}>{name}</StyledTitle>

        <div>
          <Table list={equipments}>
            <TableHeader>
              <TableRow>
                <TableCol span={9}>Наименование</TableCol>
                <TableCol span={5}>Категория оборудования</TableCol>
                <TableCol span={5}>Последнее обсл.</TableCol>
                <TableCol span={5}>планируемое обсл.</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((item, index) => {
                const name = prop('name', item)
                const category = path(['category', 'name'], item)
                const lastInstrumentsMaintenanceDate = dateFormat(
                  prop('lastInstrumentsMaintenanceDate', item)
                )
                const plannedInspectionDate = dateFormat(
                  prop('plannedInspectionDate', item)
                )
                return (
                  <TableRow key={index} align={'center'}>
                    <TableCol span={9}>{name}</TableCol>
                    <TableCol span={5}>{category}</TableCol>
                    <TableCol span={5}>
                      {lastInstrumentsMaintenanceDate}
                    </TableCol>
                    <TableCol span={5}>{plannedInspectionDate}</TableCol>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Box>
    </DetailMenu>
  )
}

export default WorkStationDetail
