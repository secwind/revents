import React from 'react';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import PersonCard from './PersonCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const query = ({ auth }) => {
  // retrun แบบ objectArray { auth }คือ Dataprofile ของ user
  // กำลังบอกว่า สร้าง query ใน storeAs(storeจำลอง) 2 store
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'storeAsFollowing'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'follower' }],
      storeAs: 'storeAsFollower'
    }
  ];
};

const mapState = state => ({
  followings: state.firestore.ordered.storeAsFollowing,
  followers: state.firestore.ordered.storeAsFollower,
  auth: state.firebase.auth
});

const PeopleDashboard = ({ followings, followers }) => {
  // followings คือผู้ที่เราไปติดตาม // followers คือผู้ที่ติดตามเรา
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="ผู้ที่ติดตามคุณ" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.map(follower => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            {followings &&
              followings.map(following => (
                <PersonCard key={following.id} user={following} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default compose(connect(mapState), firestoreConnect(props => query(props))) (PeopleDashboard)
