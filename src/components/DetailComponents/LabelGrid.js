import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Grid = styled('div')`
  display: grid;
  grid-gap: 25px 35px;
  grid-template-columns: ${props => props.gridTemplateColumns};
`

const LabelGrid = props => {
  const { children, gridTemplateColumns, ...defaultProps } = props

  return (
    <Grid
      gridTemplateColumns={gridTemplateColumns}
      {...defaultProps}>
      {children}
    </Grid>
  )
}

LabelGrid.propTypes = {
  children: PropTypes.node,
  gridTemplateColumns: PropTypes.string
}

export default LabelGrid
