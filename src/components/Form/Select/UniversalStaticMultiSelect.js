import React from 'react'
import PropTypes from 'prop-types'
import SearchField from '../Basic/MultiSearchField'
import {
  getStaticOption,
  getStaticOptions,
  defaultGetText,
  defaultGetValue
} from '~/utils/searchField'

const UniversalStaticMultiSelect = props => {
  const { list, itemText } = props

  return (
    <SearchField
      getText={defaultGetText(itemText || ['name'])}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getStaticOptions(search, list)}
      getOption={id => getStaticOption(id, list)}
      isMulti={true}
      {...props}
    />
  )
}

UniversalStaticMultiSelect.propTypes = {
  list: PropTypes.array.isRequired,
  itemText: PropTypes.array
}

export default UniversalStaticMultiSelect
