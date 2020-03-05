import React, { FunctionComponent, Fragment } from 'react'
import {
  Form,
  Field
} from 'react-final-form'

import { DetailMenu } from 'components/Menu'
import { DoubleField, FieldWrapper } from 'components/StyledElems'
import { Box, InputLabel } from 'components/UI'
import { Table, TableRow, TableHeader, TableCol, TableBody } from 'components/Table'
import { Row, Col } from 'components/UI/Grid'
import { Button, SecondaryButton } from 'components/UI/Buttons'
import {
  DateField,
  UninvoicedAssigmentListField,
  RadioButtonField, InputField
} from 'components/Form'
import {
  PreInvoiceAssignmentItem,
  TAssignmentItem,
  TClientItem,
  TData,
  TGetDataFromState,
  TOnSubmit, TPreInvoiceItem
} from 'types'
import { map, path, pathOr } from 'ramda'
import { TUseCreate } from 'types/hooks'
import styled from 'styled-components'

const RowUI = styled(Row)`
  padding: 10px 0 10px 10px;
  border-bottom: 1px #efefef solid;
`
const RowItem = styled(Row)`
  padding: 10px 0 10px 30px;
  border-bottom: 1px #efefef solid;
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

  const assignmentList = pathOr<PreInvoiceAssignmentItem[]>([], ['data', 'assignments'], preInvoiceData)
  return (
    <div>
      <DetailMenu title="Invoice for " />
      <Box padding="25px">
        <Form
          onSubmit={createData.onSubmit}
          render={(formikProps) => {
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <DoubleField>
                  <div>
                    <FieldWrapper>
                      <Field
                        name="number"
                        label="Invoice ID"
                        component={InputField}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name="description"
                        label="subject"
                        component={InputField}
                      />
                    </FieldWrapper>
                  </div>
                  <div>
                    <FieldWrapper>
                      <Field
                        name="issueDate"
                        label="Issue Date"
                        component={DateField}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name="dueDate"
                        label="Due Date"
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
                      <TableCol span={24}>Name</TableCol>
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
                        <Col span={12}>
                          {fee.description}
                        </Col>
                        <Col span={8}>{fee.amount}</Col>
                        <Col span={6}>{fee.date}</Col>
                      </RowItem>
                    ))}
                    {assign.expenses.map(exp => (
                      <RowItem key={exp.id}>
                        <Col span={12}>
                          {exp.description}
                        </Col>
                        <Col span={8}>{exp.amount}</Col>
                        <Col span={6}>{exp.date}</Col>
                      </RowItem>
                    ))}
                  </Fragment>
                ))}
                <SecondaryButton>Cancel</SecondaryButton>
                <Button type="submit">Review Invoice</Button>
              </form>
            )
          }}
        />
      </Box>
    </div>
  )
}

export default InvoicedCreate
