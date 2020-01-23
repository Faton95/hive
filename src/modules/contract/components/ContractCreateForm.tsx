import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
import {
  InputField,
  ClientSearchField,
  UniversalSearchField,
  RadioButtonField,
  RadioButtonBorderedField,
  DateField
} from 'components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import {InputLabel} from 'components/UI'
import * as ROUTES from 'constants/routes'
import * as API from 'constants/api'
import {Merge, TData, TGetDataFromState, TGroupItem} from 'types'
import {path, pathOr} from "ramda";
import {
  DoubleField,
  FlexFieldWrap,
  DisplayFlex
} from "components/StyledElems";
import styled from "styled-components";

type Props = Merge<FormRenderProps, {
  groupData: TGetDataFromState<TData<TGroupItem>>
}>
const ContractCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, groupData, values } = props


  const groupList = pathOr<TGroupItem[]>([], ['data', 'results'], groupData)

  const bankAccount = path<number>(['bankAccount', 'id'], values)
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
        <Field
          label="Bank Account"
          name="bankAccount"
          api={API.BANK_ACCOUNT_LIST}
          component={UniversalSearchField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Currency"
          name="currency"
          api={API.CURRENCY_LIST}
          params={{bankAccount}}
          parent={bankAccount}
          disabled={!Boolean(bankAccount)}
          component={UniversalSearchField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Success Fee"
          name="successFee"
          component={InputField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Deadline"
          name="deadLine"
          component={DateField} />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Payment expected in X days after invoice delivery."
          name="paymentDate"
          placeholder="Enter number of days"
          component={InputField} />
      </FieldWrapper>
      </div>

      <div>
        <InputLabel>Billing Type</InputLabel>
        <FieldWrapper>
          <Field
            name="das"
            label="Fixed Fee"
            type="radio"
            value="dd"
            component={RadioButtonBorderedField}
          >
            <Field
              name="total"
              label="Fee amount"
              component={InputField}/>
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Field
            name="das"
            label="Hourly Billing"
            type="radio"
            value="aa"
            component={RadioButtonBorderedField}
          >
            {groupList.map(group => {
              return (
                <Field
                  name={`rates[${group.id}]`}
                  label={group.name}
                  component={InputField}/>
              )
            })}
            <FieldWrapper>
              <Field
                name={`rates[2]`}
                label={'group.name'}
                component={InputField}/>
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={`rates[2]`}
                label={'group.name'}
                component={InputField}/>
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={`rates[2]`}
                label={'group.name'}
                component={InputField}/>
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={`rates[2]`}
                label={'group.name'}
                component={InputField}/>
            </FieldWrapper>
          </Field>
        </FieldWrapper>
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
