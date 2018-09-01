import React, { Component } from 'react';
import {
  Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import UserDetailHeader from './UserDetailHeader'
import UserDetailDescription from './UserDetailDescription'
import UserDetailPhoto from './UserDetailPhoto'
import UserDetailSidebar from './UserDetailSidebar'
import UserDetailEvent from './UserDetailEvent'
import { userDetailQuery } from '../userQueries'
import  LoadingComponent  from '../../../app/layout/LoadingComponent'

// userDetailQuery คือการกำหนดการ query firestore แสดงข้อมูลโดยผ่าน logic if else 


const mapState = (state, ownProps) => {
  let userUid = {}
  let profile = {}

  // ถ้า params id เท่ากับ uid ของเจ้าของ ก็ให้แสดงข้อมูลของ เจ้าของ แต่ถ้าไม่เท่ากัน ก็แสดงว่าเจ้าของกำลังไปส่อง id ของเพื่อนจึงกำหนดให้ userUid เท่ากับ key สำคัญเพื่อไปกำหนด userDetailQuery
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.storeAsProfile) && state.firestore.ordered.storeAsProfile[0]
    userUid = ownProps.match.params.id
  }

  return {
    profile,
    userUid,
    auth : state.firebase.auth,
    photos: state.firestore.ordered.storeAsPhotos,
    requesting: state.firestore.status.requesting
  }
}

class UserDetailedPage extends Component {
  render() {
    const {profile, photos, auth, match, requesting } = this.props
    // isCurrentUser คือตรวจสอบว่า params.id ตรงกับผู้ใช้งานไหม
    const isCurrentUser = auth.uid === match.params.id
    const loading = Object.values(requesting).some(a => a === true)
    
    if (loading) {
      return <LoadingComponent inverted={true}/>
    }
    return (
      <Grid>
        <UserDetailHeader profile={profile}/>

        <UserDetailDescription profile={profile}/>

        <UserDetailSidebar isCurrentUser={isCurrentUser}/>
        

        <UserDetailPhoto photos={photos}/>  

        <UserDetailEvent/>
      </Grid>
    );
  }
}

export default connect(mapState)(
    //firestoreConnect คือเอา ข้อมูลของ (auth, userUid ในmapState)  มากับกัน func userDetailQuery
    firestoreConnect((auth, userUid) => userDetailQuery(auth, userUid))(UserDetailedPage)
  )
