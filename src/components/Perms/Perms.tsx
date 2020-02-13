import React, {FunctionComponent} from 'react'
import {useTypedSelector} from "etc/reducers"
import {getDataFromState} from 'utils/getTyped'
import * as STATE from 'constants/stateNames'
import {defaultTo, map, path, pipe, prop, flatten, join} from "ramda";
import { TPermissionItem } from 'types'

type Props = {
  permissions?: Array<string>
}


const getCodeNames = pipe(
  path<TPermissionItem[]>(['permissions']),
  map(prop('codename')),
  join('-')
)
const Perms: FunctionComponent<Props> = props => {
  const permissions = useTypedSelector(state => getDataFromState(STATE.USER_INFO, state))
  const permissionList = pipe(
    path(['data', 'position', 'groups']),
    defaultTo([]),
    map(getCodeNames),
    join('-')
  )(permissions)

  const perms = props.permissions.join(('-'))


  if(!permissionList.includes(perms)){
    return null
  }

  return <>{props.children}</>
}

export default Perms
