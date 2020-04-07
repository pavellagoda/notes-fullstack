import React from 'react';
import { Button, CssBaseline, Grid } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListPage from './containers/List/Loadable';
import ViewNotePage from './containers/View/Loadable';
import EditNotePage from './containers/Edit/Loadable';
import AddNotePage from './containers/Add/Loadable';

import { Store } from './Store';
import './i18n';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <Store>
      <CssBaseline>
        <Grid container justify="flex-end">
          <Button disabled={i18n.language === 'en'} onClick={() => i18n.changeLanguage('en')}>
            EN
          </Button>
          <Button disabled={i18n.language === 'cz'} onClick={() => i18n.changeLanguage('cz')}>
            CZ
          </Button>
        </Grid>
        <Switch>
          <Route component={ListPage} exact path="/" />
          <Route component={ViewNotePage} exact path="/notes/:id(\d+)/view" />
          <Route component={EditNotePage} exact path="/notes/:id(\d+)/edit" />
          <Route component={AddNotePage} exact path="/notes/add" />
          <Redirect to="/" />
        </Switch>
      </CssBaseline>
    </Store>
  );
};

export default App;
