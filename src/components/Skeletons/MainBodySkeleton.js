import React from 'react'
import styled from 'styled-components'
import TableSkelet from './TableSkeleton'

const HeaderBox = styled.div`
  height: 68px;
  border-radius: 8px;
  background-color: white;
`

const PreHeaderBox = styled.div`
  margin: 18px 0;
  width: 40%;
  height: 43px;
  border-radius: 8px;
  background-color: white;
`

const MainBodyTable = styled.div`
  background-color: white;
  border-radius: 8px;
`

const MainBodySkeleton = props => {
  return (
    <div>
      <HeaderBox />
      <PreHeaderBox />
      <MainBodyTable>
        <TableSkelet />
      </MainBodyTable>
    </div>
  )
}

export default MainBodySkeleton
