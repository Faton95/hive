import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import OutsourceDetail from '../components/OutsourceDetail'
import { outsourceItemFetch } from '../action/actions'
import { useFetchItem } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import * as ROUTES from '../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const OutsourceDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: outsourceItemFetch,
    stateName: stateNames.OUTSOURCE_ITEM
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.OUTSOURCE_UPDATE_URL, id))

  return (
      <OutsourceDetail
        item={data}
        onDelete={() => null}
        onEdit={onEdit}
      />
  )
}
export default OutsourceDetailContainer
