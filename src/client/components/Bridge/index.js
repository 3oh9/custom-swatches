import React, { Component } from 'react';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';
import cookie from 'react-cookies';
import history from '../../utils/history';
import config from '../../utils/config';

import Loader from '../Loader';

class Bridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shop: cookie.load('shop'),
    };
  }

  componentDidMount() {
    const { shop } = this.state;

    if (shop) this.shopifyBridge();
  }

  shopifyBridge = () => {
    const { shop } = this.state;
    const redirectUri = `${config.apiPath}/auth/callback`;
    const scopes = 'write_products, write_themes';
    const permissionUrl = `/oauth/authorize?client_id=${config.apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    if (window.top === window.self) {
      this.setState({ loading: true });
      return window.location.assign(`https://${shop}/admin${permissionUrl}`);
    }

    const app = createApp({
      apiKey: config.apiKey,
      shopOrigin: window.location.hostname,
    });

    return Redirect.create(app).dispatch(Redirect.Action.ADMIN_PATH, permissionUrl);
  };

  render() {
    const { loading, shop } = this.state;

    if (!shop && window.location.pathname !== '/login') {
      history.push('/login');
    }

    return (
      <div className="bridge-wrapper">
        {loading && <Loader />}
        {!loading && this.props.children}
      </div>
    );
  }
}

export default Bridge;
