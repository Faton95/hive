import React from 'react'
import styled from 'styled-components'
import { Calendar, X as Clear } from 'react-feather'

const iconStyles = {
  color: '#9aa4af',
  display: 'block'
}

const InputIcon = styled(Calendar)(iconStyles)

const ClearIcon = styled(Clear)(iconStyles)

export const customArrowIcon = '-'
export const customInputIcon = <InputIcon size={20} />
export const customCloseIcon = <ClearIcon size={20} />
