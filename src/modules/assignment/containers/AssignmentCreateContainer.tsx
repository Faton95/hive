import React from 'react'
import ContractCreate from '../components/AssignmentCreate'
import {
  assignmentCreateAction
} from '../actions/assignmentActions'

import {useFetchItem, useCreate, useFetchList} from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import Layout from 'components/Layouts/Layout'
import {positionListFetch} from "modules/settings/actions/positionActions";
import {TData, TPositionItem} from "types";


const ContractCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.ASSIGMENT_CREATE,
    action: assignmentCreateAction,
    redirectUrl: ROUTES.ASSIGNMENT_LIST_PATH,
  })

  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch
  })
  return (
    <Layout>
      <ContractCreate
        {...data}
        positionData={positionData}
      />
    </Layout>
  )
}
export default ContractCreateContainer
