import { memo } from 'react'
import isEqual from 'react-fast-compare'

const pure = (Component) => {
  return memo(Component, isEqual)
}

export default pure
