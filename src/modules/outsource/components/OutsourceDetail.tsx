import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { path, prop, map, pathOr } from 'ramda'
import dateFormat from 'utils/dateFormat'
import numberFormat from 'utils/numberFormat'
import { DetailMenu } from 'components/Menu'
import { DisplayFlex } from 'components/StyledElems'
import {
  LabeledValue,
  DetailDropdown
} from 'components/DetailComponents'
import { Box, DropdownItem, Row, Col } from 'components/UI'
import {
  TableRow,
  Table,
  TableCol,
  TableBody,
  TableHeader
} from 'components/Table'
import { TClientItem } from 'types/models'
import { TGetDataFromState } from 'types'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
`
const TagsName = styled.span`
  background-color: #F1F3F5;
  padding: 5px 7px;
  border-radius: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-flex;
`
const CreatedDate = styled.div`
  color: #8F9BB0;
`
const EMPTY_ARR = []

type Props = {
  item: TGetDataFromState<TClientItem>;
  onDelete: (id) => void;
  onEdit: (id) => void;
}
const OutsourceDetail: FunctionComponent<Props> = props => {
  const {
    item,
    onDelete,
    onEdit
  } = props
  const details = prop('data', item)

  const id = prop('id', details)
  const name = prop('name', details)
  const address = prop('address', details)
  const createdDate = prop('createdDate', details)
  const tags = pathOr(EMPTY_ARR, ['tags'], details)
  const contacts = pathOr(EMPTY_ARR, ['contacts'], details)
  const contactIds = map(prop('id'), contacts)

  return (
    <>
      <DetailMenu title={'Outsource №' + id} />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="flex-end">
          <CreatedDate>Создано: {dateFormat(createdDate)}</CreatedDate>
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => onEdit(id)} toggleMenu={() => null}>Update</DropdownItem>
            <DropdownItem onClick={() => onDelete(id)} toggleMenu={() => null}>Delete</DropdownItem>
          </DetailDropdown>
        </Header>
        <Row gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Name">{name}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Address">{address}</LabeledValue>
          </Col>
          <Col span={12}>
            <LabeledValue labelMargin={5} label="Tags">
              {
                tags.map((tag, key) => {
                  return (
                    <TagsName key={key}>{tag.name}</TagsName>
                  )
                })
              }

            </LabeledValue>
          </Col>
        </Row>
        <br/>
        <div>
          <Table list={contactIds}>
            <TableHeader>
              <TableRow>
                <TableCol span={6}>Name</TableCol>
                <TableCol span={6}>Email</TableCol>
                <TableCol span={6}>Phone</TableCol>
                <TableCol span={6}>Position</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact, index) => {
                const name = prop('name', contact)
                const email = prop('email', contact)
                const phone = prop('phone', contact)
                const position = prop('position', contact)
                return (
                  <TableRow key={index} align="center">
                    <TableCol span={6}>{name}</TableCol>
                    <TableCol span={6}>{email}</TableCol>
                    <TableCol span={6}>{phone}</TableCol>
                    <TableCol span={6}>{position}</TableCol>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Box>
    </>
  )
}

export default OutsourceDetail
