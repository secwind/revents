import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingNav from './SettingNav';
import { Route, Switch, Redirect } from 'react-router-dom';
import AboutPage from './AboutPage';
import BasicPage from './BasicPage';
import AccountPage from './AccountPage';
import PhotosPage from './PhotosPage';
import { connect } from 'react-redux';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../../user/userAction'

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile
};

const SettingDashborad = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="settings/basic" />
          <Route
            path="/settings/basic"
            render={() => 
              <BasicPage 
              initialValues={user}
              updateProfile={updateProfile}
              />
            }
          />
          <Route 
            path="/settings/about" 
            render={() => 
              <AboutPage
              initialValues={user}
              updateProfile={updateProfile}
              />
            } 
          />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
          <Route path="/settings/photos" component={PhotosPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingDashborad);
