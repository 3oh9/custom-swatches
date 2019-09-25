import React from 'react';
import { Provider } from 'react-redux';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Router from './Router';

import Bridge from './Bridge';

// import '../assets/main.scss';

const App = props => (
  <Provider store={props.store}>
    <Bridge>
      <AppProvider>
        <Router />
      </AppProvider>
    </Bridge>
  </Provider>
);

export default App;
