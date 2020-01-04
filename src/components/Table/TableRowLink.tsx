import React, {FunctionComponent} from 'react'
import { TableRow as Row } from 'ui-cubic/dist/index.es'
import { useHistory } from 'react-router-dom'

type Props = {
  link: string,
  selectId: number,
  align: string
}
const TableRowLink: FunctionComponent<Props> = props => {
  const { link, ...rest } = props

  const history = useHistory()
  const onClick = () => history.push(link)

  return <Row onClick={onClick} {...rest} />
}

export default TableRowLink
