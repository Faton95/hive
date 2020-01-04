import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Search from '../../icons/Search'
import { IconInput } from '../UI'
import { replaceParamsRoute } from '../../utils/route'
import { getParamFromHistory } from '../../utils/get'
import {useHistory} from 'react-router-dom'

const Input = styled(IconInput)`
  align-self: center;
  background-color: #fbfbfc;
  border: 1px solid #e4e5eb;
  border-radius: 6px;
  padding-left: 44px;
  height: 36px;
  ::placeholder {
    color: #b2b7bf;
    font-size: 14px;
  }
`


const SearchField = props => {
  const { key } = props
  const history = useHistory()
  const [val, setVal] = React.useState(getParamFromHistory(key, history))
  const decodedValue = val ? decodeURIComponent(val) : ''

  const onEnter = (ev, search) => {
    const historyValue = getParamFromHistory(key, history)
    if (historyValue !== search) {
      replaceParamsRoute({ [key]: search, page: 1 }, history)
    }
  }

  const onChange = ev => setVal(ev.target.value)

  return (
    <Input
      {...props}
      data-cy={'table-search'}
      value={decodedValue}
      onChange={onChange}
      onEnter={onEnter}
      icon={Search}
      placeholder={'Поиск...'}
    />
  )
}

SearchField.propTypes = {
  key: PropTypes.string
}

SearchField.defaultProps = {
  key: 'search'
}

export default SearchField
