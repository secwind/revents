import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserDetailSidebar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button as={Link} to='/settings' color="teal" fluid basic content="Edit Profile" />
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailSidebar;
