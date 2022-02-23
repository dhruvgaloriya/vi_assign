
import React from 'react'
import { Header, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const HeaderComponent = () => (
  <Segment clearing>
    <Header as='h2' floated='right'>
      About
    </Header>
    <Link to = '/'>
      <Header as='h2' floated='left'>
        Naavi MF
      </Header>
    </Link>
  </Segment>
)

export default HeaderComponent



