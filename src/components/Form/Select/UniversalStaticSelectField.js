import React from 'react'
import PropTypes from 'prop-types'
import SearchField from '../Basic/SearchField'
import {
  getStaticOption,
  getStaticOptions,
  defaultGetText,
  defaultGetValue
} from '~/utils/searchField'

const UniversalStaticSelectField = props => {
  const { list, itemText } = props
  return (
    <SearchField
      getText={defaultGetText(itemText)}
      getValue={defaultGetValue(['id'])}
      getOptions={search => getStaticOptions(search, list)}
      getOption={id => getStaticOption(id, list)}
      isStatic={true}
      {...props}
    />
  )
}

UniversalStaticSelectField.propTypes = {
  list: PropTypes.array.isRequired,
  itemText: PropTypes.array
}

UniversalStaticSelectField.defaultProps = {
  itemText: ['name']
}

export default UniversalStaticSelectField
