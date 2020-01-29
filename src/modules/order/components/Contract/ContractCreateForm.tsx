import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
import {
  InputField,
  UniversalSearchField,
  RadioButtonBorderedField,
  DateField,
  InputAddonInlineLabel,
  InputRateField,
  CheckboxField,
  CheckboxBordered,
  BillingFields
} from 'components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import {InputLabel} from 'components/UI'
import * as ROUTES from 'constants/routes'
import * as API from 'constants/api'
import {Merge, TData, TGetDataFromState,  TPositionItem} from 'types'
import {path, pathOr} from "ramda";
import {
  DoubleField,
  FlexFieldWrap,
  DisplayFlex,

} from "components/StyledElems";
import styled from "styled-components";


const FeeCeiling = styled.div`
  position: absolute;
  top: -32px;
  right: 0;
`

type Props = Merge<FormRenderProps, {
  positionData: TGetDataFromState<TData<TPositionItem>>
}>

const EMPTY_ARR = []
const ContractCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, positionData, values } = props
  const positionList = pathOr<TPositionItem[]>(EMPTY_ARR, ['data', 'results'], positionData)
  const bankAccount = path<number>(['bankAccount', 'id'], values)
  const hourlyHasFeeCeiling = path<boolean>(['hourlyHasFeeCeiling'], values)
  return (
    <form onSubmit={handleSubmit}>
      <DoubleField >
      <div>
      <FieldWrapper>
        <Field
          label="Client"
          name="client"
          api={API.CLIENT_LIST}
          component={UniversalSearchField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Branch"
          name="branch"
          api={API.BRANCH_LIST}
          component={UniversalSearchField} />
      </FieldWrapper>
      <FieldWrapper>
        <DoubleField>
          <Field
            label="Bank Account"
            name="bankAccount"
            api={API.BANK_ACCOUNT_LIST}
            component={UniversalSearchField} />
          <Field
            label="Currency"
            name="currency"
            api={API.CURRENCY_LIST}
            params={{bankAccount}}
            parent={bankAccount}
            disabled={!Boolean(bankAccount)}
            component={UniversalSearchField} />
        </DoubleField>

      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Deadline"
          name="deadLine"
          component={DateField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Payment expected in"
          addon="days after invoice delivery"
          name="paymentDate"
          leftWidth="220px"
          rightWidth="220px"
          component={InputAddonInlineLabel} />
      </FieldWrapper>
      </div>

      <div>
        <InputLabel>Billing Type</InputLabel>
        <BillingFields
          hourlyHasFeeCeiling={hourlyHasFeeCeiling}
          positionList={positionList}
        />
      </div>
      </DoubleField>
      <CreateCancelButtons
        cancelPath={ROUTES.GROUP_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default ContractCreateForm