import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
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
import {InputLabel} from 'components/UI'
import * as ROUTES from 'constants/routes'
import * as API from 'constants/api'
import {Merge, TData, TGetDataFromState, TPositionItem} from 'types'
import {path, pathOr} from "ramda";
import {
  DoubleField,
  DisplayFlex
} from "components/StyledElems";
import styled from "styled-components";

const Label = styled(InputLabel)`
  margin-bottom: 10px;
`

const FeeCeiling = styled.div`
  position: absolute;
  top: -32px;
  right: 0;
`
type Props = Merge<FormRenderProps, {
  positionData: TGetDataFromState<TData<TPositionItem>>
}>

const AssignmentCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, positionData, values } = props


  const positionList = pathOr<TPositionItem[]>([], ['data', 'results'], positionData)

  const bankAccount = path<number>(['bankAccount', 'id'], values)
  const billable = path<number>(['billable'], values)
  const hourlyHasFeeCeiling = path<boolean>(['hourlyHasFeeCeiling'], values)
  return (
    <form onSubmit={handleSubmit}>
      <DoubleField >
        <div>
          <FieldWrapper>
            <DoubleField>
              <Field
                label="Contract"
                name="contract"
                itemText={['id']}
                api={API.CONTRACT_LIST}
                component={UniversalSearchField} />
              <Field
                label="Client"
                name="client"
                api={API.CLIENT_LIST}
                component={UniversalSearchField} />
            </DoubleField>

          </FieldWrapper>
          <FieldWrapper>
            <Field
              label="Assignment"
              name="name"
              component={InputField} />
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
              label="Tags"
              name="tags"
              api={API.TAGS_LIST}
              component={UniversalMultiSelectField} />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label="Originated by"
              name="originatedBy"
              itemText={['fullName']}
              api={API.STAFF_LIST}
              component={UniversalSearchField} />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label="Team Leader"
              name="teamLeader"
              api={API.STAFF_LIST}
              itemText={['fullName']}
              component={UniversalSearchField} />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label="Work group"
              name="workGroup"
              itemText={['fullName']}
              api={API.STAFF_LIST}
              component={UniversalMultiSelectField} />
          </FieldWrapper>
          <FieldWrapper>
            <DoubleField>
              <Field
                label="Created on"
                name="createdDate"
                component={DateField} />
              <Field
                label="Deadline"
                name="deadline"
                appendToBody={true}
                component={DateField} />
            </DoubleField>

          </FieldWrapper>
        </div>

        <div>
          <FieldWrapper>
            <Field
              name="billable"
              label={{checkbox: "Billable", field: "Billing"}}
              component={CheckboxBordered}
              defaultValue={true}
              type="checkbox"
            />
          </FieldWrapper>
          {billable && (
            <>
          <FieldWrapper>
            <Field
              label="Payment Destination"
              name="paymentDestination"
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
                component={UniversalSearchField} />
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
              name="invoiceDeliveredBy"
              component={RadioButtonSimpleField}
              label="Billing department"
              value="billingDepartment"
              type="radio"
            />
            <Field
              name="invoiceDeliveredBy"
              component={RadioButtonSimpleField}
              label="Team Leader"
              value="teamLeader"
              type="radio"
            />
          </DisplayFlex>
          </FieldWrapper>
          <FieldWrapper>
            <Field
              label="Payment expected in"
              addon="days after invoice delivery"
              name="paymentDuration"
              leftWidth="220px"
              rightWidth="220px"
              component={InputAddonInlineLabel} />
          </FieldWrapper>
            </>
          )}
        </div>
      </DoubleField>

      <CreateCancelButtons
        cancelPath={ROUTES.GROUP_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default AssignmentCreateForm
