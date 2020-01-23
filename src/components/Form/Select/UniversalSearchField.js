import React from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'
import SearchField from '../Basic/SearchField'
import {
  getOption,
  getOptions,
  defaultGetText,
  defaultGetValue
} from 'utils/searchField'

const UniversalSearchField = props => {
  const { api, params, itemText, getText, ...rest } = props

  const store = useStore()

  return (
    <SearchField
      getText={getText || defaultGetText(itemText)}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getOptions(store, { api, params, search })}
      getOption={getOption(store, { api, params })}
      isClearable={true}
      itemText={itemText}
      {...rest}
    />
  )
}

UniversalSearchField.propTypes = {
  api: PropTypes.string.isRequired,
  params: PropTypes.object,
  itemText: PropTypes.array
}

UniversalSearchField.defaultProps = {
  itemText: ['name']
}

export default UniversalSearchField
