import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Tabs, Toast, Frame, Loading } from '@shopify/polaris';

import MainTab from './tabs/MainTab';
import FAQTab from './tabs/FaqTab';
import SettingsTab from './tabs/SettingsTab';

import { refreshWebhooks } from '../../actions/webhook';
import { fetchShopData } from '../../actions/shop';
import { fetchConfig, updateConfig } from '../../actions/config';

class Home extends Component {
  static propTypes = {
    fetchShopData: PropTypes.func.isRequired,
    fetchConfig: PropTypes.func.isRequired,

    config: PropTypes.shape({
      list: PropTypes.array,
      updating: PropTypes.bool,
      updated: PropTypes.bool,
      fetching: PropTypes.bool,
      fetched: PropTypes.bool,
    }).isRequired,

    webhook: PropTypes.shape({
      updating: PropTypes.bool,
      updated: PropTypes.bool,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      apiKey: '',
      initialApiKey: '',
      showToast: false,
    };
  }

  componentDidMount() {
    const shop = cookie.load('shop');

    this.props.fetchShopData(shop);
    this.props.fetchConfig(shop);
  }

  handleTabChange = (selectedTabIndex) => {
    this.setState({ selected: selectedTabIndex });
  }

  toggleToast = (toastContent) => {
    this.setState(prevState => ({
      showToast: !prevState.showToast,
      toastContent,
    }));
  }

  render() {
    const {
      selected, apiKey, initialApiKey, showToast, toastContent,
    } = this.state;
    const { config, webhook } = this.props;
    const updatingConfig = config.updating;
    const updatingWebhooks = webhook.updating;
    const loading = updatingConfig || updatingWebhooks;

    const tabs = [
      {
        id: 'main-tab',
        content: 'Home',
        panelID: 'main-tab',
        body: <MainTab
          onGetStartedClick={this.onGetStartedClick}
        />,
      },
      {
        id: 'faq-tab',
        content: 'FAQ',
        panelID: 'faq-tab',
        body: <FAQTab />,
      },
      {
        id: 'settings-tab',
        content: 'Settings',
        panelID: 'settings-tab',
        body: (<SettingsTab
          apiKey={apiKey}
          onChange={this.handleSettingsKeyChange}
          onSubmit={this.handleSubmitClick}
          disabled={!apiKey || apiKey === initialApiKey}
          refreshWebhooks={this.refreshWebhooks}
        />),
      },
    ];
    const toastMarkup = showToast && toastContent ? (
      <Toast
        content={toastContent}
        onDismiss={this.toggleToast}
      />
    ) : null;

    return (
      <Fragment>
        <Frame>
          {loading && <Loading />}
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={this.handleTabChange}>
              <Card.Section title="">
                {tabs[selected].body}
              </Card.Section>
            </Tabs>
          </Card>
          {toastMarkup}
        </Frame>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ shop, config, webhook }) => ({
  shop, config, webhook,
});

const mapDispatchToProps = {
  fetchShopData,
  fetchConfig,
  updateConfig,
  refreshWebhooks,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
