import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { length } from 'ramda'
import DisplayFlex from '../StyledElems/DisplayFlex'
import { DangerButton as ButtonCUI } from '../UI/Buttons'

const SelectedCount = styled.div`
  margin-right: 40px;
`

const Button = styled(ButtonCUI)`
  padding: 9px 20px;
  font-size: 14px;
  margin-right: 20px;
  height: 36px;
  border-radius: 6px;
  font-weight: 400;
`

const TableSelectActions = props => {
  const { selectedList, extraActions, onDelete } = props
  const selectedCount = length(selectedList)

  if (!selectedCount) {
    return null
  }

  return (
    <DisplayFlex alignItems={'center'}>
      <SelectedCount>{selectedCount} элемента выбрано</SelectedCount>
      {onDelete && (
        <Button onClick={() => onDelete(selectedList)}>Удалить</Button>
      )}
      {extraActions}
    </DisplayFlex>
  )
}

TableSelectActions.propTypes = {
  selectedList: PropTypes.array,
  extraActions: PropTypes.node,
  onDelete: PropTypes.func
}

TableSelectActions.defaultProps = {
  selectedList: [],
  extraActions: null
}

export default TableSelectActions
