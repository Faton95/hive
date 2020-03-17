import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { path, prop, map } from 'ramda'
import { DetailMenu } from 'components/Menu'
import { DisplayFlex } from 'components/StyledElems'
import {
  DetailDropdown
} from 'components/DetailComponents'
import { Box, DropdownItem } from 'components/UI'
import {
  ButtonSmall,
  PrimaryBorderedButtonSmall
} from 'components/UI/Buttons'
import { TGetDataFromState, TInvoiceItem } from 'types'
import { TOnSubmit } from 'types/hooks'
import InvoicePdf from './InvoicePdf'
import InvoiceTimeSheetPDF from './InvoiceTimeSheetPDF'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`

const PDFView = styled(PDFViewer)`
  width: 100%;
  height: 500px;
  border: none;
`

const Button = styled(PrimaryBorderedButtonSmall)`
  margin-left: 20px;
`
const EMPTY_ARR = []

type Props = {
  data: TGetDataFromState<TInvoiceItem>;
  onDelete: TOnSubmit;
  onEdit: (id) => void;
}
const InvoiceDetail: FunctionComponent<Props> = props => {
  const {
    data,
    onDelete,
    onEdit
  } = props

  const details = prop('data', data)
  const id = prop('id', details)

  return (
    <>
      <DetailMenu title={'Invoice №' + id} />
      <Box padding='25px'>
        <Header alignItems='center' justifyContent='space-between'>
          <ButtonSmall>Send Invoice</ButtonSmall>
          <div>
            <Button>Make Payment</Button>
            <DetailDropdown marginLeft='20px'>
              <DropdownItem onClick={() => onEdit(id)}>Изменить</DropdownItem>
              <DropdownItem onClick={() => onDelete(id)}>Удалить</DropdownItem>
            </DetailDropdown>
          </div>
        </Header>
        <PDFView>
          <InvoiceTimeSheetPDF data={details} />
        </PDFView>
        <PDFDownloadLink document={<InvoicePdf data={details} />} fileName='somename.pdf'>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </Box>
    </>
  )
}

export default InvoiceDetail
