import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import { FieldWrapper } from '../../../components/StyledElems'
import {
  Fields,
  OrderProductListField,
  UniversalSearchField,
  UniversalStaticSelectField,
  YandexMapField
} from '../../../components/Form'
import * as API from '../../../constants/api'
import { PAYMENT_TYPE_LIST } from '../../../constants/backend'
import CreateCancelButtons from '../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

const EMPTY = ''
const getClientText = (client) => {
  const name = propOr(EMPTY, 'fullName', client)
  const phone = prop('phoneNumber', client)

  return phone + ' - ' + name
}

const OrderCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Клиент"
          name="client"
          getText={getClientText}
          component={UniversalSearchField}
          api={API.CLIENT_LIST}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Fields
          names={[
            'address.location',
            'address.address',
            'address.phone',
            'address.contactPerson',
            'address.referencePoint'
          ]}
        >
          {(fields) => {
            return <YandexMapField fields={fields} />
          }}
        </Fields>
      </FieldWrapper>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Способ доставки"
            name="deliveryType"
            component={UniversalSearchField}
            api={API.DELIVERY_TYPE_LIST}
          />
        </Col>
        <Col span={12}>
          <Field
            label="Способ оплаты"
            name="paymentType"
            component={UniversalStaticSelectField}
            list={PAYMENT_TYPE_LIST}
          />
        </Col>
      </RowMargin>
      <FieldArray
        name="orderProducts"
        component={OrderProductListField}
      />
      <CreateCancelButtons
        cancelPath={ROUTES.ORDER_LIST_PATH}
        submitText="Сохранить"
      />
    </form>
  )
}

export default OrderCreateForm
