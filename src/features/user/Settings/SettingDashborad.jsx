import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingNav from './SettingNav';
import { Route, Switch, Redirect } from 'react-router-dom';
import AboutPage from './AboutPage'
import BasicPage from './BasicPage'
import AccountPage from './AccountPage'
import PhotosPage from './PhotosPage'

const SettingDashborad = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='settings/basic'/>
          <Route path='/settings/basic'  component={BasicPage}/>
          <Route path='/settings/about'  component={AboutPage}/>
          <Route path='/settings/account'  component={AccountPage}/>
          <Route path='/settings/photos'  component={PhotosPage}/>

        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNav/>
      </Grid.Column>
    </Grid>
  );
};

export default SettingDashborad;


