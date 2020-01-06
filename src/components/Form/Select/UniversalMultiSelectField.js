import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'react-fc'
import SearchField from '../Basic/MultiSearchField'
import {
  getOption,
  getOptions,
  defaultGetText,
  defaultGetValue
} from '~/utils/searchField'
import withStore from '~/components/HOCs/withStore'

const enhance = compose(
  withStore,
  pure
)

const UniversalMultiSearchField = props => {
  const { store, api, params, itemText, ...rest } = props

  return (
    <SearchField
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
  store: PropTypes.object.isRequired,
  api: PropTypes.string.isRequired,
  params: PropTypes.object,
  itemText: PropTypes.array,
}

UniversalMultiSearchField.defaultProps = {
  itemText: ['name']
}

export default enhance(UniversalMultiSearchField)
