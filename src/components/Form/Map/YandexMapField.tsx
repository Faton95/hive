import React, { useState } from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'
import { Field, InputField } from '../index'
import { Row, Col } from '../../UI'
import AddressField from './AddressField'
import YandexMap from './YandexMap'

const RowUI = styled(Row)`
  margin-top: 20px;
`
const Wrapper = styled.div`
  border: ${props => props.theme.border};
  padding: 20px;
  border-radius: ${props => props.theme.borderRadius};
  border-color: #b6bbca;
`

const YandexMapField = props => {
  const [open, setOpen] = useState(false)

  const { fields } = props

  const addressInputs = prop('address.address', fields)
  const locationInputs = prop('address.location', fields)
  const onAddressChange = addressInputs.input.onChange
  const addressValue = addressInputs.input.value
  const onOpenToggle = () => setOpen(!open)
  return (
    <Wrapper>
      <Row gutter={20}>
        <Col span={12}>
          <Field
            name="address.address"
            component={AddressField}
            onIconClick={onOpenToggle}
          />
        </Col>
        <Col span={12}>
          <Field
            name="address.referencePoint"
            label="ориентир"
            component={InputField}
          />
        </Col>
      </Row>
      <RowUI gutter={20}>
        <Col span={12}>
          <Field
            name="address.phone"
            label="Номер телефона"
            component={InputField}
          />
        </Col>
        <Col span={12}>
          <Field
            name="address.contactPerson"
            label="Имя"
            component={InputField}
          />
        </Col>
      </RowUI>
      <YandexMap
        {...locationInputs}
        onToggle={onOpenToggle}
        open={open}
        addressValue={addressValue}
        onAddressChange={onAddressChange}
      />
    </Wrapper>
  )
}

export default YandexMapField
