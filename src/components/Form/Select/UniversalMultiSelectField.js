import React from 'react'
import { useStore } from 'react-redux'
import PropTypes from 'prop-types'
import {
  getOption,
  getOptions,
  defaultGetText,
  defaultGetValue
} from 'utils/searchField'
import MultiSearchField from '../Basic/MultiSearchField'

const UniversalMultiSearchField = props => {
  const { api, params, itemText, ...rest } = props
  const store = useStore()
  return (
    <MultiSearchField
      getText={defaultGetText(itemText)}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getOptions(store, { api, params, search })}
      getOption={getOption(store, { api, params })}
      isMulti={true}
      {...rest}
    />
  )
}

UniversalMultiSearchField.propTypes = {
  api: PropTypes.string.isRequired,
  params: PropTypes.object,
  itemText: PropTypes.array,
}

UniversalMultiSearchField.defaultProps = {
  itemText: ['name']
}

export default UniversalMultiSearchField
