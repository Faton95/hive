import * as ROUTES from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import {
  InputField
} from 'components/Form'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import { RowMargin, Col } from 'components/UI/Grid'

const PositionCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

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
      <RowMargin>
        <Col span={12}>
          <Field
            label="Rate per hour"
            name="rate"
            component={InputField}
          />
        </Col>
        <Col span={12} />
      </RowMargin>
      <CreateCancelButtons
        cancelPath={ROUTES.POSITION_LIST_PATH}
        submitText="Сохранить"
      />
    </form>
  )
}

export default PositionCreateForm
