import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from 'components/StyledElems'
import {
  InputField,
  CheckboxGroupField
} from 'components/Form'

import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from 'constants/routes'
import {Merge, TGetDataFromState, TGroupItem} from 'types'
import {pathOr} from "ramda";

const EMPTY_ARR = []

type Props = Merge<FormRenderProps, { groups: TGetDataFromState<TGroupItem> }>

const PositionCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, groups, values } = props

  const groupsList = pathOr(EMPTY_ARR, ['data', 'results'], groups)
  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="наименование"
          name="name"
          component={InputField}
        />
      </FieldWrapper>
      <Field
        label="Модули"
        name="groups"
        items={groupsList}
        component={CheckboxGroupField}
      />
      <CreateCancelButtons
        cancelPath={ROUTES.POSITION_LIST_PATH}
        submitText="Сохранить"
      />
    </form>
  )
}

export default PositionCreateForm
