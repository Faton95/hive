import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import styled from 'styled-components'
import { LinkButton } from '../UI/Buttons'
import Filter from '../Filter'
import SearchField from './SearchField'

const Container = styled('div')`
  display:flex;
  justify-content: space-between;
  padding: 15px 0;
  position: relative;
`

const Button = styled(LinkButton)`
  position: relative;
  font-size: 14px;
  height: 36px;
  padding: 0 20px;
  margin-right: 20px;
  border-radius: 6px;
  font-weight: 400;
`

const Actions = styled('div')`
  display: flex;
  margin-left: auto;
`

const TableActions = props => {
  const {
    filterForm,
    filterActions,
    extraButtons,
    selectedList,
    selectActions,
    createPath,
    onCreate,
    searchKey
  } = props

  const selected = !isEmpty(selectedList)

  return (
    <Container>
      {selectActions && React.cloneElement(selectActions, { selectedList })}

      {filterActions && (
        <Filter selected={selected} {...filterActions}>
          {filterForm}
        </Filter>
      )}

      <Actions>
        {extraButtons}
        {(onCreate || createPath) && (
          <Button data-cy="table-add" onClick={onCreate} to={createPath}>
            + Добавить
          </Button>
        )}
        <SearchField key={searchKey} />
      </Actions>
    </Container>
  )
}

TableActions.propTypes = {
  filterForm: PropTypes.node,
  filterActions: PropTypes.object,
  selectedList: PropTypes.array,
  selectActions: PropTypes.object,
  onCreate: PropTypes.func,
  searchKey: PropTypes.string,
  createPath: PropTypes.string,
  extraButtons: PropTypes.node
}

TableActions.defaultProps = {
  selectedList: []
}

export default TableActions
