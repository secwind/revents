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

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId
})

const actions = {
  updatePassword
};

const SettingDashborad = ({ updatePassword, providerId }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route
            path="/settings/account"
            render={() => 
              <AccountPage 
                updatePassword={updatePassword} 
                providerId={providerId}
              />
            }
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
