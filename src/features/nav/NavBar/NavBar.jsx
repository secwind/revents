import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignOutMenu from '../Menus/SignOutMenu';
import SignInMenu from '../Menus/SignInMenu';
import { connect } from 'react-redux'
import { openModal } from '../../modals/modalActions'
import { logout } from '../../auth/authActions'

const actions = {
  openModal,
  logout
}

const mapState = (state) => ({
  auth : state.auth
})


class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  };


  handleSignOut = () => {
    this.props.logout()
    this.props.history.push('/');
  };
  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="/assets/images/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            <Menu.Item as={NavLink} to="/test" name="Test" />
            {authenticated && (
              <Menu.Item as={NavLink} to="/people" name="Peoples" />
            )}
            {authenticated && (
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            )}
            {authenticated ? (
              <SignInMenu  currentUser={auth.currentUser} signOut={this.handleSignOut} />
            ) : (
              <SignOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default 
  withRouter(
      connect(mapState, actions)(NavBar)
  )
// (connect(null, actions) ถ้าไม่มี mapState ต้องใส่ null