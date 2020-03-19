import React, { FunctionComponent, Fragment } from 'react'
import {
  Form,
  Field
} from 'react-final-form'
import * as ROUTES from 'constants/routes'
import { DetailMenu } from 'components/Menu'
import { DoubleField, FieldWrapper, Tag, ActionButtons } from 'components/StyledElems'
import { Box, InputLabel } from 'components/UI'
import { Table, TableRow, TableHeader, TableCol } from 'components/Table'
import { Row, Col, ColRight } from 'components/UI/Grid'
import { Button, SecondaryButton } from 'components/UI/Buttons'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import {
  DateField,
  InputField
} from 'components/Form'
import {
  PreInvoiceAssignmentItem,
  TGetDataFromState,
  TOnSubmit, TPreInvoiceItem
} from 'types'
import { path, pathOr } from 'ramda'
import { TUseCreate } from 'types/hooks'
import styled from 'styled-components'

const RowUI = styled(Row)`
  padding: 10px 0 10px 10px;
  border-bottom: 1px #efefef solid;
`
const RowItem = styled(Row)`
  padding: 10px 0 10px 30px;
  border-bottom: 1px #efefef solid;
  align-items: center;
`
const ColUI = styled(Col)`
  
`

type Props = {
  preInvoiceData: TGetDataFromState<TPreInvoiceItem>;
  onSubmit: TOnSubmit;
  createData: TUseCreate;
}

export const fields = [
  'name'
]

const InvoicedCreate: FunctionComponent<Props> = props => {
  const {
    createData,
    preInvoiceData
  } = props

  const clientName = path(['data', 'client', 'name'], preInvoiceData)
  const assignmentList = pathOr<PreInvoiceAssignmentItem[]>([], ['data', 'assignments'], preInvoiceData)
  return (
    <div>
      <DetailMenu title={'Invoice for ' + clientName} />
      <Box padding='25px'>
        <Form
          onSubmit={createData.onSubmit}
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
                      <TableCol span={2}>Type</TableCol>
                      <TableCol span={4}>Date</TableCol>
                      <TableCol span={14}>Description</TableCol>
                      <TableCol span={4}>amount</TableCol>
                    </TableRow>
                  </TableHeader>
                </Table>
                {assignmentList.map(assign => (
                  <Fragment key={assign.id}>
                    <RowUI key={assign.id}>
                      <ColUI span={12}>
                        {assign.assignment.name}
                      </ColUI>
                    </RowUI>
                    {assign.fees.map(fee => (
                      <RowItem key={fee.id}>
                        <Col span={2}><Tag>Fee</Tag></Col>
                        <Col span={4}>{fee.date}</Col>
                        <Col span={14}>{fee.description}</Col>
                        <Col span={4}>{fee.amount}</Col>
                      </RowItem>
                    ))}
                    {assign.expenses.map(exp => (
                      <RowItem key={exp.id}>
                        <Col span={2}><Tag>Exp</Tag></Col>
                        <Col span={4}>{exp.date}</Col>
                        <Col span={14}>{exp.description}</Col>
                        <Col span={4}>{exp.amount}</Col>
                      </RowItem>
                    ))}
                  </Fragment>
                ))}
                <CreateCancelButtons
                  cancelPath={ROUTES.UNINVOICED_LIST_PATH}
                  loading={false}
                  submitText='Create Invoice'
                />
              </form>
            )
          }}
        />
      </Box>
    </div>
  )
}

export default InvoicedCreate
