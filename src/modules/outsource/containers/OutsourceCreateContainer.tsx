import React from 'react'
import OutsourceCreate from '../components/OutsourceCreate'
import { outsourceCreateAction } from '../action/actions'
import { createSerializer } from '../action/outsourceSerializer'
import { useCreate } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import * as ROUTES from '../../../constants/routes'

const OutsourceCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.OUTSOURCE_CREATE,
    action: outsourceCreateAction,
    redirectUrl: ROUTES.OUTSOURCE_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <OutsourceCreate
      {...data}
    />
  )
}
export default OutsourceCreateContainer
