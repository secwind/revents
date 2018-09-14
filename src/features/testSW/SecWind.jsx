import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Table } from 'semantic-ui-react';


const query = ({auth}) => {

    return [
        {
          collection: 'users',
          doc: auth.uid,
          storeAs: 'secwindAs'
        }
        // ,
        // {
        //   collection: 'event',
        //   where: ('hostUid', '==', 'PTU4ydUE0EUyAjGIcsgf0QzTcND2'),
        //   storeAs: 'secwindAsXXX'
        // }
      ]
}

// ส่ง props ไปหน้า /secwind
const mapState = state => {
  let nameProfile = null;

  // ถ้ามี firebase.profile และมีข้อมูล displayName ให้สร้างตัวแปร nameProfile = state.firebase.profile.displayName
  if (state.firebase.profile && state.firebase.profile.displayName) {
    nameProfile = state.firebase.profile.displayName;
  } else {
    nameProfile = 'หาไม่เจอ';
  }

  return {
    nameProfile,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    dataFirestore: state.firestore.ordered.secwindAs && state.firestore.ordered.secwindAs[0]
  };
};

class SecWind extends Component {
  render() {
    const { nameProfile, auth, dataFirestore} = this.props;
    const myJSON = JSON.stringify(dataFirestore);
   
    
    const panes = [
      { id: 'User Uid :', val: auth.uid, author: 'User Uid คือ docId ของ collections users' },
      { id: 'displayName', val: auth.displayName, author: 'displayName คือชื่อเดิมที่ติดมาจาก email ไม่สามารถเปลี่ยนแปลงได้' },
      { id: 'nameProfile', val: nameProfile, author: 'nameProfile คือชื่อที่สามารถเปลี่ยนแปลงได้ จาก firestore/users' },
      { id: 'Hosting', val: auth.uid, author: 'dataFirestore.email'},
    ];
    return (
      <div>
        {myJSON}
        <Table celled>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>No.</Table.HeaderCell>
              <Table.HeaderCell>ID NUMBER</Table.HeaderCell>
              <Table.HeaderCell>THIS VALUE</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {panes &&
              panes.map((data, index) => (
                <Table.Row key={index+1} >
                  {/* <Table.Cell>
                    <Label ribbon>First</Label>
                    </Table.Cell> */}
                  <Table.Cell>{index+1} .</Table.Cell>
                  <Table.Cell>{data.id}</Table.Cell>
                  <Table.Cell>{data.val}</Table.Cell>
                  <Table.Cell>{data.author}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}



export default compose(
  connect(mapState),
  firestoreConnect(props => query(props))
)(SecWind);
