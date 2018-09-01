import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
      {/* isCurrentUser เป็นเจ้าของไหมถ้าเป็นก็มีปุ่มแก้ไข ถ้าไม่เป็นก็มีปุ่มติดตามเพื่อนคนนี้ */}
        {isCurrentUser ? (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Edit Profile"
          />
        ) : (
          <Button color="teal" fluid basic content="ติดตามเพื่อนคนนี้" />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailSidebar;
