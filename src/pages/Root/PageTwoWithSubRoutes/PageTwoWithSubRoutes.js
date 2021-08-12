import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import PageTwoSubTabOne from './PageTwoSubTabOne/PageTwoSubTabOne';
import PageTwoSubTabTwo from './PageTwoSubTabTwo/PageTwoSubTabTwo';

function PageTwoWithSubRoutes() {
  return (
    <>
      <div>PageTwo</div>
      <Switch>
        <Route path="/page-two/sub-page-one/:resourceId">
          <PageTwoSubTabOne />
        </Route>
        <Route path="/page-two/sub-page-two/:resourceId">
          <PageTwoSubTabTwo />
        </Route>
      </Switch>
    </>
  );
}

export default PageTwoWithSubRoutes;
