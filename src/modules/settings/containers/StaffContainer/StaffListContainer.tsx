import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useDelete
} from '../../../../hooks'
import { staffListFetch, staffDeleteAction } from '../../actions/staffActions'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import StaffList from '../../components/StaffComponent/StaffList'
import * as ROUTES from '../../../../constants/routes'

const StaffListContainer = props => {
  const data = useFetchList({
    action: staffListFetch,
    stateName: stateNames.STAFF_LIST,
  })

  const deleteData = useDelete({
    stateName: stateNames.STAFF_DELETE,
    action: staffDeleteAction,
    successAction: staffListFetch
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.STAFF_UPDATE_URL, id))
  return (
    <Layout>
      <StaffList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default StaffListContainer
