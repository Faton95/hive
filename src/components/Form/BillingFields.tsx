import React, { FunctionComponent } from 'react'
import { FieldWrapper } from 'components/StyledElems'
import { Field } from 'react-final-form'
import {
  CheckboxBordered,
  CheckboxField,
  InputField,
  InputRateField,
  RadioButtonBorderedField
} from 'components/Form/index'

import { TPositionItem } from 'types'
import styled from 'styled-components'

const FeeCeiling = styled.div`
  position: absolute;
  top: -32px;
  right: 0;
`

type Props = {
  hourlyHasFeeCeiling: boolean,
  positionList: TPositionItem[],
  isMultiple?: boolean,
  hasContract?: boolean
}
const BillingFields: FunctionComponent<Props> = props => {
  const { isMultiple, hasContract } = props
  return (
    <>
      <FieldWrapper>
        <Field
          name='billingType'
          label='Fixed Fee'
          type='radio'
          value='fixed_fee'
          disabled={hasContract}
          component={RadioButtonBorderedField}
        >
          {!isMultiple &&
            <FieldWrapper>
              <Field
                name='fixedFeeAmount'
                label='Fee amount'
                disabled={hasContract}
                component={InputField}
              />
            </FieldWrapper>}
          <Field
            name='fixedFeeExpensesIncludedInFee'
            label={{ checkbox: 'Expenses included in Fee' }}
            disabled={hasContract}
            type='checkbox'
            component={CheckboxBordered}
          />
        </Field>
      </FieldWrapper>
      <FieldWrapper>
        <Field
          name='billingType'
          label='Hourly Billing'
          type='radio'
          value='hourly_billing'
          disabled={hasContract}
          component={RadioButtonBorderedField}
        >
          <FeeCeiling>
            <Field
              name='hourlyHasFeeCeiling'
              label='Fee Ceiling'
              disabled={hasContract}
              component={CheckboxField}
            />
          </FeeCeiling>
          {props.hourlyHasFeeCeiling && (
            <FieldWrapper>
              <Field
                name='hourlyFeeCeiling'
                label='Fee Ceiling'
                disabled={hasContract}
                component={InputField}
              />
            </FieldWrapper>
          )}

          {props.positionList.map(group => {
            return (
              <FieldWrapper key={group.id}>
                <Field
                  name={`rates[_${group.id}]`}
                  label={group.name}
                  addon='per/hr'
                  disabled={hasContract}
                  component={InputRateField}
                />
              </FieldWrapper>
            )
          })}
        </Field>

      </FieldWrapper>
      <FieldWrapper>
        <Field
          name='successFee'
          label='Success Fee'
          disabled={hasContract}
          component={InputField}
        />
      </FieldWrapper>
    </>
  )
}

export default BillingFields
