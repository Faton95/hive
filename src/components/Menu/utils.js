import * as R from 'ramda'

const NOT_FOUND = -1

export default (menu, pathname) =>
  R.find(item => {
    const children = R.prop('children', item)
    return (
      R.findIndex(ch => {
        const childUrl = R.prop('url', ch)
        return R.includes(childUrl, pathname) && childUrl
      })(children) > NOT_FOUND
    )
  })(menu)
