import React, { FunctionComponent, ReactElement } from 'react'
import { isEmpty } from 'ramda'
import { Table as TableCUI } from '../UI'
import EmptyQuery from '../UI/EmptyQuery'
import { TableSkeleton } from '../Skeletons'
import useTableActions from '../../hooks/useTableActions'

type Props = {
  tableActions?: object;
  actions?: ReactElement;
  gutter?: number;
  list?: Array<any>;
  promptText?: string;
  selection?: boolean;
  loading?: boolean;
}
const Table: FunctionComponent<Props> = props => {
  const { actions, loading, promptText, list, ...defaultProps } = props

  const tableActions = useTableActions()
  const { initialSelected } = tableActions
  const empty = !loading && isEmpty(list)
  const actionProps = { selectedList: initialSelected }

  return (
    <>
      {actions && React.cloneElement(actions, actionProps)}
      {loading
        ? <TableSkeleton />
        : (
          <TableCUI
            list={list}
            {...defaultProps}
            {...tableActions}
          />
        )}
      {empty && <EmptyQuery promptText={promptText} />}
    </>
  )
}

export default Table
