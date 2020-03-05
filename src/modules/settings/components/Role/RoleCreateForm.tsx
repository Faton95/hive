import * as ROUTES from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import {
  InputField,
  CheckboxGroupField
} from 'components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import { RowMargin, Col } from 'components/UI/Grid'
import { Merge, TGetDataFromState, TGroupItem } from 'types'
import { pathOr } from 'ramda'

const EMPTY_ARR = []

type Props = Merge<FormRenderProps, { groups: TGetDataFromState<TGroupItem> }>

const RoleCreateForm: FunctionComponent<Props> = props => {
  const { handleSubmit, groups, values } = props

  const groupsList = pathOr(EMPTY_ARR, ['data', 'results'], groups)
  return (
    <form onSubmit={handleSubmit}>
      <RowMargin>
        <Col span={12}>
          <Field
            label="Name"
            name="name"
            component={InputField}
          />

        </Col>
        <Col span={12} />

      </RowMargin>

      <Field
        label="Модули"
        name="groups"
        items={groupsList}
        width="calc(25% - 25px)"
        component={CheckboxGroupField}
      />
      <CreateCancelButtons
        cancelPath={ROUTES.POSITION_LIST_PATH}
        submitText="Сохранить"
      />
    </form>
  )
}

export default RoleCreateForm
