import * as ROUTES from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import { Merge, TIdName, TGetDataFromState, TData, TPermissionItem } from 'types'
import { groupBy, last, map, pathOr, pipe, split, prop, toPairs } from 'ramda'
import styled from 'styled-components'
import { InputField, CheckboxGroupField } from '../../../../components/Form'

const GroupWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px #efefef solid;
  margin: 0 -25px;
  padding: 15px 25px;

  :hover {
    background: #F1F3F5;
  }
`
type Props = Merge<FormRenderProps, {permissionData: TGetDataFromState<TData<TIdName>>}>
const BranchCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, permissionData } = props

  const items = pathOr<TPermissionItem[]>([], ['data', 'results'], permissionData)
  const permissionList = pipe(
    groupBy<TPermissionItem>(pipe(prop('codename'), split('_'), last)),
    toPairs
  )(items)

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Name"
          name="name"
          component={InputField}
        />
      </FieldWrapper>
      {permissionList.map(perm => {
        const [key, permList] = perm
        return (
          <GroupWrapper key={key}>
            <Field
              name="permissions"
              render={fieldProps => (
                <CheckboxGroupField
                  width="calc(25% - 25px)"
                  {...fieldProps}
                  items={permList}
                  label={key}
                />
              )}
            />
          </GroupWrapper>
        )
      })}

      <CreateCancelButtons
        cancelPath={ROUTES.GROUP_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default BranchCreateForm
