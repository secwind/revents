import React from 'react'
import { Grid, Segment, Image, Header } from 'semantic-ui-react'

const UserDetailPhoto = ({photos}) => {
  return (
    <Grid.Column width={16}>
          <Segment attached>
            <Header icon="image" content="Photos" />

            <Image.Group size="small">
            {photos && photos.map(photo =>
                <Image key={photo.id} src={photo.url} />
            )}

            </Image.Group>
          </Segment>
        </Grid.Column>
  )
}

export default UserDetailPhoto
