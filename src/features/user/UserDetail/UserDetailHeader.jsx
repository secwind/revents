import React from 'react'
import { Grid, Segment, Item, Header, Icon } from 'semantic-ui-react'
import differenceInYears from 'date-fns/difference_in_years'

const UserDetailHeader = ({profile}) => {
    let age;
    if (profile.dateOfBirth) {
        age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
    }else {
        age = 'unknown age'
    }
  return (
    <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="small"
                  src={profile.photoURL || 'assets/images/user.png'}
                />
                <Item.Content verticalAlign="bottom">
                  <Header as="h1">{profile.displayName}</Header>
                  <br />
                  <Header as="h4"><Icon name="briefcase" />{profile.occupation} ( {age} )</Header>
                  <br />
                  <Header as="h4"><Icon name="home" />{profile.origin}</Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
    </Grid.Column>
  )
}

export default UserDetailHeader
