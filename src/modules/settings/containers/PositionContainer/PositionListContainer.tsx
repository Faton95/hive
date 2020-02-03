import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { sprintf } from 'sprintf-js'
import { useFetchList, useFilterActions, useDelete } from 'hooks'
import Layout from 'components/Layouts/Layout'
import { positionListFetch, positionDeleteAction } from '../../actions/positionActions'
import PositionList from '../../components/Position/PositionList'

const PositionListContainer = props => {
  const data = useFetchList({
    action: positionListFetch,
    stateName: stateNames.POSITION_LIST
  })

  const deleteData = useDelete({
    stateName: stateNames.POSITION_DELETE,
    action: positionDeleteAction,
    successAction: positionListFetch
  })

  const onEdit = id => props.history.push(sprintf(ROUTES.POSITION_UPDATE_URL, id))
  return (
    <Layout>
      <PositionList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default PositionListContainer
