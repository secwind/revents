import React from 'react';
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content="About Display Name" />
            <p>
              อาชีพ : <strong>{profile.occupation || 'tbn'}</strong>
            </p>
            <p>
              ที่อยู่ : <strong>{profile.origin || 'tbn'}</strong>
            </p>
            <p>
              วันที่ก่อตั้ง: <strong>{createdAt}</strong>
            </p>
            <p>{profile.about || 'Description of user'}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="ความสนใจ" />
            {profile.interests ? 
            <List>
              {profile.interests &&
                profile.interests.map((interest, index) => (
                  <Item key={index + 1}>
                    <Icon name="heart" />
                    <Item.Content>
                      {index + 1}. {interest}
                    </Item.Content>
                  </Item>
                ))}
            </List> : <p>ยังไม่มีความสนใจในเรื่องใด</p>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailDescription;
