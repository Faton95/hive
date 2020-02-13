import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop, pathOr, map, pipe } from 'ramda'
import OutsourceUpdate from '../components/OutsourceUpdate'
import { outsourceItemFetch, outsourceUpdateAction } from '../action/actions'
import { createSerializer } from '../action/outsourceSerializer'
import { useFetchItem, useUpdate } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import * as ROUTES from '../../../constants/routes'
import { getIdForInitValues } from '../../../utils/get'

type Props = {
    history: History;
    location: Location;
}
const OutsourceUpdateContainer = (props: Props) => {
  const params: {id?: string} = useParams()
  const id = prop('id', params)

  const outsourceItem = useFetchItem({
    action: outsourceItemFetch,
    stateName: stateNames.OUTSOURCE_ITEM
  })

  const update = useUpdate({
    action: outsourceUpdateAction,
    stateName: stateNames.OUTSOURCE_UPDATE,
    redirectUrl: sprintf(ROUTES.OUTSOURCE_ITEM_URL, id),
    serializer: createSerializer
  })

  const data = prop('data', outsourceItem)

  const initialValues = {
    ...data
  }

  return (
    <Layout>
      <OutsourceUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default OutsourceUpdateContainer
