import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageOne from './PageOne/PageOne';
import PageTwoWithSubRoutes from './PageTwoWithSubRoutes/PageTwoWithSubRoutes';

function Root() {
  return (
    <div>
      <div>
        some wrapper ui here if needed, app bar, navigation tab components etc
      </div>

      <Switch>
        <Route path="/page-one">
          <PageOne />
        </Route>
        <Route path="/page-two">
          <PageTwoWithSubRoutes />
        </Route>
      </Switch>
    </div>
  );
}

export default Root;
