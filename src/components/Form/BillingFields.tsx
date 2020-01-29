import React, {FunctionComponent} from 'react'
import {FieldWrapper} from "components/StyledElems";
import {Field} from "react-final-form";
import {
  CheckboxBordered,
  CheckboxField,
  InputField,
  InputRateField,
  RadioButtonBorderedField
} from "components/Form/index";

import {TPositionItem} from "types";
import styled from "styled-components";


const FeeCeiling = styled.div`
  position: absolute;
  top: -32px;
  right: 0;
`

type Props = {
  hourlyHasFeeCeiling: boolean,
  positionList: TPositionItem[]
}
const BillingFields: FunctionComponent<Props> = props => {

  return (
  <>
    <FieldWrapper>
      <Field
        name="billingType"
        label="Fixed Fee"
        type="radio"
        value="fixed"
        component={RadioButtonBorderedField}
      >
        <FieldWrapper>
          <Field
            name="total"
            label="Fee amount"
            component={InputField}/>
        </FieldWrapper>
        <Field
          name="expensesIncludedInFee"
          label={{checkbox: "Expenses included in Fee"}}
          type="checkbox"
          component={CheckboxBordered}/>
      </Field>
    </FieldWrapper>
    <FieldWrapper>
      <Field
        name="billingType"
        label="Hourly Billing"
        type="radio"
        value="hourly"
        component={RadioButtonBorderedField}
      >
        <FeeCeiling>
          <Field
            name="hourlyHasFeeCeiling"
            label="Fee Ceiling"
            component={CheckboxField}
          />
        </FeeCeiling>
        {props.hourlyHasFeeCeiling && (
          <FieldWrapper>
            <Field
              name='feeCeiling'
              label="Fee Ceiling"
              component={InputField}/>
          </FieldWrapper>
        )}

        {props.positionList.map(group => {
          return (
            <FieldWrapper key={group.id}>
              <Field
                name={`rates[_${group.id}]`}
                label={group.name}
                addon="per/hr"
                component={InputRateField}/>
            </FieldWrapper>
          )
        })}
      </Field>

    </FieldWrapper>
    <FieldWrapper>
      <Field
        name="successFee"
        label="Success Fee"
        component={InputField}/>
    </FieldWrapper>
  </>
  )
}

export default BillingFields
