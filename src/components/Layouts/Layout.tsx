import React, {FunctionComponent} from 'react'
import {Container} from '../StyledElems'

const Layout: FunctionComponent = props => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default Layout
