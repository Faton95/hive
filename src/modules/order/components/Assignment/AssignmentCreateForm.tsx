import * as ROUTES from 'constants/routes'
import * as API from 'constants/api'
import React, { FunctionComponent, useEffect } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper, DisplayFlex, DoubleField } from 'components/StyledElems'
import {
  InputField,
  UniversalSearchField,
  UniversalMultiSelectField,
  CheckboxBordered,
  RadioButtonSimpleField,
  InputAddonInlineLabel,
  DateField,
  BillingFields
} from 'components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import { InputLabel } from 'components/UI'
import { Merge, TData, TGetDataFromState, TPositionItem, TRateItem } from 'types'
import { TContractItem } from 'types/models'
import { path, pathOr, pick, propOr } from 'ramda'
import styled from 'styled-components'
import { getPositionRate } from 'utils/get'

import isEqual from 'react-fast-compare'

const Label = styled(InputLabel)`
  margin-bottom: 10px;
`

type Props = Merge<
  FormRenderProps,
  {
    positionData: TGetDataFromState<TData<TPositionItem>>;
  }
>;

const namesFromContract = [
  'billingType',
  'fixedFeeAmount',
  'fixedFeeExpensesIncludedInFee',
  'hourlyHasFeeCeiling',
  'hourlyFeeCeiling',
  'successFee',
  'deadLine',
  'paymentDuration',
  'paymentDate',
  'client',
  'branch',
  'currency',
  'bankAccount',
  'serviceProvidedTo'
]
const EMPTY_ARR = []
const AssignmentCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, positionData, values, form } = props
  const contract = path<TContractItem>(['contract'], values)
  const contractId = path<number>(['id'], contract)
  const client = path<number>(['client', 'id'], values)

  useEffect(() => {
    form.change('serviceProvidedTo.id', client)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])

  useEffect(() => {
    if (contractId) {
      const pickedValues = pick(namesFromContract, contract)
      const rateList = propOr<Array<TRateItem>, TContractItem, TRateItem[]>([], 'rates', contract)
      const rates = getPositionRate(rateList)

      form.initialize({ ...pickedValues, rates, isBillable: true, contract })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId])

  const positionList = pathOr<TPositionItem[]>(EMPTY_ARR, ['data', 'results'], positionData)


  const billable = path<number>(['isBillable'], values)
  const hourlyHasFeeCeiling = path<boolean>(['hourlyHasFeeCeiling'], values)
  return (
    <form onSubmit={handleSubmit}>
      <DoubleField>
        <div>
          <FieldWrapper>
            <Field
              label='Client'
              name='client'
              api={API.CLIENT_LIST}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Contract'
              name='contract'
              itemText={['contractNumber']}
              api={API.CONTRACT_LIST}
              params={{ client }}
              parent={client}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Service provided to'
              name='serviceProvidedTo'
              api={API.CLIENT_LIST}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field label='Assignment' name='name' component={InputField} />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Service delivered by'
              name='branch'
              api={API.BRANCH_LIST}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Tags'
              name='tags'
              api={API.TAGS_LIST}
              component={UniversalMultiSelectField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Originated by'
              name='originatedBy'
              itemText={['fullName']}
              api={API.STAFF_LIST}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Team Leader'
              name='teamLeader'
              api={API.STAFF_LIST}
              itemText={['fullName']}
              component={UniversalSearchField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label='Work group'
              name='workGroup'
              itemText={['fullName']}
              api={API.STAFF_LIST}
              component={UniversalMultiSelectField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <DoubleField>
              <Field
                label='Created on'
                name='createdDate'
                component={DateField}
              />
              <Field
                label='Deadline'
                name='deadLine'
                appendToBody
                component={DateField}
              />
            </DoubleField>
          </FieldWrapper>
        </div>

        <div>
          <FieldWrapper>
            <Field
              name='isBillable'
              label={{ checkbox: 'Billable', field: 'Billing' }}
              component={CheckboxBordered}
              defaultValue
              type='checkbox'
            />
          </FieldWrapper>
          {billable && (
            <>
              <FieldWrapper>
                <Field
                  label='Payment Destination'
                  name='paymentDestination'
                  api={API.BRANCH_LIST}
                  component={UniversalSearchField}
                />
              </FieldWrapper>
              <FieldWrapper>
                <DoubleField>
                  <Field
                    label='Bank Account'
                    name='bankAccount'
                    api={API.BANK_ACCOUNT_LIST}
                    component={UniversalSearchField}
                  />
                  <Field
                    label='Currency'
                    name='currency'
                    api={API.CURRENCY_LIST}
                    component={UniversalSearchField}
                  />
                </DoubleField>
              </FieldWrapper>
              <BillingFields
                positionList={positionList}
                hourlyHasFeeCeiling={hourlyHasFeeCeiling}
              />
              <FieldWrapper>
                <Label>Invoice Delivered By</Label>
                <DisplayFlex>
                  <Field
                    name='invoiceDeliveredBy'
                    component={RadioButtonSimpleField}
                    label='Billing department'
                    value='billing_department'
                    type='radio'
                  />
                  <Field
                    name='invoiceDeliveredBy'
                    component={RadioButtonSimpleField}
                    label='Team Leader'
                    value='team_leader'
                    type='radio'
                  />
                </DisplayFlex>
              </FieldWrapper>
              <FieldWrapper>
                <Field
                  label='Payment expected in'
                  addon='days after invoice delivery'
                  name='paymentDuration'
                  leftWidth='220px'
                  rightWidth='220px'
                  component={InputAddonInlineLabel}
                />
              </FieldWrapper>
            </>
          )}
        </div>
      </DoubleField>

      <CreateCancelButtons
        cancelPath={ROUTES.ASSIGNMENT_LIST_PATH}
        submitText='Save'
      />
    </form>
  )
}

export default AssignmentCreateForm
