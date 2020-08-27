import React, { Component, Fragment } from 'react';

import { TextField, Frame, Button } from '@shopify/polaris';
import config from '../../utils/config';
import '../../assets/main.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopValue: '',
    };
  }

  onChange = (val) => {
    this.setState({ shopValue: val });
  }

  onSubmit = () => {
    const { shopValue, shop } = this.state;
    const url = `${config.apiPath}/auth?shop=${shopValue}`;

    console.info('Shop from state: ', shop);
    console.info('Shop value: ', shopValue);
    location.replace(url); // eslint-disable-line
  }

  render() {
    const { shopValue } = this.state;

    return (
      <Fragment>
        <Frame>
          <div className="container tab-main centered login login-wrapper">
            <div className="login-wrapper-inner">
              <h4>Swatches</h4>
              <TextField
                label="Enter your shop domain to log in or install this app."
                value={shopValue}
                onChange={this.onChange}
                placeholder="example.myshopify.com"
              />
              <Button onClick={this.onSubmit} primary disabled={!shopValue}>Install</Button>
            </div>
          </div>
        </Frame>
      </Fragment>
    );
  }
}

export default Login;
