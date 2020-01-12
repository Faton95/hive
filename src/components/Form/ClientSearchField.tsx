import React from 'react'
import { useStore } from 'react-redux'
import { prop, propOr } from 'ramda'
import {
  getOption,
  getOptions,
  defaultGetValue
} from '../../utils/searchField'
import * as API from '../../constants/api'
import SearchField from './Basic/SearchField'

const EMPTY = ''
const getClientText = (client) => {
  const name = propOr(EMPTY, 'fullName', client)
  const phone = prop('phoneNumber', client)

  return phone + ' - ' + name
}

const ClientSearchField = props => {
  const { api, params, itemText, ...rest } = props

  const store = useStore()

  return (
    <SearchField
      getText={getClientText}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getOptions(store, { api, params, search })}
      getOption={getOption(store, { api })}
      isClearable={true}
      itemText={itemText}
      {...rest}
    />
  )
}

ClientSearchField.defaultProps = {
  itemText: ['name'],
  api: API.CLIENT_LIST
}

export default ClientSearchField
