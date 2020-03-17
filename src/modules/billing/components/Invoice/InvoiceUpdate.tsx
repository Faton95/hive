import React, { FunctionComponent, Fragment } from 'react'
import {
  Form,
  Field
} from 'react-final-form'

import { DetailMenu } from 'components/Menu'
import { DoubleField, FieldWrapper, Tag } from 'components/StyledElems'
import { Box, InputLabel } from 'components/UI'
import { Table, TableRow, TableHeader, TableCol } from 'components/Table'
import { Row, Col } from 'components/UI/Grid'
import { Button, SecondaryButton } from 'components/UI/Buttons'
import {
  DateField,
  InputField
} from 'components/Form'
import {
  TGetDataFromState, TInvoiceAssignmentItem, TInvoiceItem
} from 'types'
import { pathOr } from 'ramda'
import { TUseUpdate } from 'types/hooks'
import styled from 'styled-components'
import dateFormat from 'utils/dateFormat'

const RowUI = styled(Row)`
  padding: 10px 0 10px 10px;
  border-bottom: 1px #efefef solid;
`
const RowItem = styled(Row)`
  padding: 10px 0 10px 30px;
  border-bottom: 1px #efefef solid;
`
const ColUI = styled(Col)`
  font-weight: 600;
  padding-top: 15px;
 
`

type Props = {
  invoiceData: TGetDataFromState<TInvoiceItem>;
  updateData: TUseUpdate;
}

export const fields = [
  'name'
]

const InvoicedCreate: FunctionComponent<Props> = props => {
  const {
    updateData,
    invoiceData
  } = props

  const assignmentList = pathOr<TInvoiceAssignmentItem[]>([], ['data', 'assignments'], invoiceData)
  return (
    <div>
      <DetailMenu title='Invoice for ' />
      <Box padding='25px'>
        <Form
          onSubmit={updateData.onSubmit}
          initialValues={updateData.initialValues}
          render={(formikProps) => {
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <DoubleField>
                  <div>
                    <FieldWrapper>
                      <Field
                        name='number'
                        label='Invoice ID'
                        component={InputField}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name='description'
                        label='subject'
                        component={InputField}
                      />
                    </FieldWrapper>
                  </div>
                  <div>
                    <FieldWrapper>
                      <Field
                        name='issueDate'
                        label='Issue Date'
                        component={DateField}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name='dueDate'
                        label='Due Date'
                        component={DateField}
                      />
                    </FieldWrapper>
                  </div>
                </DoubleField>
                <FieldWrapper />
                <InputLabel>Time & materials</InputLabel>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCol span={6}>Date</TableCol>
                      <TableCol span={12}>Description</TableCol>
                      <TableCol span={6}>Amount</TableCol>
                    </TableRow>
                  </TableHeader>
                </Table>
                {assignmentList.map(assign => (
                  <Fragment key={assign.id}>
                    <RowUI key={assign.id}>
                      <ColUI span={12}>{assign.assignment.name}</ColUI>
                    </RowUI>
                    {assign.fees.map(fee => (
                      <RowItem key={fee.id}>
                        <Col span={2}><Tag>Fee</Tag></Col>
                        <Col span={6}>{dateFormat(fee.date)}</Col>
                        <Col span={12}>{fee.description}</Col>
                        <Col span={4}>{fee.amount}</Col>
                      </RowItem>
                    ))}
                    {assign.expenses.map(exp => (
                      <RowItem key={exp.id}>
                        <Col span={2}><Tag>Exp</Tag></Col>
                        <Col span={6}>{dateFormat(exp.date)}</Col>
                        <Col span={12}>{exp.description}</Col>
                        <Col span={4}>{exp.amount}</Col>
                      </RowItem>
                    ))}
                  </Fragment>
                ))}
                <SecondaryButton>Cancel</SecondaryButton>
                <Button type='submit'>Review Invoice</Button>
              </form>
            )
          }}
        />
      </Box>
    </div>
  )
}

export default InvoicedCreate
