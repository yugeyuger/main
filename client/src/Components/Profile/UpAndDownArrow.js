import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const UpAndDownArrow = () => (
  <Grid >
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>

    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>

    </Grid.Row>
  </Grid>
)

export default UpAndDownArrow
