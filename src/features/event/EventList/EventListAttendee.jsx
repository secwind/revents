import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import axios from 'axios';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      storeAs: 'secwindAs'
    }
    // ,
    // {
    //   collection: 'users',
    //   doc: this.props.attendee.id,
    //   storeAs: 'testSW'
    // }
  ];
};
const mapState = state => ({
  wisanu: state.firestore.ordered.secwindAs
});

class EventListAttendee extends Component {
  state = {
    persons: []
  }
  componentDidMount() {
    const self = this;
    const keys = this.props.attendee.id
    const url = 'https://us-central1-revents-3aac5.cloudfunctions.net/outputAvatar?userdocid=${Uid}';
      console.log(keys);
      
      // axios
      // .get(url)
      // .then(res => {
      //   const persons = res.data;
      //   self.setState({ persons });
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
  }


  render() {
    const { attendee, wisanu } = this.props;
    return (
      <List.Item>
        <Image
          as={Link}
          to={`/profile/${attendee.id}`}
          circular
          size="mini"
          src={`https://us-central1-revents-3aac5.cloudfunctions.net/outputAvatar?userdocid=${attendee.id}`}
        />
      </List.Item>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect(props => query(props))
)(EventListAttendee);
