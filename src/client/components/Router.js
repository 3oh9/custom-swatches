import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FooterHelp, Link } from '@shopify/polaris';
import Login from '../containers/Login';
import Product from '../containers/Product';
import Products from '../containers/Products';

import { homePath, loginPath, productPath } from '../utils/paths';

export default () => (
  <Fragment>
    <Router>
      <Switch>
        <Route exact path={productPath} component={Product} />
        <Route exact path={homePath} component={Products} />
        <Route path={loginPath} component={Login} />
      </Switch>
    </Router>
    <FooterHelp>
      Learn more about{' '}
      <Link
        url="/faq"
        external={false}
      >
        Learn more about Custom Swatches
      </Link>
      .
    </FooterHelp>
  </Fragment>
);
