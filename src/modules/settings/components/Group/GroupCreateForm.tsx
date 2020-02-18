import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
import { UniversalSearchField, InputField, CheckboxGroupField } from '../../../../components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from 'constants/routes'
import {Merge, TIdName, TGetDataFromState, TData, TPermissionItem} from 'types'
import {pathOr} from "ramda";

type Props = Merge<FormRenderProps, {permissionData: TGetDataFromState<TData<TIdName>>}>
const BranchCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, permissionData } = props

  const items = pathOr<TPermissionItem[]>([], ['data', 'results'], permissionData)
  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Name"
          name="name"
          component={InputField} />
      </FieldWrapper>
      <Field
        name='permissions'
        render={fieldProps => (
          <CheckboxGroupField
            {...fieldProps}
            items={items}
            label={'Permissions'}
          />
        )}

      />
      <CreateCancelButtons
        cancelPath={ROUTES.GROUP_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default BranchCreateForm
