import React, { Component } from 'react';
import {
  Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import UserDetailHeader from './UserDetailHeader'
import UserDetailDescription from './UserDetailDescription'
import UserDetailPhoto from './UserDetailPhoto'
import UserDetailSidebar from './UserDetailSidebar'
import UserDetailEvent from './UserDetailEvent'

const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'userPhotos'
    }
  ] 
}

const mapState = (state) => ({
  auth : state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.userPhotos
})

class UserDetailedPage extends Component {
  render() {
    const {profile, photos } = this.props
    return (
      <Grid>
        <UserDetailHeader profile={profile}/>

        <UserDetailDescription profile={profile}/>

        <UserDetailSidebar/>
        

        <UserDetailPhoto photos={photos}/>  

        <UserDetailEvent/>
      </Grid>
    );
  }
}

export default connect(mapState)(
    firestoreConnect(auth => query(auth))(UserDetailedPage)
  )
