import React, { FunctionComponent } from 'react'
import {
  Form,
  Field
} from 'react-final-form'

import { DetailMenu } from 'components/Menu'
import { FieldWrapper } from 'components/StyledElems'
import { Box, Row, Col, InputLabel } from 'components/UI'
import { Button, SecondaryButton } from 'components/UI/Buttons'
import {
  DateField,
  UninvoicedAssigmentListField,
  RadioButtonField
} from 'components/Form'
import {
  TAssignmentItem,
  TClientItem,
  TData,
  TGetDataFromState,
  TOnSubmit
} from 'types'
import { map, path, pathOr } from 'ramda'
import { TUseCreate } from 'types/hooks'

type Props = {
  clientData: TGetDataFromState<TClientItem>;
  assignmentData: TGetDataFromState<TData<TAssignmentItem>>;
  onSubmit: TOnSubmit;
  createData: TUseCreate;
}

export const fields = [
  'name'
]
const UninvoicedCreate: FunctionComponent<Props> = props => {
  const { clientData, assignmentData, createData } = props
  const assignmentList = pathOr<TAssignmentItem[]>([], ['data', 'results'], assignmentData)
  const clientName = path(['data', 'name'], clientData)
  const ids = map(path<number>(['id']), assignmentList)

  return (
    <div>
      <DetailMenu title={'New Invoice for ' + clientName} />
      <Box padding='25px'>
        <Form
          onSubmit={createData.onSubmit}
          render={(formikProps) => {
            const isCustom = path(['values', 'type'], formikProps) === 'custom'
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <FieldWrapper>
                  <InputLabel>What Assignments would you like to invoice?</InputLabel>
                  <Field
                    name='assignments'
                    defaultValue={ids}
                    render={fieldProps => (
                      <UninvoicedAssigmentListField {...fieldProps} list={assignmentList} />
                    )}
                  />
                </FieldWrapper>
                <InputLabel>What hours would you like invoice?</InputLabel>

                <Row>
                  <Col span={12}>
                    <FieldWrapper>
                      <Field
                        name='type'
                        type='radio'
                        value='all'
                        component={RadioButtonField}
                        label='All uninvoiced time & materials'
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name='type'
                        type='radio'
                        value='custom'
                        component={RadioButtonField}
                        label='Include uninvoiced time & materials from custom period'
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      {isCustom && (
                        <Row gutter={20}>
                          <Col span={12}>
                            <Field
                              name='fromDate'
                              label='From Date'
                              component={DateField}
                            />
                          </Col>
                          <Col span={12}>
                            <Field
                              name='toDate'
                              label='To Date'
                              component={DateField}
                            />
                          </Col>
                        </Row>
                      )}
                    </FieldWrapper>
                    <FieldWrapper>
                      <Field
                        name='type'
                        type='radio'
                        value='expenses'
                        component={RadioButtonField}
                        label='Do not include any hours'
                      />
                    </FieldWrapper>
                  </Col>
                  <Col span={12} />
                </Row>
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

export default UninvoicedCreate
